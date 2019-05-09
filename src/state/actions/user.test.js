import { mockStore } from '../../test-utils/test-utils';

import { USER_LOGIN } from '../../config/constants';
import { userLogin } from './user'

describe('Auth actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('userLogin', () => {
    const user = { name: 'Spongebob', email: 'spongebob@test.com' };
    store.dispatch(userLogin(user));
    expect(store.getActions()).toEqual([{ type: USER_LOGIN, user: user }]);
  });
});
