import {
  AddNoteRequest,
  ChangeNoteRequest,
  ChangeNoteSuccess,
  FetchNotesError,
  FetchNotesRequest,
  FetchNotesSuccess,
  NoteTypes,
  RemoveNoteRequest,
  RemoveNoteSuccess,
  SaveNotesError,
  SaveNotesRequest,
  SaveNotesSuccess,
  SetFilterRequest,
} from "./types";
import { INote } from "../../interfaces/INote";

export const fetchNotesRequest = (): FetchNotesRequest => ({
  type: NoteTypes.FETCH_NOTES_REQUEST,
});

export const fetchNotesSuccess = ({
  notes,
}: {
  notes: Array<INote>;
}): FetchNotesSuccess => ({
  type: NoteTypes.FETCH_NOTES_SUCCESS,
  notes,
});

export const fetchNotesError = ({
  errorMessage,
}: {
  errorMessage: string;
}): FetchNotesError => ({
  type: NoteTypes.FETCH_NOTES_ERROR,
  errorMessage,
});

export const saveNotesRequest = (): SaveNotesRequest => ({
  type: NoteTypes.SAVE_NOTES_REQUEST,
});

export const saveNotesSuccess = ({
  updatedNotes,
}: {
  updatedNotes: Array<INote>;
}): SaveNotesSuccess => ({
  type: NoteTypes.SAVE_NOTES_SUCCESS,
  updatedNotes,
});

export const saveNotesError = ({
  errorMessage,
}: {
  errorMessage: string;
}): SaveNotesError => ({
  type: NoteTypes.SAVE_NOTES_ERROR,
  errorMessage,
});

export const changeNoteRequest = (id: string): ChangeNoteRequest => ({
  type: NoteTypes.CHANGE_NOTE_REQUEST,
  id,
});

export const changeNoteSuccess = (
  updatedNotes: Array<INote>
): ChangeNoteSuccess => ({
  type: NoteTypes.CHANGE_NOTE_SUCCESS,
  updatedNotes,
});

export const addNoteRequest = (note: INote): AddNoteRequest => ({
  type: NoteTypes.ADD_NOTE_REQUEST,
  note,
});

export const setFilterRequest = (filter: string): SetFilterRequest => ({
  type: NoteTypes.SET_FILTER_REQUEST,
  filter,
});

export const removeNoteRequest = (id: string): RemoveNoteRequest => ({
  type: NoteTypes.REMOVE_NOTE_REQUEST,
  id,
});

export const removeNoteSuccess = (
  updatedNotes: Array<INote>
): RemoveNoteSuccess => ({
  type: NoteTypes.REMOVE_NOTE_SUCCESS,
  updatedNotes,
});
