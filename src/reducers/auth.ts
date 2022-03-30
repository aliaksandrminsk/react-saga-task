import { AuthTypes, GetAuthSuccess } from "../actions/auth/types";
import { Action } from "redux";
import { IAuthState } from "./interfaces/IAuthState";

const INITIAL_STATE: IAuthState = {
  token: null,
  email: "",
  userName: "",
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
      };
    case AuthTypes.LOGOUT_REQUEST:
      return {
        ...state,
        token: null,
        email: "",
        userName: "",
      };
    default:
      return state;
  }
}
