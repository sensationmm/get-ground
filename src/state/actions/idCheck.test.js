import { setImg, setRetake } from './idCheck'

import { mockStore } from '../../test-utils/test-utils';

import { SET_PASSPORT, SET_ADDRESS, SET_SELFIE, SET_RETAKE_SELFIE } from 'src/config/constants';

describe('Loader actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('setImg passed passport section returns an action with type `SET_PASSPORT and img`', () => {
    store.dispatch(setImg('passport', 'passport-img'));
    expect(store.getActions()).toEqual([{ type: SET_PASSPORT, img: 'passport-img' }]);
  });

  test('setImg passed address section returns an action with type `SET_ADDRESS and img`', () => {
    store.dispatch(setImg('address', 'address-img'));
    expect(store.getActions()).toEqual([{ type: SET_ADDRESS, img: 'address-img' }]);
  });

  test('setImg passed selfie section returns an action with type `SET_SELFIE and img`', () => {
    store.dispatch(setImg('selfie', 'selfie-img'));
    expect(store.getActions()).toEqual([{ type: SET_SELFIE, img: 'selfie-img' }]);
  });

  test('setRetake`', () => {
    store.dispatch(setRetake('selfie', true));
    expect(store.getActions()).toEqual([{ type: SET_RETAKE_SELFIE, payload: true }]);
  });
});
