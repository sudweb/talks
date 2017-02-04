import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  loadProfile, LOAD_PROFILE
} from './Profile';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Profile actions', () => {

  describe('loadProfile', () => {
    it('should create action FETCHED_NOTES with notes', () => {
      const store = mockStore({});
      store.dispatch(loadProfile())
      expect(store.getActions()).toEqual([{
        type: LOAD_PROFILE
      }]);
    });
  });
});