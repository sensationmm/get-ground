import { mockStore } from 'src/test-utils/test-utils';

import { SAVE_DOCUMENTS } from 'src/config/constants';
import { saveDocuments } from './documents'

describe('activeCompany actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('saveDocuments', () => {
    store.dispatch(saveDocuments({}));
    expect(store.getActions()).toEqual([{ type: SAVE_DOCUMENTS, documents: {} }]);
  });
});
