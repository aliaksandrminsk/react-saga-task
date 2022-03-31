import { Action } from "redux";

export enum AuthTypes {
  GET_AUTH_REQUEST = "GET_AUTH_REQUEST",
  GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS",
  LOGOUT_REQUEST = "LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  AUTO_LOGOUT_REQUEST = "AUTO_LOGOUT_REQUEST",
  AUTO_LOGIN_REQUEST = "AUTO_LOGIN_REQUEST",
  Error_REQUEST = "Error_REQUEST",
}

export interface GetAuthRequest extends Action {
  type: AuthTypes.GET_AUTH_REQUEST;
  email: string;
  password: string;
  name?: string;
  surname?: string;
}

export interface GetAuthSuccess extends Action {
  type: AuthTypes.GET_AUTH_SUCCESS;
  email: string;
  userName: string;
  token: string;
}

export interface LogoutRequest extends Action {
  type: AuthTypes.LOGOUT_REQUEST;
}

export interface LogoutSuccess extends Action {
  type: AuthTypes.LOGOUT_SUCCESS;
}

export interface AutoLoginRequest extends Action {
  type: AuthTypes.AUTO_LOGIN_REQUEST;
}

export interface AutoLogoutRequest extends Action {
  type: AuthTypes.AUTO_LOGOUT_REQUEST;
  time: number;
}

export interface ErrorRequest extends Action {
  type: AuthTypes.Error_REQUEST;
  serverErrorMessage: string;
}
