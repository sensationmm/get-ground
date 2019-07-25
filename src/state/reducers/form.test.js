import { form, initialState } from './form';
import {
  INIT_FORM,
  CLEAR_FORM,
  UPDATE_FORM,
  SET_ERRORS,
  SET_FORM_ERRORS,
  CLEAR_FORM_ERRORS
} from '../../config/constants';

describe('documents reducer', () => {
  test('INIT_FORM', () => {
    const action = {
      type: INIT_FORM,
      payload: {
        values: {
          test: 'test1'
        },
        errors: {},
        showErrorMessage: false
      }
    }
    const expectedState = {
      values: {
        test: 'test1'
      },
      errors: {},
      showErrorMessage: false
    }

    expect(form(initialState, action)).toEqual(expectedState)
  })

  test('SET_ERRORS', () => {
    const action = {
      type: SET_ERRORS,
      errorsList: {
        isInvalidAddress: true
      },
      showErrorMessage: true
    }
    const expectedState = {
      values: {},
      errors: {
        isInvalidAddress: true
      },
      showErrorMessage: true
    }

    expect(form(initialState, action)).toEqual(expectedState)
  })

  test('CLEAR_FORM_ERRORS', () => {
    const action = {
      type: CLEAR_FORM_ERRORS,
    }

    const newInitialState = {
      ...initialState,
      values: {
        testValue: 'test'
      },
      errors: {
        isInvalidAddress: true
      },
      showErrorMessage: true
    }

    const expectedState = {
      values: {
        testValue: 'test'
      },
      errors: {},
      showErrorMessage: false
    }

    expect(form(newInitialState, action)).toEqual(expectedState)
  })
});
