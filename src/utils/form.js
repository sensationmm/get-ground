import React from 'react';
import validation from './validation';
import functions from './functions';

/**
 * initFormState
 * Output default values/error state required by form setup
 * @param {object} fieldsInit - form field initial values
 * @return {object} state initial object
 */
export const initFormState = (fieldsInit) => {
  return {
    values: fieldsInit,
    errors: {},
    showErrorMessage: false
  };
};

/**
 * updateValue
 * Helper function to update state.values item
 * @param {object} scope - 'this' of current component/container
 * @param {string} stateKey - id of value to update
 * @param {any} value - value to update
 * @param {function} validate - function passed to validate the field
 * @param {function} callback - function to fire after the generic onChange
 * @return {void}
 */
export const updateValue = (scope, stateKey, value, validate, callback) => {
  scope.setState({
    ...scope.state,
    values: {
      ...scope.state.values,
      [stateKey]: value
    } 
  },() => {
    validate ? validate() : null;
    callback ? callback(value) : null;
  });
};

/**
 * validateField
 * Validates every field defined in the this.config object that has a validationFunction prop defined
 * Sets state.error value for field if validation fails
 * @param {object} scope - 'this of current component/container
 * @param {string} stateID - id of state.values to validate
 * @return {void}
 */
export const validateField = (scope, stateID) => {
  const { values, errors } = scope.state;
  const errorsList = errors;

  const configItem = functions.getByValue(scope.config, 'stateKey', stateID);

  if(configItem && configItem.validationFunction) {
    const isValid = (configItem.validationParam !== undefined) 
      ? validation[configItem.validationFunction](values[stateID], configItem.validationParam)
      : validation[configItem.validationFunction](values[stateID]);

    if(!isValid) {
      errorsList[stateID] = validation.messages[configItem.validationFunction];
    } else {
      delete errorsList[stateID];
    }

    scope.setState({
      ...scope.state,
      errors: errorsList
    });
  }
};

/**
 * validateForm
 * Validates every field defined in the this.config parent object that has a validationFunction prop defined
 * Shows 'correct errors' message if any failures
 * @param {object} scope - 'this' of current component/container
 * @return {void} whether form validates successfully
 */
export const validateForm = (scope) => {
  scope.config.forEach(configItem => {
    if(configItem.stateKey && configItem.validationFunction) {
      formUtils.validateField(scope, configItem.stateKey);
    }
  });

  const errors = scope.state.errors;
  delete errors.form;

  if(Object.keys(errors).length > 0) {
    scope.setState({
      ...scope.state,
      errors: {
        ...scope.state.errors,
        form: null
      },
      showErrorMessage: true
    });

    return false;
  } else {
    return true;
  }
};

/**
 * renderForm
 * Renders form defined in this.config of parent
 * @param {object} scope - 'this' of current component/container
 * @return {JSXElement[]} - array of form elements
 */
export const renderForm = (scope) => {
  const { errors } = scope.state;

  return (
    scope.config.map((item, key) => {
      const { stateKey, validationFunction, callback } = item;

      // istanbul ignore next - bug in arrow function coverage
      const onChange = stateKey ? (val) => formUtils.updateValue(scope, stateKey, val, validate, callback) : undefined;
      // istanbul ignore next - bug in arrow function coverage
      const validate = validationFunction ? () => formUtils.validateField(scope, stateKey) : undefined;
      const error = functions.objectKeyExists(stateKey, errors) ? errors[stateKey] : undefined;

      return (
        <item.component
          key={`form-item-${key}`}
          data-test={`form-item-${key}`}
          id={`create-account-${stateKey}`}
          onChange={onChange}
          {...item}
          error={error}
          validate={validate}
        />
      );
    })
  );
};

const formUtils = {
  initFormState,
  updateValue,
  validateField,
  validateForm,
  renderForm
};

export default formUtils;
