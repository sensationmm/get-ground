import { user, initialState } from './user'
import {
  USER_LOGIN,
  USER_UPDATE
} from '../../config/constants';

describe('user reducer', () => {
  it('default state', () => {
    const state = user();
    expect(state).toEqual(initialState);
  });

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

  it('USER_UPDATE updates user object', () => {
    const userObj = { name: 'Spongebob' };
    const action = {
      type: USER_UPDATE,
      key: 'name',
      value: userObj.name
    };

    const expectedState = userObj;

    const newState = user(initialState, action);
    expect(newState).toEqual(expect.objectContaining(expectedState));
  });
});
