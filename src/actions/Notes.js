import { batchGet } from '../services/GoogleAPI';
import {
  handleError
} from './App';
import {
  parseNotes
} from '../selectors/Notes';

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

export const selectTalk = talk => ({
  type: 'SELECT_TALK',
  talk: talk
});