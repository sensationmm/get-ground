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

const validation = {
  validateEmail,
  validateRequired,
  validateMatching,
  messages: validationMessages
};

export default validation;

