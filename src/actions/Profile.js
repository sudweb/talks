import {
  requestPeople
} from '../services/GoogleAPI';

export const LOAD_PROFILE = 'LOAD_PROFILE';
export const FETCHED_PROFILE = 'FETCHED_PROFILE';

export const loadProfile = result => dispatch => {
  dispatch({
    type: LOAD_PROFILE
  });

  requestPeople()
  .then(response => {
    const result = response.result;
    let profile = {};
    if (result.names) {
      profile.name = result.names[0].displayName;
    }
    if (result.emailAddresses) {
      profile.email = result.emailAddresses[0].value;
    }

    if (result.photos) {
      profile.img = result.photos[0].url;
    }
    return dispatch({
      type: FETCHED_PROFILE,
      profile: profile
    })
  }, error => this.handleError(error))
}