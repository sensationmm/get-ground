import {
  INIT_FORM,
  CLEAR_FORM,
  UPDATE_FORM,
  SET_ERRORS
} from '../../config/constants';

export const initForm = (payload) => {
  return {
    type: INIT_FORM,
    payload
  };
};

export const clearForm = (payload) => {
  return {
    type: CLEAR_FORM
  };
};

export const updateForm = (key, value) => {
  return {
    type: UPDATE_FORM,
    key,
    value
  }
};

export const setErrors = (errorsList, showErrorMessage = false) => {
  return {
    type: SET_ERRORS,
    errorsList,
    showErrorMessage
  }
};
