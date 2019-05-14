import { idCheck, initialState } from './idCheck'

describe('idCheck reducer', () => {
  it('SET_PASSPORT', () => {
    const action = {
      type: 'SET_PASSPORT',
      img: 'test-passport-img'
    }
    const expectedState = {
      ...initialState,
      passport: 'test-passport-img'
    }

    const newState = idCheck(initialState, action)

    expect(newState).toEqual(expectedState)
  })

  it('SET_ADDRESS', () => {
    const action = {
      type: 'SET_ADDRESS',
      img: 'test-address-img'
    }
    const expectedState = {
     ...initialState,
      address: 'test-address-img'
    }

    const newState = idCheck(initialState, action)

    expect(newState).toEqual(expectedState)
  })

  it('SET_SELFIE', () => {
    const action = {
      type: 'SET_SELFIE',
      img: 'test-selfie-img'
    }
    const expectedState = {
      ...initialState,
      selfie: 'test-selfie-img'
    }

    const newState = idCheck(initialState, action)

    expect(newState).toEqual(expectedState)
  })
})
