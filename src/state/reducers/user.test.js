import { user, initialState } from './user'
import {
  USER_LOGIN
} from '../../config/constants';

describe('user reducer', () => {
  it('USER_LOGIN stores user object', () => {
    const userObj = { name: 'Spongebob', email: 'spongebob@test.com' };
    const action = {
      type: USER_LOGIN,
      user: userObj
    };

    const expectedState = userObj;

    const newState = user(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
