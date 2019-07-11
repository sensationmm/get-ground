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

  test('allows spaces', () => {
    const string = 'something else';
    const isValid = validation.validateLettersOnly(string);

    expect(isValid).toBe(true);
  });
});

describe('validatePhone()', () => {
  test('returns true for numeric string with phone number chars', () => {
    const string = '(+44)1234567';
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

  test('returns false if value is less than 7', () => {
    const string = '(+44)123456';
    const isValid = validation.validatePhone(string);
    expect(isValid).toBe(false);
  });

  test('returns false if value is larger than 15', () => {
    const string = '(+44)1234567890123456';
    const isValid = validation.validatePhone(string);
    expect(isValid).toBe(false);
  });
});

describe('validateTotal', () => {
  test('returns true if less', () => {
    const isValid = validation.validateTotal(null, { total: 21, maxValue: 30 });
    expect(isValid).toBe(true);
  });

  test('returns true if equal', () => {
    const isValid = validation.validateTotal(null, { total: 30, maxValue: 30 });
    expect(isValid).toBe(true);
  });

  test('returns false if more', () => {
    const isValid = validation.validateTotal(null, { total: 31, maxValue: 30 });
    expect(isValid).toBe(false);
  });
});

describe('validateNumeric', () => {
  test('returns true for numbers', () => {
    const isValid = validation.validateNumeric('21');
    expect(isValid).toBe(true);
  });

  test('returns false for strings', () => {
    const isValid = validation.validateNumeric('abc');
    expect(isValid).toBe(false);
  });

  test('returns false if empty', () => {
    const isValid = validation.validateNumeric('');
    expect(isValid).toBe(false);
  });
});

describe('validateMinimum', () => {
  test('returns true if more', () => {
    const isValid = validation.validateMinimum('password1', 6);
    expect(isValid).toBe(true);
  });

  test('returns true if equal', () => {
    const isValid = validation.validateMinimum('passwo', 6);
    expect(isValid).toBe(true);
  });

  test('returns false if less', () => {
    const isValid = validation.validateMinimum('pass', 6);
    expect(isValid).toBe(false);
  });
});

describe('validateNoSpaces', () => {
  test('returns true if no spaces', () => {
    const isValid = validation.validateNoSpaces('password1');
    expect(isValid).toBe(true);
  });

  test('returns false if spaces', () => {
    const isValid = validation.validateNoSpaces('passw ord1');
    expect(isValid).toBe(false);
  });
});

describe('validateDate', () => {
  test('returns true for valid format', () => {
    const isValid = validation.validateDate('01/01/2020');
    expect(isValid).toBe(true);
  });

  test('returns false for non valid format', () => {
    const isValid = validation.validateDate('01-01-2020');
    expect(isValid).toBe(false);
  });

  test('returns false for US order', () => {
    const isValid = validation.validateDate('01/20/2020');
    expect(isValid).toBe(false);
  });

  test('returns false if char', () => {
    const isValid = validation.validateDate('0a/20/2020');
    expect(isValid).toBe(false);
  });
});
