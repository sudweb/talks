import { batchGet, batchUpdate } from '../services/GoogleAPI';
import {
  handleError
} from './App';
import {
  parseNotes,
  findColumnLetter
} from '../selectors/Notes';

const maxRow = require('../config').maxRow;

export const LOAD_NOTES = 'LOAD_NOTES';
export const FETCHED_NOTES = 'FETCHED_NOTES';
export const VOTE = 'VOTE';

export const fetchedNotes = notes => ({
  type: FETCHED_NOTES,
  notes: notes
});

export const loadNotes = () => dispatch => {
  dispatch({
    type: LOAD_NOTES
  });
  batchGet(['Notes!A1:K70'])
  .then(response => {
    const values = response.valueRanges[0].values;
    if (values.length > 0) {
      const notes = parseNotes(values);
      dispatch(fetchedNotes(notes));
    } else {
      dispatch(handleError('No data found.'));
    }
  })
  .catch(error => {
    dispatch(handleError(error.message));
  });
}

export const vote = (name, note) => (dispatch, getState) => {
  const state = getState();
  const nameArray = Object.keys(state.notes[state.selectedTalk].values);
  const column = findColumnLetter(name, nameArray);
  const row = state.selectedTalk + 2; // sheet values start at 2;

  dispatch({
    type: VOTE,
    range: `Notes!${column}${row}:${column}${maxRow}`,
    values: [[note]]
  });
  batchUpdate(`Notes!${column}${row}:${column}${maxRow}`, [[note]])
  .then(response => {
    dispatch(loadNotes(state.selectedTalk+2));
  }, error => dispatch(handleError(error.message)));
}
