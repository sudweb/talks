import {
  AUTHORIZE,
  SIGN_OUT
} from '../actions/Auth';

import {
  LOAD_TALKS,
  FETCHED_TALKS,
  SELECT_TALK,
  PERMISSION_DENIED,
  SORT_TALK,
  UPDATE_TALKS_NOTE
} from '../actions/Talks';

import {
  LOAD_PROFILE,
  FETCHED_PROFILE
} from '../actions/Profile';

import {
  FETCHED_NOTES
} from '../actions/Notes';

import {
  TOGGLE_DRAWER,
  FILTER_TALKS,
  HANDLE_ERROR
} from '../actions/App';

import {
  getOwnName
} from '../selectors/Notes';

const defaultState = {
  loader: false,
  authorize: false,
  permission: null,
  errorMessage: null,
  profile: null,
  selectedTalk: null,
  talks: null,
  notes: null,
  filter: null,
  sortBy: 'date'
};

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTHORIZE:
      return {
        ...state,
        authorize: action.authorize,
      };

    case LOAD_TALKS: 
      return {
        ...state,
        loader: true
      }

    case LOAD_PROFILE: 
      return {
        ...state,
        loader: true
      }

    case FETCHED_TALKS:
      return {
        ...state,
        loader: false,
        permission: true,
        talks: action.talks
      };

    case FETCHED_NOTES:
      const ownName = getOwnName(action.notes[0], state.profile.name);
      return {
        ...state,
        loader: false,
        notes: action.notes,
        ownName: ownName
      }
    
    case UPDATE_TALKS_NOTE:
      const newTalks = state.talks.slice(0);
      newTalks[action.id-2] = {
        ...newTalks[action.id-2],
        note: action.note
      };
      return {
        ...state,
        talks: newTalks
      }

    case FETCHED_PROFILE:
      return  {
        ...state,
        profile: action.profile
      }

    case FILTER_TALKS:
      return {
        ...state,
        selectedTalk: null,
        loader: false,
        filter: action.filter
      }

    case SORT_TALK:
      return {
        ...state,
        sortBy: action.value
      }
    
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawerIsOpen: action.open
      }

    case SELECT_TALK:
      return {
        ...state,
        selectedTalk: action.index
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