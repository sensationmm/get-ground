import { additionalServices, initialState } from './additionalServices'
import {
  SET_ADDITIONAL_SERVICES
} from 'src/config/constants';

describe('Additional Services', () => {
  test('SET_ADDITIONAL_SERVICES', () => {
    const action = {
      type: SET_ADDITIONAL_SERVICES,
      payload: {
        mortgage: true,
        insurance: false,
        management: true
      }
    }
    const expectedState = {
      mortgage: true,
      insurance: false,
      management: true,
    }

    const newState = additionalServices(initialState, action)

    expect(newState).toEqual(expectedState)
  })
})
