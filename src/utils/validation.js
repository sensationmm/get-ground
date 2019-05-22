import i18n from '../i18n';

const validationMessages = {};

/**
 * validateEmail
 * validates email address
 * @author Kevin Reynolds
 * @param {string} email - email address to be validated
 * @return {boolean} whether email passes validation
 */
export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
validationMessages.validateEmail = i18n.t('validation.validateEmail');

/**
 * validateNumeric
 * validates numeric entry
 * @author Kevin Reynolds
 * @param {string} input - string to be validated
 * @return {boolean} whether string passes validation
 */
export const validateNumeric = (input) => {
  if (input === '') return false;
  return !isNaN(input);
};
validationMessages.validateNumeric = i18n.t('validation.validateNumeric');

/**
 * validateRequired
 * validates required input
 * @author Kevin Reynolds
 * @param {string} input - value to be validated
 * @return {boolean} whether value is entered
 */
export const validateRequired = (input) => {
  return !!input;
};
validationMessages.validateRequired = i18n.t('validation.validateRequired');

/**
 * validatePhone
 * validates phone number entry ie. (+00)00000...
 * @author Kevin Reynolds
 * @param {string} input - string to be validated
 * @return {boolean} whether string passes validation
 */
export const validatePhone = (input) => {
  const inputVal = input ? input.substr(input.indexOf(')') + 1) : '';

  if (inputVal === '') return false;
  return !isNaN(inputVal);
};
validationMessages.validatePhone = i18n.t('validation.validatePhone');

/**
 * validateMatching
 * validates input matches given argument
 * @author Kevin Reynolds
 * @param {string} input - value to be validated
 * @param {string} inputToMatch - value to match to
 * @return {boolean} whether values match
 */
export const validateMatching = (input, inputToMatch) => {
  return input === inputToMatch && !!input;
};
validationMessages.validateMatching = i18n.t('validation.validateMatching');

export const validateNoOfCompanies = (input) => {
  return input > 0 && input < 21;
};
validationMessages.validateNoOfCompanies = i18n.t('validation.validateNoOfCompanies');

/**
 * validateLettersOnly
 * validates letters only input
 * @param {string} input - value to be validated
 * @return {boolean} whether value is entered
 */
export const validateLettersOnly = (input) => {
  return !/[^a-zA-Z]/.test(input) && !!input;
};
validationMessages.validateLettersOnly = 'Required';

const validation = {
  validateEmail,
  validatePhone,
  validateRequired,
  validateMatching,
  validateNumeric,
  validateNoOfCompanies,
  validateLettersOnly,
  messages: validationMessages,
};

export default validation;

