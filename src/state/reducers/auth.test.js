import { auth, initialState } from './auth'
import {
  SAVE_AUTH,
  DELETE_AUTH
} from '../../config/constants';

describe('auth reducer', () => {
  it('SAVE_AUTH stores auth token', () => {
    const action = {
      type: SAVE_AUTH,
      token: 'ABC123'
    }

    const expectedState = {
      token: 'ABC123'
    }

    const newState = auth(initialState, action)
    expect(newState).toEqual(expectedState);
  });

  it('DELETE_AUTH removes auth token', () => {
    const action = {
      type: DELETE_AUTH
    }

    const expectedState = {
      token: null
    }

    const newState = auth(initialState, action)
    expect(newState).toEqual(expectedState);
  });
});
