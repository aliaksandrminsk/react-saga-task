import {
  AuthTypes,
  AutoLoginRequest,
  GetAuthRequest,
  GetAuthSuccess,
  LogoutRequest,
  AutoLogoutRequest,
} from "./types";

export const getAuthRequest = (
  email: string,
  password: string,
  name?: string,
  surname?: string
): GetAuthRequest => ({
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
