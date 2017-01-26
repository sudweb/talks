import { batchGet } from '../services/GoogleAPI';
import { parseTalks } from '../selectors/Talks';
import {
  handleError
} from './App';

export const LOAD_TALKS = 'LOAD_TALKS';
export const FETCHED_TALKS = 'FETCHED_TALKS';
export const SELECT_TALK = 'SELECT_TALK';

export const fetchedTalks = talks => ({
  type: FETCHED_TALKS,
  talks: talks
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
  .catch(error => dispatch(handleError(error.message)));
}

export const selectTalk = talk => ({
  type: 'SELECT_TALK',
  talk: talk
});