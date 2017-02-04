import { batchGet } from '../services/GoogleAPI';
import { parseTalks } from '../selectors/Talks';
import {
  handleError
} from './App';

export const LOAD_TALKS = 'LOAD_TALKS';
export const FETCHED_TALKS = 'FETCHED_TALKS';
export const UPDATE_TALKS_NOTE= 'UPDATE_TALKS_NOTE';
export const PERMISSION_DENIED = 'PERMISSION_DENIED';
export const SELECT_TALK = 'SELECT_TALK';
export const SORT_TALK = 'SORT_TALK';

export const fetchedTalks = talks => ({
  type: FETCHED_TALKS,
  talks: talks
});

export const updateTalkNote = (talkId, note) => ({
  type: UPDATE_TALKS_NOTE,
  id: talkId,
  note: note
});

export const loadTalks = () => dispatch => {
  dispatch({
    type: LOAD_TALKS
  });
  batchGet(['Propositions'])
  .then(response => {
    const values = response.valueRanges[0].values;
    if (values.length > 0) {
      const talks = parseTalks(values);
      dispatch(fetchedTalks(talks));
    } else {
      dispatch(handleError('No data found.'));
    }
  })
  .catch(error => {
    dispatch(handleError(error.message));
    dispatch({type: PERMISSION_DENIED})
  });
}

export const selectTalk = id => ({
  type: 'SELECT_TALK',
  id: id - 1
});

export const sortTalks = value => ({
  type: 'SORT_TALK',
  value: value
});