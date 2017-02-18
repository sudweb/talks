import { connect } from "react-redux";
import NotesView from "../components/NotesView";
import { getOwnNote, getOthersNote } from "../selectors/Notes";
import { vote } from "../actions/Notes";

const mapStateToProps = state => {
  const notes = state.notes[state.selectedTalk].values;

  return {
    ownName: state.ownName,
    ownNote: getOwnNote(notes, state.ownName),
    myProfileName: state.profile.name,
    othersNote: getOthersNote(notes, state.ownName),
    globalNote: state.notes[state.selectedTalk].total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    vote: (name, note) => dispatch(vote(name, note))
  };
};

const Notes = connect(mapStateToProps, mapDispatchToProps)(NotesView);

export default Notes;
