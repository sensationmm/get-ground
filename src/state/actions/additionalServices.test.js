import { mockStore } from 'src/test-utils/test-utils';

import { SET_ADDITIONAL_SERVICES } from 'src/config/constants';
import { setAdditionalServices } from './additionalServices'

describe('Auth actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('saveAuth', () => {
    const payload = {
      mortgage: true,
      insurance: true,
      management: true
    }
    store.dispatch(setAdditionalServices(payload));
    expect(store.getActions()).toEqual([{ type: SET_ADDITIONAL_SERVICES, payload }]);
  });
});
