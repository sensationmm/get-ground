import { additionalServices, initialState } from './additionalServices'
import {
  SET_ADDITIONAL_SERVICES
} from 'src/config/constants';

describe('Additional Services', () => {
  test('SET_ADDITIONAL_SERVICES', () => {
    const action = {
      type: SET_ADDITIONAL_SERVICES,
      payload: {
        hasUsedAdditionalServices: true,
        mortgage: true,
        insurance: false,
        management: true,
        solicitor: false
      }
    }
    const expectedState = {
      hasUsedAdditionalServices: true,
      mortgage: true,
      insurance: false,
      management: true,
      solicitor: false
    }

    const newState = additionalServices(initialState, action)

    expect(newState).toEqual(expectedState)
  })
})
