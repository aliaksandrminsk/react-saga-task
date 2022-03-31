import {
  AddNoteRequest,
  ChangeNoteSuccess,
  FetchNotesError,
  FetchNotesSuccess,
  NoteTypes,
  RemoveNoteSuccess,
  SaveNotesError,
  SaveNotesSuccess,
  SetFilterRequest,
} from "../actions/notes/types";

import { Action } from "redux";
import { INote } from "../interfaces/INote";
import { INoteState } from "./index";

const INITIAL_STATE: INoteState = {
  notes: new Array<INote>(),
  updatedNotes: new Array<INote>(),
  loading: false,
  errorMessage: "",
  filter: "all",
};

export default function notes(
  state = INITIAL_STATE,
  action: Action
): INoteState {
  switch (action.type) {
    case NoteTypes.FETCH_NOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NoteTypes.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        notes: [...(action as FetchNotesSuccess).notes],
        updatedNotes: [...(action as FetchNotesSuccess).notes],
        filter: "all",
      };
    case NoteTypes.FETCH_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: (action as FetchNotesError).errorMessage,
      };

    case NoteTypes.SAVE_NOTES_SUCCESS:
      return {
        ...state,
        notes: [...(action as SaveNotesSuccess).updatedNotes],
        errorMessage: "",
      };
    case NoteTypes.SAVE_NOTES_ERROR:
      return {
        ...state,
        errorMessage: (action as SaveNotesError).errorMessage,
      };
    case NoteTypes.CHANGE_NOTE_SUCCESS:
      return {
        ...state,
        errorMessage: "",
        updatedNotes: [...(action as ChangeNoteSuccess).updatedNotes],
      };
    case NoteTypes.ADD_NOTE_REQUEST:
      return {
        ...state,
        errorMessage: "",
        updatedNotes: [...state.updatedNotes, (action as AddNoteRequest).note],
      };
    case NoteTypes.SET_FILTER_REQUEST:
      return {
        ...state,
        errorMessage: "",
        filter: (action as SetFilterRequest).filter,
      };
    case NoteTypes.REMOVE_NOTE_REQUEST:
      return {
        ...state,
        errorMessage: "",
        updatedNotes: [...(action as RemoveNoteSuccess).updatedNotes],
      };
    default:
      return state;
  }
}
