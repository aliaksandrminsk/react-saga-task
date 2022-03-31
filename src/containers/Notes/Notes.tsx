import React, { Component } from "react";
import classes from "./Notes.module.css";
import { connect } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import { isEqual } from "../../lib/isEqual";
import { FilterTypes } from "./FilterTypes";
import NoteTable from "./NoteTable";
import {
  AddNoteRequest,
  FetchNotesRequest,
  SaveNotesRequest,
  SetFilterRequest,
} from "../../actions/notes/types";
import {
  addNoteRequest,
  fetchNotesRequest,
  saveNotesRequest,
  setFilterRequest,
} from "../../actions/notes/notes";
import { INote } from "../../interfaces/INote";
import { INoteState } from "../../reducers";

interface State {
  newNoteText: string;
}

interface DispatchProps {
  fetchNotesRequest: () => FetchNotesRequest;
  saveNotesRequest: () => SaveNotesRequest;
  addNoteRequest: (note: INote) => AddNoteRequest;
  setFilterRequest: (filter: string) => SetFilterRequest;
}

interface StateProps {
  notes: Array<INote>;
  updatedNotes: Array<INote>;
  loading: boolean;
  errorMessage: string;
  filter: string;
}

type Props = StateProps & DispatchProps;

function mapStateToProps({ note }: { note: INoteState }): StateProps {
  return {
    notes: note.notes,
    updatedNotes: note.updatedNotes,
    loading: note.loading,
    errorMessage: note.errorMessage,
    filter: note.filter,
  };
}

// function mapDispatchToProps(): DispatchProps {
//   return {
//     fetchNotesRequest: () => fetchNotesRequest(),
//     // saveNotes: () => saveNotesRequest(),
//     // addNote: (note: INote) => addNoteRequest(note),
//     // setFilter: (filter: string) => setFilterRequest(filter),
//   };
// }

class Notes extends Component<Props, State> {
  noteCounter = 0; //This counter uses to make unique id when we are creating new note.

  constructor(props: Props) {
    super(props);
    this.state = {
      newNoteText: "",
    };
  }

  getFilteredNotes = (filter: string): Array<INote> => {
    return this.props.updatedNotes.filter((value) => {
      if (filter === FilterTypes.COMPLETED) {
        return value.done;
      } else if (filter === FilterTypes.WAITING) {
        return !value.done;
      }
      return true;
    });
  };

  onAddNoteHandler = () => {
    const note: INote = {
      id: "id" + (this.props.notes.length + this.noteCounter),
      text: this.state.newNoteText,
      done: false,
    };
    this.props.addNoteRequest(note);
    this.setState({ newNoteText: "" });
    this.noteCounter++;
  };

  componentDidMount() {
    this.props.fetchNotesRequest();
  }

  render() {
    const completedNotesCount = this.getFilteredNotes("completed").length;

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
                onChange={this.props.setFilterRequest.bind(
                  this,
                  FilterTypes.All
                )}
                checked={this.props.filter === FilterTypes.All}
              />
              <label className="form-check-label" htmlFor="filterRadio1">
                All ({this.props.updatedNotes.length})
              </label>
            </div>
            <br />
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="filterRadio"
                id="filterRadio2"
                onChange={this.props.setFilterRequest.bind(
                  this,
                  FilterTypes.COMPLETED
                )}
                checked={this.props.filter === FilterTypes.COMPLETED}
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
                onChange={this.props.setFilterRequest.bind(
                  this,
                  FilterTypes.WAITING
                )}
                checked={this.props.filter === FilterTypes.WAITING}
              />
              <label className="form-check-label" htmlFor="filterRadio3">
                Waiting ({this.props.updatedNotes.length - completedNotesCount})
              </label>
            </div>
          </div>

          <br />
          {this.props.errorMessage ? (
            <h4 className="text-danger d-flex justify-content-center mb-4">
              {this.props.errorMessage}
            </h4>
          ) : null}

          {this.props.loading ? (
            <Loader />
          ) : (
            <NoteTable getFilteredNotes={this.getFilteredNotes} />
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
              value={this.state.newNoteText}
              onChange={(e) => this.setState({ newNoteText: e.target.value })}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
                onClick={this.onAddNoteHandler}
                disabled={this.state.newNoteText.trim().length === 0}
              >
                Add note
              </button>
            </div>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            <button
              type="button"
              onClick={this.props.saveNotesRequest.bind(this)}
              className={"btn btn-primary " + classes.saveButton}
              disabled={isEqual(this.props.notes, this.props.updatedNotes)}
            >
              Save notes
            </button>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  fetchNotesRequest,
  saveNotesRequest,
  addNoteRequest,
  setFilterRequest,
})(Notes);
