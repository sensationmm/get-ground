import { menu, initialState } from './menu'
import {
  SHOW_MENU,
  HIDE_MENU,
} from 'src/config/constants';

describe('menu reducer', () => {
  it('set isOpen to false', () => {
    const state = {
      ...initialState,
      isOpen: true
    }
    const action = {
      type: HIDE_MENU
    }

    const expectedState = {
      isOpen: false
    }

   const newState = menu(state, action)

   expect(expectedState).toEqual(newState)
  })

  it('set isOpen to true', () => {
    const action = {
      type: SHOW_MENU
    }

    const expectedState = {
      isOpen: true
    }

   const newState = menu(initialState, action)

   expect(expectedState).toEqual(newState)
  })
})
