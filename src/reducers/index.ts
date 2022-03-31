import { combineReducers, Reducer } from "redux";
import authReducer from "./auth";
import noteReducer from "./notes";
import { INote } from "../interfaces/INote";

export interface IApplicationState {
  note: INoteState;
  auth: IAuthState;
}

export interface IAuthState {
  token: string | null;
  email: string;
  userName: string;
  serverErrorMessage: string;
}

export interface INoteState {
  notes: Array<INote>;
  updatedNotes: Array<INote>;
  loading: boolean;
  errorMessage: string;
  filter: string;
}

export const reducers: Reducer<IApplicationState> =
  combineReducers<IApplicationState>({
    note: noteReducer,
    auth: authReducer,
  });
