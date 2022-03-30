import { Action } from "redux";
import { INote } from "../../interfaces/INote";

export enum NoteTypes {
  FETCH_NOTES_REQUEST = "FETCH_NOTES_REQUEST",
  FETCH_NOTES_SUCCESS = "FETCH_NOTES_SUCCESS",
  FETCH_NOTES_ERROR = "FETCH_NOTES_ERROR",
  SAVE_NOTES_REQUEST = "SAVE_NOTES_REQUEST",
  SAVE_NOTES_SUCCESS = "SAVE_NOTES_SUCCESS",
  SAVE_NOTES_ERROR = "SAVE_NOTES_ERROR",
  CHANGE_NOTE_REQUEST = "CHANGE_NOTE_REQUEST",
  CHANGE_NOTE_SUCCESS = "CHANGE_NOTE_SUCCESS",
  ADD_NOTE_REQUEST = "ADD_NOTE_REQUEST",
  SET_FILTER_REQUEST = "SET_FILTER_REQUEST",
  REMOVE_NOTE_REQUEST = "REMOVE_NOTE_REQUEST",
  REMOVE_NOTE_SUCCESS = "REMOVE_NOTE_SUCCESS",
}

export interface FetchNotesRequest extends Action {
  type: NoteTypes.FETCH_NOTES_REQUEST;
}

export interface FetchNotesSuccess extends Action {
  type: NoteTypes.FETCH_NOTES_SUCCESS;
  notes: Array<INote>;
}

export interface FetchNotesError extends Action {
  type: NoteTypes.FETCH_NOTES_ERROR;
  errorMessage: string;
}

export interface SaveNotesRequest extends Action {
  type: NoteTypes.SAVE_NOTES_REQUEST;
}

export interface SaveNotesSuccess extends Action {
  type: NoteTypes.SAVE_NOTES_SUCCESS;
  updatedNotes: Array<INote>;
}

export interface SaveNotesError extends Action {
  type: NoteTypes.SAVE_NOTES_ERROR;
  errorMessage: string;
}

export interface ChangeNoteRequest extends Action {
  type: NoteTypes.CHANGE_NOTE_REQUEST;
  id: string;
}

export interface ChangeNoteSuccess extends Action {
  type: NoteTypes.CHANGE_NOTE_SUCCESS;
  updatedNotes: Array<INote>;
}

export interface AddNoteRequest extends Action {
  type: NoteTypes.ADD_NOTE_REQUEST;
  note: INote;
}

export interface SetFilterRequest extends Action {
  type: NoteTypes.SET_FILTER_REQUEST;
  filter: string;
}

export interface RemoveNoteRequest extends Action {
  type: NoteTypes.REMOVE_NOTE_REQUEST;
  id: string;
}

export interface RemoveNoteSuccess extends Action {
  type: NoteTypes.REMOVE_NOTE_SUCCESS;
  updatedNotes: Array<INote>;
}
