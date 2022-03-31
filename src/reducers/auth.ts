import { AuthTypes, ErrorRequest, GetAuthSuccess } from "../actions/auth/types";
import { Action } from "redux";
import { IAuthState } from "./index";

const INITIAL_STATE: IAuthState = {
  token: null,
  email: "",
  userName: "",
  serverErrorMessage: "",
};

export default function auth(
  state = INITIAL_STATE,
  action: Action
): IAuthState {
  switch (action.type) {
    case AuthTypes.GET_AUTH_SUCCESS:
      return {
        ...state,
        token: (action as GetAuthSuccess).token,
        email: (action as GetAuthSuccess).email,
        userName: (action as GetAuthSuccess).userName,
        serverErrorMessage: "",
      };
    case AuthTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        email: "",
        userName: "",
        serverErrorMessage: "",
      };
    case AuthTypes.Error_REQUEST:
      return {
        ...state,
        serverErrorMessage: (action as ErrorRequest).serverErrorMessage,
      };
    default:
      return state;
  }
}
