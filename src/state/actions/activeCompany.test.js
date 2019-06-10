import { mockStore } from 'src/test-utils/test-utils';

import { SET_ACTIVE_COMPANY } from 'src/config/constants';
import { setActiveCompany } from './activeCompany'

describe('activeCompany actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('setActiveCompany', () => {
    const companyID = 3;
    store.dispatch(setActiveCompany(companyID));
    expect(store.getActions()).toEqual([{ type: SET_ACTIVE_COMPANY, companyID: companyID }]);
  });
});
