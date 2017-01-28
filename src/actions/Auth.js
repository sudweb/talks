import { 
  authorize,
  signOut
} from '../services/GoogleAPI';
import {
  handleError
} from './App';
import {
  loadTalks
} from './Talks';

import {
  loadNotes
} from './Notes';

import {
  loadProfile
} from './Profile';

export const AUTHORIZE = 'AUTHORIZE';
export const SIGN_OUT = 'SIGN_OUT';

export const requestAuth = immediate => dispatch => {
    authorize(immediate)
      .then(() => {
        dispatch(loadTalks())
        dispatch(loadProfile())
        dispatch(loadNotes())
        return dispatch({
          type: AUTHORIZE,
          authorize: true
        });
      })
      .catch(error => {
        if (error !== 'immediate_failed') {
          dispatch(handleError(error))
        }
      })
}


export const signout = () => dispatch => {
  signOut();
  return dispatch({
    type: SIGN_OUT
  })
}