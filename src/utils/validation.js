import i18n from '../i18n';
import moment from 'moment';

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
  return !!input && input !== '[undefined] undefined' && input !== '[null] null';
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
  return !isNaN(inputVal) && inputVal.length >= 7 && inputVal.length <= 15;
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
  return !/[^a-zA-Z\s]/.test(input);
};
validationMessages.validateLettersOnly = i18n.t('validation.validateLettersOnly');

/**
 * validateTotal
 * validates based on given cumulative total
 * @param {string} input - value to be validated
 * @param {number} total - cumulative total to check
 * @param {number} maxValue - maximum value to validate against
 * @return {boolean} whether value is entered
 */
export const validateTotal = (input, { total, maxValue }) => {
  validationMessages.validateTotal = i18n.t('validation.validateTotal', { max: maxValue });
  return total <= maxValue;
};

/**
 * validateMinimum
 * validates on a minimum character length
 * @param {string} value - value to be validated
 * @param {number} min - minimum character length allowed
 * @return {boolean} whether value is more than or equal to the minimum
 */
export const validateMinimum = (value, min) => {
  validationMessages.validateMinimum = i18n.t('validation.validateMinimum', { min: min });
  return value.length >= min;
};

export const validateNoSpaces = (input) => {
  return !/[\s]/.test(input);
};
validationMessages.validateNoSpaces = i18n.t('validation.validateNoSpaces');

export const validateDate = (input) => {
  return /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/.test(input);
};
validationMessages.validateDate = i18n.t('validation.validateDate');

export const validateFutureDate = (input) => {
  const dateInput = moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
  const today = moment().format('YYYY-MM-DD');

  return dateInput > today;
};
validationMessages.validateFutureDate = i18n.t('validation.validateFutureDate');

const validation = {
  validateEmail,
  validatePhone,
  validateRequired,
  validateMatching,
  validateNumeric,
  validateNoOfCompanies,
  validateLettersOnly,
  validateTotal,
  validateMinimum,
  validateNoSpaces,
  validateDate,
  validateFutureDate,
  messages: validationMessages,
};

export default validation;

