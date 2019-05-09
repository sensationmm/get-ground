import { auth, initialState } from './auth'
import {
  SAVE_AUTH
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
});
