import { all } from "redux-saga/effects";
import authSagas from "./auth";
import noteSagas from "./notes";

export default function* rootSaga() {
  yield all([...noteSagas, ...authSagas]);
}
