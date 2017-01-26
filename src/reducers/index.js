import {
  AUTHORIZE,
  SIGN_OUT
} from '../actions/Auth';

import {
  FETCHED_TALKS,
  SELECT_TALK,
  PERMISSION_DENIED
} from '../actions/Talks';

import {
  FETCHED_PROFILE
} from '../actions/Profile';

import {
  TOGGLE_DRAWER,
  FILTER_TALKS,
  HANDLE_ERROR
} from '../actions/App';

const defaultState = {
  authorize: false,
  permission: null,
  errorMessage: null,
  profile: null,
  selectedTalk: null,
  talks: null,
  notes: null,
  filter: null
};

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTHORIZE:
      return {
        ...state,
        authorize: action.authorize,
      };

    case FETCHED_TALKS:
      return {
        ...state,
        permission: true,
        talks: action.talks
      };

    case TOGGLE_DRAWER:
      return {
        ...state,
        drawerIsOpen: action.open
      }

    case FILTER_TALKS:
      return {
        ...state,
        filter: action.filter
      }

    case SELECT_TALK:
      return {
        ...state,
        selectedTalk: action.talk
      }

    case FETCHED_PROFILE:
      return  {
        ...state,
        profile: action.profile
      }

    case SIGN_OUT:
      return {
        ...state,
        talks: null,
        profile: null,
        authorize: false,
        permission: null
      }

    case HANDLE_ERROR:
      return {
        ...state,
        errorMessage: action.message
      }

    case PERMISSION_DENIED:
      return {
        ...state,
        permission: false
      }

    default:
      return state;
  }
}