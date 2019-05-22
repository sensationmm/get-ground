import React from 'react';
import validation from './validation';
import functions from './functions';
import store from 'src/state/store';
import { initForm, clearForm, updateForm, setErrors } from 'src/state/actions/form';

/**
 * initFormState
 * Output default values/error state required by form setup
 * @param {object} fieldsInit - form field initial values
 * @return {void}
 */
export const initFormState = (fieldsInit) => {
  return store.dispatch(
    initForm({
      values: fieldsInit,
      errors: {},
      showErrorMessage: false
    })
  );
};

/**
 * clearFormState
 * @return {void}
 */
export const clearFormState = () => {
  store.dispatch(clearForm());
};

/**
 * setErrors
 * @param {string} error - error to set
 * @return {void}
 */
export const setFormError = (error) => {
  store.dispatch(setErrors({ form: error }, true));
};

/**
 * updateValue
 * Helper function to update state.values item
 * @param {string} stateKey - id of value to update
 * @param {any} value - value to update
 * @param {function} callback - function to fire after the generic onChange
 * @return {void}
 */
export const updateValue = (stateKey, value, callback) => {
  store.dispatch(updateForm(stateKey, value));

  if(callback) {
    callback(value);
  }
};

/**
 * validateField
 * Validates every field defined in the this.config object that has a validationFunction prop defined
 * Sets state.error value for field if validation fails
 * @param {object} config - form config object
 * @param {string} stateID - id of state.values to validate
 * @return {void}
 */
export const validateField = (config, stateID) => {
  const { values, errors } = store.getState().form;
  const errorsList = errors;

  const configItem = functions.getByValue(config, 'stateKey', stateID);

  if(configItem && configItem.validationFunction && !configItem.hidden) {
    const isValid = (configItem.validationParam !== undefined) 
      ? validation[configItem.validationFunction](values[stateID], configItem.validationParam)
      : validation[configItem.validationFunction](values[stateID]);

    if(!isValid) {
      errorsList[stateID] = validation.messages[configItem.validationFunction];
    } else {
      delete errorsList[stateID];
    }

    store.dispatch(setErrors(errorsList));
  }
};

/**
 * validateForm
 * Validates every field defined in the this.config parent object that has a validationFunction prop defined
 * Shows 'correct errors' message if any failures
 * @param {object} config - form config object
 * @return {boolean} whether form validates successfully
 */
export const validateForm = (config) => {
  config.forEach(configItem => {
    if(configItem.stateKey && configItem.validationFunction) {
      formUtils.validateField(config, configItem.stateKey);
    }
  });

  const errors = store.getState().form.errors;
  delete errors.form;

  if(Object.keys(errors).length > 0) {
    store.dispatch(setErrors(errors, true));

    return false;
  } else {
    return true;
  }
};

/**
 * renderForm
 * Renders form defined in this.config of parent
 * @param {object} config - form config object
 * @return {JSXElement[]} - array of form elements
 */
export const renderForm = (config) => {
  const { errors } = store.getState().form;

  return (
    config.map((item, key) => {
      const { stateKey, validationFunction, hidden, callback } = item;

      if(hidden) {
        return;
      }

      // istanbul ignore next - bug in arrow function coverage
      const onChange = stateKey ? val => formUtils.updateValue(stateKey, val, callback) : undefined;
      // istanbul ignore next - bug in arrow function coverage
      const validate = validationFunction && !hidden ? () => formUtils.validateField(config, stateKey) : undefined;
      const error = functions.objectKeyExists(stateKey, errors) && !hidden ? errors[stateKey] : undefined;

      return (
        <item.component
          key={`form-item-${key}`}
          data-test={`form-item-${key}`}
          id={`create-account-${stateKey}`}
          onChange={item.onChange ? item.onChange : onChange}
          {...item}
          error={error}
          validate={validate}
        />
      );
    })
  );
};

/**
 * setNativeValue
 * Fires onChange event for 'auto populated' input fields
 * @param {object} element - element to set value on
 * @param {object} value - value to be set
 * @return {void}
 */
export const setNativeValue = /* istanbul ignore next */ (element, value) => {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
};

const formUtils = {
  initFormState,
  setFormError,
  clearFormState,
  updateValue,
  validateField,
  validateForm,
  renderForm,
  setNativeValue
};

export default formUtils;
