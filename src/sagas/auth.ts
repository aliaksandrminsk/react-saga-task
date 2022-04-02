import { takeEvery, call, put, fork, takeLatest } from "redux-saga/effects";
import {
  AuthTypes,
  AutoLogoutRequest,
  GetAuthRequest,
} from "../actions/auth/types";

import * as api from "../api/auth";
import * as storage from "../api/localStorage";
import * as actions from "../actions/auth/auth";

const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

function* getAuth({ email, password, name, surname }: GetAuthRequest) {
  const isRegistration = name != null;
  const api_key = process.env.API_KEY;

  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${api_key}`;

  if (isRegistration) {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${api_key}`;
  }

  const { data, serverErrorMessage } = yield call(api.getAuth, {
    url,
    email,
    password,
  });

  if (serverErrorMessage != null) {
    yield put(actions.errorRequest({ serverErrorMessage }));
  } else {
    const token: string = data.idToken;
    const userId: string = data.localId;
    const expiresIn: number = data.expiresIn;

    if (isRegistration) {
      yield call(api.saveUserData, {
        email,
        name,
        surname,
      });
    } else {
      const { data: userData } = yield call(api.getUserData, { email });
      name = userData.name;
      surname = userData.surname;
    }

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    let userName = name ? name : "";
    if (surname != null && surname.length > 0) userName += " " + surname;

    storage.saveData({
      token,
      userId,
      email,
      userName,
      expirationDate: expirationDate.toString(),
    });

    yield put(actions.getAuthSuccess({ email, userName, token }));
    yield put(actions.autoLogoutRequest({ time: expiresIn }));
  }
}

function* watchGetAuthRequest() {
  yield takeLatest(AuthTypes.GET_AUTH_REQUEST, getAuth);
}

function* autoLogin() {
  const { token, email, userName } = storage.getData();
  if (!token || !email || !userName) {
    yield put(actions.logoutRequest());
  } else {
    const expirationDate = new Date(
      storage.getItem("expirationDate") as string
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logoutRequest());
    } else {
      yield put(actions.getAuthSuccess({ email, userName, token }));
      yield put(
        actions.autoLogoutRequest({
          time: (expirationDate.getTime() - new Date().getTime()) / 1000,
        })
      );
    }
  }
}

function* watchAutoLoginRequest() {
  yield takeLatest(AuthTypes.AUTO_LOGIN_REQUEST, autoLogin);
}

function* autoLogout({ time }: AutoLogoutRequest) {
  yield call(delay, 5 * 1000);
  yield put(actions.logoutRequest());
}

function* watchAutoLogoutRequest() {
  yield takeLatest(AuthTypes.AUTO_LOGOUT_REQUEST, autoLogout);
}

function* logout() {
  storage.clear();
  yield put(actions.logoutSuccess());
}

function* watchLogoutRequest() {
  yield takeLatest(AuthTypes.LOGOUT_REQUEST, logout);
}

const authSagas = [
  fork(watchGetAuthRequest),
  fork(watchAutoLoginRequest),
  fork(watchAutoLogoutRequest),
  fork(watchLogoutRequest),
];

export default authSagas;
