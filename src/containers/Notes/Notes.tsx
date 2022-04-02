import React, { useEffect, useMemo, useRef, useState } from "react";
import classes from "./Notes.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import { isEqual } from "../../lib/isEqual";
import { FilterTypes } from "./FilterTypes";
import NoteTable from "./NoteTable";
import {
  addNoteRequest,
  fetchNotesRequest,
  saveNotesRequest,
  setFilterRequest,
} from "../../actions/notes/notes";
import { INote } from "../../interfaces/INote";
import { IApplicationState } from "../../reducers";

const Notes = () => {
  const noteCounter = useRef<number>(0); //This counter uses to make unique id when we are creating new note.
  const [newNoteText, setNewNoteText] = useState("");
  const dispatch = useDispatch();

  const notes = useSelector<IApplicationState, Array<INote>>(
    (state) => state.note.notes
  );
  const updatedNotes = useSelector<IApplicationState, Array<INote>>(
    (state) => state.note.updatedNotes
  );
  const loading = useSelector<IApplicationState, boolean>(
    (state) => state.note.loading
  );
  const errorMessage = useSelector<IApplicationState, string>(
    (state) => state.note.errorMessage
  );
  const filter = useSelector<IApplicationState, string>(
    (state) => state.note.filter
  );

  const getFilteredNotes = (filter: string): Array<INote> => {
    return updatedNotes.filter((value) => {
      if (filter === FilterTypes.COMPLETED) {
        return value.done;
      } else if (filter === FilterTypes.WAITING) {
        return !value.done;
      }
      return true;
    });
  };

  const onAddNoteHandler = () => {
    const note: INote = {
      id: "id" + (notes.length + noteCounter.current),
      text: newNoteText,
      done: false,
    };
    dispatch(addNoteRequest({ note }));
    setNewNoteText("");
    noteCounter.current++;
  };

  useEffect(() => {
    dispatch(fetchNotesRequest());
  }, []);

  const completedNotesCount = useMemo<number>(
    () => getFilteredNotes("completed").length,
    [updatedNotes]
  );

  return (
    <div className="d-flex justify-content-center flex-grow-1 pt-4 pt-sm-5">
      <div className="w-100 px-sm-5">
        <h2 className="text-center mb-3">Notes</h2>

        <div className="container d-flex justify-content-center">
          <div className="form-check mx-2">
            <input
              className="form-check-input"
              type="radio"
              name="filterRadio"
              id="filterRadio1"
              onChange={() =>
                dispatch(setFilterRequest({ filter: FilterTypes.All }))
              }
              checked={filter === FilterTypes.All}
            />
            <label className="form-check-label" htmlFor="filterRadio1">
              All ({updatedNotes.length})
            </label>
          </div>
          <br />
          <div className="form-check mx-2">
            <input
              className="form-check-input"
              type="radio"
              name="filterRadio"
              id="filterRadio2"
              onChange={() =>
                dispatch(setFilterRequest({ filter: FilterTypes.COMPLETED }))
              }
              checked={filter === FilterTypes.COMPLETED}
            />
            <label className="form-check-label" htmlFor="filterRadio2">
              Completed ({completedNotesCount})
            </label>
          </div>

          <div className="form-check mx-2">
            <input
              className="form-check-input"
              type="radio"
              name="filterRadio"
              id="filterRadio3"
              onChange={() =>
                dispatch(setFilterRequest({ filter: FilterTypes.WAITING }))
              }
              checked={filter === FilterTypes.WAITING}
            />
            <label className="form-check-label" htmlFor="filterRadio3">
              Waiting ({updatedNotes.length - completedNotesCount})
            </label>
          </div>
        </div>

        <br />
        {errorMessage ? (
          <h4 className="text-danger d-flex justify-content-center mb-4">
            {errorMessage}
          </h4>
        ) : null}

        {loading ? (
          <Loader />
        ) : (
          <NoteTable getFilteredNotes={getFilteredNotes} />
        )}

        <br />
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Text of note"
            aria-label="Text of note"
            aria-describedby="button-addon2"
            maxLength={200}
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              id="button-addon2"
              onClick={onAddNoteHandler}
              disabled={newNoteText.trim().length === 0}
            >
              Add note
            </button>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <button
            type="button"
            onClick={() => dispatch(saveNotesRequest())}
            className={"btn btn-primary " + classes.saveButton}
            disabled={isEqual(notes, updatedNotes)}
          >
            Save notes
          </button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Notes;
