import { activeCompany, initialState } from './activeCompany'
import {
  SET_ACTIVE_COMPANY
} from 'src/config/constants';

describe('activeCompany reducer', () => {
  it('SET_ACTIVE_COMPANY stores selected company id', () => {
    const action = {
      type: SET_ACTIVE_COMPANY,
      companyID: '3'
    }

    const expectedState = '3';

    const newState = activeCompany(initialState, action)
    expect(newState).toEqual(expectedState);
  });
});
