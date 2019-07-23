import { mockStore } from 'src/test-utils/test-utils';

import { SAVE_DOCUMENTS, SAVE_SIGNATURE } from 'src/config/constants';
import { saveDocuments, saveSignature } from './documents'

describe('activeCompany actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('saveDocuments', () => {
    store.dispatch(saveDocuments({}));
    expect(store.getActions()).toEqual([{ type: SAVE_DOCUMENTS, documents: {} }]);
  });

  test('saveDocuments', () => {
    store.dispatch(saveSignature('blahblahsignature'));
    expect(store.getActions()).toEqual([{ type: SAVE_SIGNATURE, signature: 'blahblahsignature' }]);
  });
});
