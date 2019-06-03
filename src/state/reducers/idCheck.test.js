import { idCheck, initialState } from './idCheck'

describe('idCheck reducer', () => {
  it('SET_PASSPORT', () => {
    const action = {
      type: 'SET_PASSPORT',
      img: 'test-passport-img'
    }
    const expectedState = {
      ...initialState,
      passport: {
        img: 'test-passport-img'
      }
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
      address: {
        img: 'test-address-img'
      }
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
      selfie: {
        img:'test-selfie-img'
      }
    }

    const newState = idCheck(initialState, action)

    expect(newState).toEqual(expectedState)
  })

  it('SET_RETAKE_PASSPORT', () => {
    const action = {
      type: 'SET_RETAKE_PASSPORT',
      payload: true
    }
    const expectedState = {
      ...initialState,
      passport: {
        ...initialState.passport,
        retake: true
      }
    }

    const newState = idCheck(initialState, action)

    expect(newState).toEqual(expectedState)
  })

  it('SET_RETAKE_ADDRESS', () => {
    const action = {
      type: 'SET_RETAKE_ADDRESS',
      payload: true
    }
    const expectedState = {
      ...initialState,
      address: {
        ...initialState.address,
        retake: true
      }
    }

    const newState = idCheck(initialState, action)

    expect(newState).toEqual(expectedState)
  })

  it('SET_RETAKE_SELFIE', () => {
    const action = {
      type: 'SET_RETAKE_SELFIE',
      payload: true
    }
    const expectedState = {
      ...initialState,
      selfie: {
        ...initialState.selfie,
        retake: true
      }
    }

    const newState = idCheck(initialState, action)

    expect(newState).toEqual(expectedState)
  })
})
