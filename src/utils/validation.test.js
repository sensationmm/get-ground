import * as validation from './validation';

describe('validateEmail()', () => {
  test('returns true for a valid email', () => {
    const email = 'hello@getground.co.uk';
    const isValid = validation.validateEmail(email);
    expect(isValid).toBe(true);
  });

  test('returns false if invalid email -> not an email address', () => {
    const email = 'hellogetground';
    const isValid = validation.validateEmail(email);
    expect(isValid).toBe(false);
  });

  test('returns false if invalid email -> no @', () => {
    const email = 'hellogetground.co.uk';
    const isValid = validation.validateEmail(email);
    expect(isValid).toBe(false);
  });

  test('returns false if invalid email -> no domain', () => {
    const email = 'hello@getground';
    const isValid = validation.validateEmail(email);
    expect(isValid).toBe(false);
  });
});

describe('validateRequired()', () => {
  test('returns true if input is entered', () => {
    const input = 'some text';
    const isValid = validation.validateRequired(input);
    expect(isValid).toBe(true);
  });

  test('returns false if empty string', () => {
    const input = '';
    const isValid = validation.validateRequired(input);
    expect(isValid).toBe(false);
  });

  test('returns false if null value', () => {
    const input = null;
    const isValid = validation.validateRequired(input);
    expect(isValid).toBe(false);
  });

  test('returns false if undefined', () => {
    const input = undefined;
    const isValid = validation.validateRequired(input);
    expect(isValid).toBe(false);
  });
});

describe('validMatching()', () => {
  test('returns true for matching string', () => {
    const string1 = 'something';
    const string2 = 'something';
    const isValid = validation.validateMatching(string1, string2);
    expect(isValid).toBe(true);
  });

  test('returns false for unmatching string', () => {
    const string1 = 'something';
    const string2 = 'somethingelse';
    const isValid = validation.validateMatching(string1, string2);
    expect(isValid).toBe(false);
  });
});

describe('validateLettersOnly()', () => {
  test('returns true if string contains only letters', () => {
    const string = 'something';
    const isValid = validation.validateLettersOnly(string);

    expect(isValid).toBe(true);
  });

  test('returns false if string contains numbers', () => {
    const string = 'something123';
    const isValid = validation.validateLettersOnly(string);
    expect(isValid).toBe(false);
  });
});

describe('validatePhone()', () => {
  test('returns true for numeric string with phone number chars', () => {
    const string = '(+44)123456';
    const isValid = validation.validatePhone(string);
    expect(isValid).toBe(true);
  });
  test('returns false for non-numeric string', () => {
    const string = '(+44)123456asd';
    const isValid = validation.validatePhone(string);
    expect(isValid).toBe(false);
  });

  test('returns false if value is an empty string', () => {
    const string = '';
    const isValid = validation.validatePhone(string);
    expect(isValid).toBe(false);
  });
});
