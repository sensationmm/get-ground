import { documents, initialState } from './documents';
import {
  SAVE_DOCUMENTS,
  SAVE_SIGNATURE
} from 'src/config/constants';

describe('documents reducer', () => {
  test('default state', () => {
    const newState = documents();
    expect(newState).toEqual(initialState);
  });

  test('stores returned documents', () => {
    const action = {
      type: SAVE_DOCUMENTS,
      documents: {
        file_selfie: {
          content: '/9876'
        },
        file_passport: {
          content: '/543'
        },
        file_proof_of_address: {
          content: '/210'
        }
      }
    }

    const expectedState = {
      file_selfie: {
        content: '/9876'
      },
      file_passport: {
        content: '/543'
      },
      file_proof_of_address: {
        content: '/210'
      }
    };

    const newState = documents(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('sets signature', () => {
    const action = {
      type: SAVE_SIGNATURE,
      signature: 'saopknfaponvpanpsinfgieopnva12'
    }

    const newState = documents(initialState, action)
    const expectedState = { file_signature: 'saopknfaponvpanpsinfgieopnva12' }

    expect(newState).toEqual(expectedState)
  })
});
