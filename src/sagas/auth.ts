import {
  takeEvery,
  //takeLatest,
  //take,
  call,
  put,
  fork,
} from "redux-saga/effects";
import {
  AuthTypes,
  AutoLogoutRequest,
  GetAuthRequest,
} from "../actions/auth/types";

import * as api from "../api/auth";
import * as actions from "../actions/auth/auth";

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
    const idToken: string = data.idToken;
    const localId: string = data.localId;
    const expiresIn: number = data.expiresIn;

    if (isRegistration) {
      yield call(api.saveUserData, {
        email,
        name,
        surname,
      });
    } else {
      const { data: userData } = yield call(api.getUserData, { email });
      console.log("BBBBBBBBBB5 ", userData);
      name = userData.name;
      surname = userData.surname;
    }

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    let userName = name ? name : "";
    if (surname != null && surname.length > 0) userName += " " + surname;

    localStorage.setItem("token", idToken);
    localStorage.setItem("userId", localId);
    localStorage.setItem("expirationDate", expirationDate.toString());
    localStorage.setItem("email", email);
    localStorage.setItem("userName", userName);

    yield put(actions.getAuthSuccess({ email, userName, token: idToken }));
    yield put(actions.autoLogoutRequest({ time: expiresIn }));
  }

  // return yield call(api.getAuth, { url, email, password })
  //   .then((response) => {
  //     idToken = response.data?.idToken;
  //     localId = response.data?.localId;
  //     expiresIn = response.data?.expiresIn;
  //
  //     if (isRegistration) {
  //       return axios.put(
  //         `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}.json`,
  //         {
  //           name: name,
  //           surname: surname,
  //         }
  //       );
  //     } else {
  //       return axios.get(
  //         `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}.json`
  //       );
  //     }
  //   })
  //   .then((response) => {
  //     if (!isRegistration) {
  //       name = response.data.name;
  //       surname = response.data.surname;
  //     }
  //
  //     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //
  //     let userName = name ? name : "";
  //     if (surname != null && surname.length > 0) userName += " " + surname;
  //
  //     localStorage.setItem("token", idToken);
  //     localStorage.setItem("userId", localId);
  //     localStorage.setItem("expirationDate", expirationDate.toString());
  //     localStorage.setItem("email", email);
  //     localStorage.setItem("userName", userName);
  //
  //     dispatch(authSuccess(idToken, email, userName));
  //     dispatch(autoLogout(expiresIn));
  //   });
}

function* watchGetAuthRequest() {
  yield takeEvery(AuthTypes.GET_AUTH_REQUEST, getAuth);
}

function* autoLogin() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") ?? "";
  const email = localStorage.getItem("email");

  if (!token || !email) {
    //yield put(actions.logoutRequest());
    logout();
  } else {
    const expirationDate = new Date(
      localStorage.getItem("expirationDate") as string
    );
    if (expirationDate <= new Date()) {
      //yield put(actions.logoutRequest());
      logout();
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
  yield takeEvery(AuthTypes.AUTO_LOGIN_REQUEST, autoLogin);
}

function autoLogout({ time }: AutoLogoutRequest) {
  setTimeout(() => {
    logout();
  }, time * 1000);
}

function* watchAutoLogoutRequest() {
  yield takeEvery(AuthTypes.AUTO_LOGOUT_REQUEST, autoLogout);
}

function* logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("email");
  localStorage.removeItem("userName");

  yield put(actions.logoutSuccess());
}

function* watchLogoutRequest() {
  yield takeEvery(AuthTypes.LOGOUT_REQUEST, logout);
}

const authSagas = [
  fork(watchGetAuthRequest),
  fork(watchAutoLoginRequest),
  fork(watchAutoLogoutRequest),
  fork(watchLogoutRequest),
];

export default authSagas;
