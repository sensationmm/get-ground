import { documents, initialState } from './documents';
import {
  SAVE_DOCUMENTS
} from 'src/config/constants';

describe('documents reducer', () => {
  test('default state', () => {
    const newState = documents();
    expect(newState).toEqual(initialState);
  });

  test('stores returned documents', () => {
    const action = {
      type: SAVE_DOCUMENTS,
      documents: [{name: 'one'},{name: 'two'}]
    }

    const expectedState = [{name: 'one'},{name: 'two'}];

    const newState = documents(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
