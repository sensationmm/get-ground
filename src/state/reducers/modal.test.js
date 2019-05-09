import { modal, initialState } from './modal'
import {
  SHOW_MODAL,
  HIDE_MODAL,
} from 'src/config/constants';

describe('modal reducer', () => {
  it('set isOpen to false', () => {
    const state = {
      ...initialState,
      isOpen: true
    }
    const action = {
      type: HIDE_MODAL
    }

    const expectedState = {
      isOpen: false
    }

   const newState = modal(state, action)

   expect(expectedState).toEqual(newState)
  })

  it('set isOpen to true', () => {
    const action = {
      type: SHOW_MODAL
    }

    const expectedState = {
      isOpen: true
    }

   const newState = modal(initialState, action)

   expect(expectedState).toEqual(newState)
  })
})
