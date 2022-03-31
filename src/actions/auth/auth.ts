import {
  AuthTypes,
  AutoLoginRequest,
  GetAuthRequest,
  GetAuthSuccess,
  LogoutRequest,
  AutoLogoutRequest,
  LogoutSuccess,
  ErrorRequest,
} from "./types";

export const getAuthRequest = ({
  email,
  password,
  name,
  surname,
}: {
  email: string;
  password: string;
  name?: string;
  surname?: string;
}): GetAuthRequest => ({
  type: AuthTypes.GET_AUTH_REQUEST,
  email,
  password,
  name,
  surname,
});

export const getAuthSuccess = ({
  email,
  userName,
  token,
}: {
  email: string;
  userName: string;
  token: string;
}): GetAuthSuccess => ({
  type: AuthTypes.GET_AUTH_SUCCESS,
  email,
  userName,
  token,
});

export const logoutRequest = (): LogoutRequest => ({
  type: AuthTypes.LOGOUT_REQUEST,
});

export const logoutSuccess = (): LogoutSuccess => ({
  type: AuthTypes.LOGOUT_SUCCESS,
});

export const autoLoginRequest = (): AutoLoginRequest => ({
  type: AuthTypes.AUTO_LOGIN_REQUEST,
});

export const autoLogoutRequest = ({
  time,
}: {
  time: number;
}): AutoLogoutRequest => ({
  type: AuthTypes.AUTO_LOGOUT_REQUEST,
  time,
});

export const errorRequest = ({
  serverErrorMessage,
}: {
  serverErrorMessage: string;
}): ErrorRequest => ({
  type: AuthTypes.Error_REQUEST,
  serverErrorMessage,
});
