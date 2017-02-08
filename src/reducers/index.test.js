import {
    defaultState,
    rootReducer
} from './index';

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

describe('rootReducer', () => {
    it('should return initialState if no state', () => {
        expect(rootReducer(undefined, {})).toEqual(defaultState);
    });

    it('should return state if no match for action.type', () => {
      const testState = {type: 'test'};
      expect(rootReducer(testState, {})).toEqual(testState);
    });

    it('should change state start if action.type is AUTHORIZE', () => {
      const baseState = {authorize: false};
      const expectedState = {authorize: true};

      const testAction = {type: AUTHORIZE, authorize: true};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is LOAD_TALKS', () => {
      const baseState = {loader: false};
      const expectedState = {loader: true};

      const testAction = {type: LOAD_TALKS, loader: true};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is LOAD_PROFILE', () => {
      const baseState = {loader: false};
      const expectedState = {loader: true};

      const testAction = {type: LOAD_PROFILE, loader: true};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is FETCHED_TALKS', () => {
      const baseState = {loader: false, permission: null, talks: null};
      const expectedState = {loader: false, permission: true, talks: 'test'};

      const testAction = {type: FETCHED_TALKS, talks: 'test'};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is FETCHED_NOTES', () => {
      const baseState = {loader: false, notes: null, ownName: null, profile: {name: 'alex'}};
      const expectedState = {loader: false, notes: [{values: {alex: 0}, total: 0}], ownName: 'alex', profile: {name: 'alex'}};

      const testAction = {type: FETCHED_NOTES, notes: [{values: {alex: 0}, total: 0}]};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is UPDATE_TALKS_NOTE', () => {
      const baseState = {talks: [{note: 0}, {note: 0}, {note: 0}]};
      const expectedState = {talks: [{note: 0}, {note: 1}, {note: 0}]};

      const testAction = {type: UPDATE_TALKS_NOTE, id: 3, note: 1};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is FETCHED_PROFILE', () => {
      const baseState = {profile: null};
      const expectedState = {profile: 'test'};

      const testAction = {type: FETCHED_PROFILE, profile: 'test'};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is FILTER_TALKS', () => {
      const baseState = {filter: null, selectedTalk: 1, loader: true};
      const expectedState = {filter: 'test', selectedTalk: null, loader: false};

      const testAction = {type: FILTER_TALKS, filter: 'test'};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is SORT_TALK', () => {
      const baseState = {sortBy: null};
      const expectedState = {sortBy: 'test'};

      const testAction = {type: SORT_TALK, value: 'test'};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is TOGGLE_DRAWER', () => {
      const baseState = {drawerIsOpen: true};
      const expectedState = {drawerIsOpen: false};

      const testAction = {type: TOGGLE_DRAWER, open: false};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is SELECT_TALK', () => {
      const baseState = {selectedTalk: null};
      const expectedState = {selectedTalk: 1};

      const testAction = {type: SELECT_TALK, id: 1};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is SIGN_OUT', () => {
      const baseState = {talks: [], profile: 'test', authorize: true, permission: true};
      const expectedState = {talks: null, profile: null, authorize: false, permission: null};

      const testAction = {type: SIGN_OUT};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is HANDLE_ERROR', () => {
      const baseState = {errorMessage: null};
      const expectedState = {errorMessage: 1};

      const testAction = {type: HANDLE_ERROR, message: 1};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

    it('should change state start if action.type is PERMISSION_DENIED', () => {
      const baseState = {permission: null};
      const expectedState = {permission: false};

      const testAction = {type: PERMISSION_DENIED};
      expect(rootReducer(baseState, testAction)).toEqual(expectedState);
    });

});