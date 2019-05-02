import 'babel-polyfill';
import { mockStore } from 'src/test-utils/test-utils';

import { SHOW_MODAL, HIDE_MODAL} from 'src/config/constants';
import { showModal, hideModal } from './modal'

describe('Loader actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('showModal returns an action with type `SHOW_MODAL`', () => {
    store.dispatch(showModal());
    expect(store.getActions()).toEqual([{ type: SHOW_MODAL }]);
  });

  test('hideModal returns an action with type `HIDE_MODAL`', () => {
    store.dispatch(hideModal());
    expect(store.getActions()).toEqual([{ type: HIDE_MODAL }]);
  });
});
