import { INote } from "../../interfaces/INote";

export interface INoteState {
  notes: Array<INote>;
  updatedNotes: Array<INote>;
  loading: boolean;
  errorMessage: string;
  filter: string;
}
