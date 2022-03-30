import { combineReducers, Reducer } from "redux";
import authReducer from "./auth";
import noteReducer from "./notes";
import { INoteState } from "./interfaces/INoteState";
import { IAuthState } from "./interfaces/IAuthState";

export interface ApplicationState {
  note: INoteState;
  auth: IAuthState;
}

// export default combineReducers({
//   auth: AuthReducer,
//   notes: NotesReducer,
// });

export const reducers: Reducer<ApplicationState> =
  combineReducers<ApplicationState>({
    note: noteReducer,
    auth: authReducer,
  });
