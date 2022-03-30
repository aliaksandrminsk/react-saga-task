import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork,
} from "redux-saga/effects";
import { select } from "redux-saga/effects";
import * as api from "../api/auth";
import axios from "axios";
import { encodeEmail } from "../lib/encodeEmail";

import {
  ChangeNoteRequest,
  NoteTypes,
  RemoveNoteRequest,
} from "../actions/notes/types";
import * as actions from "../actions/notes/notes";
import { INoteState } from "../reducers/interfaces/INoteState";
import { INote } from "../interfaces/INote";

function* fetchNotes() {
  /*const state: INoteState = yield select();
  const { email } = state.auth;

    try {
      const response = yield call(api.getNotes, { email});

      const notes: Array<INote> = [];
      let counter = 0;
      if (response.data != null) {
        for (const value of Object.values(response.data)) {
          notes.push({
            id: "id" + counter++,
            text: (value as INote).text,
            done: (value as INote).done,
          });
        }
      }
      yield put(actions.fetchNotesSuccess({ notes }));
    } catch (error) {
      yield put(actions.fetchNotesError({ errorMessage: "Error occurred. It appears something is broken." }));
      console.error("An unexpected error happened:", error);
    }
  }*/
}

function* watchFetchNotesRequest() {
  yield takeLatest(NoteTypes.FETCH_NOTES_REQUEST, fetchNotes);
}

function* saveNotes() {
  /*const state: INoteState = yield select();

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
      await axios.put(
        `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}/data.json/`,
        data
      );
      yield call(api.saveNotes, { email, data });
      yield put(actions.saveNotesSuccess({ updatedNotes }));

    } catch (error) {
      yield put(actions.saveNotesError({ errorMessage: "Something went wrong. Try again!" }));
      console.error("An unexpected error happened:", error);
    }
  };*/
}

function* watchSaveNotesRequest() {
  yield takeLatest(NoteTypes.SAVE_NOTES_REQUEST, saveNotes);
}

function* changeNote({ id }: ChangeNoteRequest) {
  const state: INoteState = yield select();
  const newUpdatedNotes = [...state.updatedNotes];
  newUpdatedNotes.forEach((item, index) => {
    if (item.id === id) {
      newUpdatedNotes[index] = {
        id: item.id,
        text: item.text,
        done: !item.done,
      };
    }
  });
  yield put(actions.changeNoteSuccess(newUpdatedNotes));
}

function* watchChangeNoteRequest() {
  yield takeLatest(NoteTypes.CHANGE_NOTE_REQUEST, changeNote);
}

function* removeNote({ id }: RemoveNoteRequest) {
  const state: INoteState = yield select();
  const newUpdatedNotes = [...state.updatedNotes];
  for (const item of newUpdatedNotes) {
    if (item.id === id) {
      const index = newUpdatedNotes.indexOf(item);
      newUpdatedNotes.splice(index, 1);
      break;
    }
  }
  yield put(actions.removeNoteSuccess(newUpdatedNotes));
}

function* watchRemoveNoteRequest() {
  yield takeLatest(NoteTypes.REMOVE_NOTE_REQUEST, removeNote);
}

const noteSagas = [
  fork(watchChangeNoteRequest),
  fork(watchSaveNotesRequest),
  fork(watchFetchNotesRequest),
  fork(watchRemoveNoteRequest),
];

export default noteSagas;
