import formUtils, { validateField } from './form';

import functions from 'src/utils/functions';
import validation from 'src/utils/validation';
import store from 'src/state/store';

import InputText from 'src/components/_form/InputText/InputText';
import InputPassword from 'src/components/_form/InputPassword/InputPassword';
import Checkbox from 'src/components/_form/Checkbox/Checkbox';

const fieldsMock = {
  name: '',
  password: 'test',
  error: false,
  passwordConfirm: 'test1'
};

const fieldsArrayMock = [
  fieldsMock,
  fieldsMock,
  fieldsMock
];

const stateMock = {
  values: fieldsMock,
  errors: {},
  showErrorMessage: false
};

const mockCallback = jest.fn();

const configMock = [
  {
    stateKey: 'name',
    component: InputText,
    label: 'Name',
    value: fieldsMock.name
  },
  {
    stateKey: 'password',
    component: InputPassword,
    label: 'Password',
    value: fieldsMock.password,
    validationFunction: 'validateRequired'
  },
  {
    stateKey: 'passwordConfirm',
    component: InputPassword,
    label: 'Confirm Password',
    value: fieldsMock.passwordConfirm,
    validationFunction: ['validateMatching', 'validateMatching'],
    validationParam: [fieldsMock.password, fieldsMock.password]
  },
  {
    stateKey: 'error',
    component: Checkbox,
    label: 'Agree',
    onChange: jest.fn().mockReturnValue('hi')
  },
  {
    component: 'br',
    hidden: true
  }
];

describe('initFormState()', () => {
  test('returns correct form state', () => {
    const formState = formUtils.initFormState(fieldsMock);
    expect(formState.payload).toEqual(stateMock);
  });
});

describe('clearFormState()', () => {
  test('clears form state', () => {
    formUtils.clearFormState();
    expect(store.getState().form.values).toEqual({});
  });
});

describe('setFormError', () => {
  test('sets error correctly', () => {
    formUtils.setFormError('test');
    expect(store.getState().form.errors.form).toBe('test');
  });
});

describe('updateValue()', () => {
  test('value is updated', () => {
    formUtils.updateValue('name', 'Spongebob', mockCallback);

    expect(store.getState().form.values.name).toBe('Spongebob');
    expect(mockCallback).toHaveBeenCalled();
  });

  test('value is updated without a validate or callback function', () => {
    formUtils.updateValue('name', 'Spongebob');

    expect(store.getState().form.values.name).toBe('Spongebob');
  });
});

describe('renderForm()', () => {
  let form;

  beforeEach(() => {
    form = formUtils.renderForm(configMock);
  });

  test('renders form', () => {
    expect(form.length).toEqual(configMock.length);
  });

  test('uses onChange override', () => {
    expect(form[3].props.onChange()).toEqual('hi');
  });

  test('renders minimal form', () => {
    const emptyForm = formUtils.renderForm([ { component: 'br' }]);
    
    expect(emptyForm[0].props.onChange).toBe(undefined);
    expect(emptyForm[0].props.validate).toBe(undefined);
  });
});

describe('validateField()', () => {
  test('retrieves field', () => {
    const spy = jest.spyOn(functions, 'getByValue');

    formUtils.validateField(configMock, 'name');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('validation called', () => {
    const spy2 = jest.spyOn(validation, 'validateRequired');
    validateField(configMock, 'password');

    expect(spy2).toHaveBeenCalled();
  });

  test('validation called with param', () => {
    const spy3 = jest.spyOn(validation, 'validateMatching');
    formUtils.initFormState(fieldsMock);
    formUtils.validateField(configMock, 'passwordConfirm');

    expect(spy3).toHaveBeenCalledWith(fieldsMock.passwordConfirm, fieldsMock.password);
  });

  test('error set if invalid field', () => {
    formUtils.validateField(configMock, 'passwordConfirm');
    const form = formUtils.renderForm(configMock);

    expect(store.getState().form.errors).toEqual(expect.objectContaining(
      { passwordConfirm: expect.any(String) }
    ));
    expect(form[2].props.error).toEqual(expect.any(String));

  });

  test('error cleared when invalid field made valid ',() => {
    formUtils.updateValue('passwordConfirm', 'test');
    formUtils.validateField(configMock, 'passwordConfirm');

    expect(store.getState().form.errors).toEqual({});
  });
});

describe('validateForm()', () => {
  let spy;

  beforeEach(() => {
    spy = jest.spyOn(formUtils, 'validateField');
  });

  test('validates each field', () => {
    formUtils.validateForm(configMock);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(expect.any(Object), 'password', null);
    expect(spy).toHaveBeenCalledWith(expect.any(Object), 'passwordConfirm', null);
  });

  test('sets errors in state', () => {
    formUtils.initFormState(fieldsMock);
    formUtils.validateForm(configMock);

    expect(store.getState().form.errors).toEqual(expect.objectContaining({ passwordConfirm: expect.any(String) }));
  });
});

describe('values array state', () => {
  beforeEach(() => {
    formUtils.initFormState(fieldsArrayMock);
  });

  describe('validateField', () => {
    beforeEach(() => {
      formUtils.validateField(configMock, 'passwordConfirm', 0);
    });

    test('sets error in state', () => {
      expect(store.getState().form.errors.fields).toEqual(expect.arrayContaining(
        [expect.objectContaining(
          { passwordConfirm: expect.any(String) }
        )]
      ));
      const form = formUtils.renderForm(configMock, 0);

      expect(form[2].props.error).toEqual(expect.any(String));
    });

    test('clears error from state', () => {
      formUtils.updateValue(0, {
        ...fieldsMock,
        passwordConfirm: 'test'
      });
      formUtils.validateField(configMock, 'passwordConfirm', 0);
      const form = formUtils.renderForm(configMock, 0);

      expect(store.getState().form.errors.fields).toEqual([{},{},{}]);
      expect(form[2].props.error).toBe(undefined);
    });
  });

  test('renderForm', () => {
    const arrayForm = formUtils.renderForm(configMock, 2);
    expect(arrayForm.length).toEqual(configMock.length);
    
    const arrayForm2 = formUtils.renderForm(configMock);
    expect(arrayForm2.length).toEqual(configMock.length);
  });

  describe('validateForm', () => {
    test('checks errors', () => {
      formUtils.validateForm(configMock, 1);
    });
  });
});
