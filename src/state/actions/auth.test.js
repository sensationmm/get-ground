import { mockStore } from '../../test-utils/test-utils';

import { SAVE_AUTH, DELETE_AUTH } from '../../config/constants';
import { saveAuth, deleteAuth } from './auth'

describe('Auth actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('saveAuth', () => {
    const token = 'ABC123';
    store.dispatch(saveAuth(token));
    expect(store.getActions()).toEqual([{ type: SAVE_AUTH, token: token }]);
  });

  test('deleteAuth', () => {
    store.dispatch(deleteAuth());
    expect(store.getActions()).toEqual([{ type: DELETE_AUTH }]);
  });
});
