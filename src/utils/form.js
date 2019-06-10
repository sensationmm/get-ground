import React from 'react';
import validation from './validation';
import functions from './functions';
import store from 'src/state/store';
import { initForm, clearForm, updateForm, setErrors, setFormErrors } from 'src/state/actions/form';
import { isArray } from 'util';

/**
 * initFormState
 * Output default values/error state required by form setup
 * @param {object} fieldsInit - form field initial values
 * @return {void}
 */
export const initFormState = (fieldsInit) => {
  const fields = !isArray(fieldsInit) ? fieldsInit : new Array(...fieldsInit);
  const errors = !isArray(fieldsInit) ? {} : { fields: fieldsInit.map(i => new Object()) };

  return store.dispatch(
    initForm({
      values: fields,
      errors: errors,
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
 * setFormError
 * @param {string} error - error to set
 * @return {void}
 */
export const setFormError = (error) => {
  store.dispatch(setFormErrors(error));
};

/**
 * updateValue
 * Helper function to update state.values item
 * @param {string} stateKey - id of value to update
 * @param {any} value - value to update
 * @param {function} callback - function to fire after the generic onChange
 * @param {boolean} [arrayUpdate] - whether value to be update is in an array
 * @return {void}
 */
export const updateValue = (stateKey, value, callback, arrayUpdate = false) => {
  store.dispatch(updateForm(stateKey, value, arrayUpdate));

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
 * @param {integer} [arrayIndex] - used if form.values is an array
 * @return {void}
 */
export const validateField = (config, stateID, arrayIndex=null) => {
  const { values, errors } = store.getState().form;
  const errorsList = !errors.fields ? errors : errors.fields;

  const configItem = functions.getByValue(config, 'stateKey', stateID);

  const valueToCheck = arrayIndex === null ? values[stateID] : values[arrayIndex][stateID];

  const validationList = isArray(configItem.validationFunction)
    ? configItem.validationFunction
    : configItem.validationFunction ? new Array(configItem.validationFunction) : undefined;

  const validationParamList = isArray(configItem.validationParam)
    ? configItem.validationParam
    : new Array(configItem.validationParam);

  if(configItem && validationList && !configItem.hidden) {

    let isValid = true;
    let failFunc = null;

    for(let i=0; i<validationList.length; i++) {
      isValid = (validationParamList[i] !== undefined && validationParamList[i] !== null) 
        ? validation[validationList[i]](valueToCheck, validationParamList[i])
        : validation[validationList[i]](valueToCheck);

      if(!isValid) {
        failFunc = validationList[i];
        break;
      }
    }
    

    if(!isValid) {
      if(arrayIndex !== null) {
        errorsList[arrayIndex][stateID] = validation.messages[failFunc];
      } else {
        errorsList[stateID] = validation.messages[failFunc];
      }
    } else {
      if(arrayIndex !== null) {
        delete errorsList[arrayIndex][stateID];
      } else {
        delete errorsList[stateID];
      }
    }

    const newErrors = !errors.fields ? errorsList : { ...errors, fields: errorsList };

    store.dispatch(setErrors(newErrors));
  }
};

/**
 * validateForm
 * Validates every field defined in the this.config parent object that has a validationFunction prop defined
 * Shows 'correct errors' message if any failures
 * @param {object} config - form config object
 * @param {integer} [arrayIndex] - used form.values is an array
 * @return {boolean} whether form validates successfully
 */
export const validateForm = (config, arrayIndex=null) => {
  config.forEach(configItem => {
    if(configItem.stateKey && configItem.validationFunction) {
      formUtils.validateField(config, configItem.stateKey, arrayIndex);
    }
  });

  const errors = store.getState().form.errors;
  delete errors.form;

  const checkErrors = arrayIndex === null ? errors : errors.fields[arrayIndex]

  if(Object.keys(checkErrors).length > 0) {
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
 * @param {integer} [arrayIndex] - used form.values is an array
 * @return {JSXElement[]} - array of form elements
 */
export const renderForm = (config, arrayIndex=null) => {
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
      const validate = validationFunction ? () => formUtils.validateField(config, stateKey, arrayIndex) : undefined;

      let error = undefined;
      if(!errors.fields) {
        if(functions.objectKeyExists(stateKey, errors)) {
          error = errors[stateKey];
        }
      } else {
        if(arrayIndex !== null) {
          if(functions.objectKeyExists(stateKey, errors.fields[arrayIndex])) {
            error = errors.fields[arrayIndex][stateKey];
          }
        }
      }

      return (
        <item.component
          key={`form-item-${key}`}
          data-test={`form-item-${key}`}
          id={stateKey}
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
