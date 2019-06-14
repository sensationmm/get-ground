import { mockStore } from '../../test-utils/test-utils';

import { USER_LOGIN, USER_UPDATE, DELETE_USER } from '../../config/constants';
import { userLogin, userUpdate, deleteUser } from './user'

describe('User actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('userLogin', () => {
    const user = { name: 'Spongebob', email: 'spongebob@test.com' };
    store.dispatch(userLogin(user));
    expect(store.getActions()).toEqual([{ type: USER_LOGIN, user: user }]);
  });

  test('userUpdate', () => {
    const name = 'Spongebob';
    store.dispatch(userUpdate('name', name));
    expect(store.getActions()).toEqual([{ type: USER_UPDATE, key: 'name', value: name }]);
  });

  test('deleteUser', () => {
    store.dispatch(deleteUser());
    expect(store.getActions()).toEqual([{ type: DELETE_USER }]);
  });
});
