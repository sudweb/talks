import { 
  authorize,
  signOut
} from '../services/GoogleAPI';

import {
  loadTalks
} from './Talks';

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
        return dispatch({
          type: AUTHORIZE,
          authorize: true
        });
      })
      .catch(error => this.handleError(error))
}


export const signout = () => dispatch => {
  signOut();
  return dispatch({
    type: SIGN_OUT
  })
}