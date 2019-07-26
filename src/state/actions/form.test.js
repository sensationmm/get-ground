import {
  initForm,
  clearForm,
  updateForm,
  setErrors,
  setFormErrors,
  clearFormErrors
 } from './form'

import { mockStore } from '../../test-utils/test-utils';

import {
  INIT_FORM,
  CLEAR_FORM,
  UPDATE_FORM,
  SET_ERRORS,
  SET_FORM_ERRORS,
  CLEAR_FORM_ERRORS
} from '../../config/constants';

describe('Loader actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({})();
  });

  test('initForm', () => {
    store.dispatch(initForm({values: {}}));
    expect(store.getActions()).toEqual([{ type: INIT_FORM, payload: {values: {}} }]);
  });

  test('clearForm', () => {
    store.dispatch(clearForm());
    expect(store.getActions()).toEqual([{ type: CLEAR_FORM }]);
  });

  test('updateForm', () => {
    store.dispatch(updateForm('date', '20/05/1997', true));
    expect(store.getActions()).toEqual([{ type: UPDATE_FORM, key: 'date', value: '20/05/1997', arrayUpdate: true }]);
  });

  test('setErrors', () => {
    store.dispatch(setErrors(
      { invalidAddress: true},
      true
    ));
    expect(store.getActions()).toEqual([{ type: SET_ERRORS, errorsList: { invalidAddress: true}, showErrorMessage: true }]);
  });

  test('setFormErrors', () => {
    store.dispatch(setFormErrors({ invalidAddress: true}));
    expect(store.getActions()).toEqual([{ type: SET_FORM_ERRORS, error: { invalidAddress: true} }]);
  });

  test('clearFormErrors', () => {
    store.dispatch(clearFormErrors());
    expect(store.getActions()).toEqual([{ type: CLEAR_FORM_ERRORS }]);
  });
});
