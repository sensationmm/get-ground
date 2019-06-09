import 'babel-polyfill';
import { mockStore } from 'src/test-utils/test-utils';

import { SHOW_MENU, HIDE_MENU} from 'src/config/constants';
import { showMenu, hideMenu } from './menu';

describe('Menu actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('showMenu returns an action with type `SHOW_MENU`', () => {
    store.dispatch(showMenu());
    expect(store.getActions()).toEqual([{ type: SHOW_MENU }]);
  });

  test('hideMenu returns an action with type `HIDE_MENU`', () => {
    store.dispatch(hideMenu());
    expect(store.getActions()).toEqual([{ type: HIDE_MENU }]);
  });
});
