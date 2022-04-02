import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork,
} from "redux-saga/effects";
import { select } from "redux-saga/effects";
import * as api from "../api/notes";
import { ChangeNoteRequest, NoteTypes } from "../actions/notes/types";
import * as actions from "../actions/notes/notes";
import { IApplicationState } from "../reducers";
import { INote } from "../interfaces/INote";

function* fetchNotes() {
  const state: IApplicationState = yield select();
  const { email } = state.auth;

  try {
    const { data } = yield call(api.getNotes, { email });

    const notes: Array<INote> = [];
    let counter = 0;
    if (data != null) {
      for (const value of Object.values(data)) {
        notes.push({
          id: "id" + counter++,
          text: (value as INote).text,
          done: (value as INote).done,
        });
      }
    }
    yield put(actions.fetchNotesSuccess({ notes }));
  } catch (error) {
    yield put(
      actions.fetchNotesError({
        errorMessage: "Error occurred. It appears something is broken.",
      })
    );
    console.error("An unexpected error happened:", error);
  }
}

function* watchFetchNotesRequest() {
  yield takeLatest(NoteTypes.FETCH_NOTES_REQUEST, fetchNotes);
}

function* saveNotes() {
  const state: IApplicationState = yield select();

  const { email } = state.auth;
  const { updatedNotes } = state.note;

  try {
    const data: any = {};
    let counter = 0;
    for (const item of updatedNotes) {
      item.id = "id" + counter; //update old item because new item can have a bug with id
      data[item.id] = { text: item.text, done: item.done };
      counter++;
    }
    yield call(api.saveNotes, { email, data });
    yield put(actions.saveNotesSuccess({ updatedNotes }));
  } catch (error) {
    yield put(
      actions.saveNotesError({
        errorMessage: "Something went wrong. Try again!",
      })
    );
    console.error("An unexpected error happened:", error);
  }
}

function* watchSaveNotesRequest() {
  yield takeLatest(NoteTypes.SAVE_NOTES_REQUEST, saveNotes);
}

function* changeNote({ id }: ChangeNoteRequest) {
  const state: IApplicationState = yield select();
  const newUpdatedNotes = [...state.note.updatedNotes];

  newUpdatedNotes.forEach((item, index) => {
    if (item.id === id) {
      newUpdatedNotes[index] = {
        id: item.id,
        text: item.text,
        done: !item.done,
      };
    }
  });
  yield put(actions.changeNoteSuccess({ updatedNotes: newUpdatedNotes }));
}

function* watchChangeNoteRequest() {
  yield takeEvery(NoteTypes.CHANGE_NOTE_REQUEST, changeNote);
}

function* removeNote({ id }: { id: string }) {
  const state: IApplicationState = yield select();
  const newUpdatedNotes = [...state.note.updatedNotes];

  for (const item of newUpdatedNotes) {
    if (item.id === id) {
      const index = newUpdatedNotes.indexOf(item);
      newUpdatedNotes.splice(index, 1);
      break;
    }
  }
  yield put(actions.removeNoteSuccess({ updatedNotes: newUpdatedNotes }));
}

function* watchRemoveNoteRequest() {
  while (true) {
    const { id } = yield take(NoteTypes.REMOVE_NOTE_REQUEST);
    yield call(removeNote, { id });
  }
}

const noteSagas = [
  fork(watchChangeNoteRequest),
  fork(watchSaveNotesRequest),
  fork(watchFetchNotesRequest),
  fork(watchRemoveNoteRequest),
];

export default noteSagas;
