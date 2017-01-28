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
  batchGet(['Notes!A1:K30'])
  .then(response => {
    const values = response.valueRanges[0].values;
    if (values.length > 0) {
      const talks = parseNotes(values);
      dispatch(fetchedNotes(talks));
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
  const nameArray = Object.keys(state.notes[state.selectedTalk]);
  const column = findColumnLetter(name, nameArray);
  const row = state.selectedTalk + 1; // sheet values start at 2;
  console.log(`${name} give a ${note} to ${state.selectedTalk}`);

  dispatch({
    type: VOTE,
    range: `Notes!${column}${row}:${column}${maxRow}`,
    values: [[note]]
  });
  batchUpdate(`Notes!${column}${row}:${column}${maxRow}`, [[note]])
  .then(response => {
    dispatch(loadNotes());
  }, error => dispatch(handleError(error.message)));
}