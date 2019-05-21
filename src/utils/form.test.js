import formUtils, { validateField } from './form';
import functions from '../utils/functions';
import validation from '../utils/validation';
import { setup } from '../test-utils/test-utils';
import componentMock from '../test-utils/componentMock';

import InputText from '../components/_form/InputText/InputText';
import InputPassword from '../components/_form/InputPassword/InputPassword';
import Checkbox from '../components/_form/Checkbox/Checkbox';

const fieldsMock = {
  name: '',
  password: 'test',
  error: false,
  passwordConfirm: 'test1'
};

const stateMock = {
  values: fieldsMock,
  errors: {},
  showErrorMessage: false
};

const errorStateMock = {
  values: fieldsMock,
  errors: { password: 'Enter password' },
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
    validationFunction: 'validateMatching',
    validationParam: fieldsMock.password
  },
  {
    stateKey: 'error',
    component: Checkbox,
    label: 'Agree'
  },
  {
    component: 'br'
  }
];

describe('initFormState()', () => {
  test('returns correct form state', () => {
    const formState = formUtils.initFormState(fieldsMock);
    expect(formState).toEqual(stateMock);
  });
});

describe('updateValue()', () => {
  test('value is updated', () => {
    const wrapper = setup(componentMock, {}, { ...formUtils.initFormState(fieldsMock) });
    formUtils.updateValue(wrapper, 'name', 'Spongebob', mockCallback);

    expect(wrapper.state().values.name).toBe('Spongebob');
    expect(mockCallback).toHaveBeenCalled();
  });

  test('value is updated without a validate or callback function', () => {
    const wrapper = setup(componentMock, {}, { ...formUtils.initFormState(fieldsMock) });
    formUtils.updateValue(wrapper, 'name', 'Spongebob');

    expect(wrapper.state().values.name).toBe('Spongebob');
  });
});

describe('renderForm()', () => {
  let form;

  beforeEach(() => {
    form = formUtils.renderForm({
      state: stateMock,
      config: configMock
    });
  });

  test('renders form', () => {
    expect(form.length).toEqual(configMock.length);
  });

  test('renders form with errors', () => {
    const formWithErrors = formUtils.renderForm({
      state: errorStateMock,
      config: configMock
    });

    expect(formWithErrors.length).toEqual(configMock.length);
  });

  test('renders minimal form', () => {
    const emptyForm = formUtils.renderForm({
      state: errorStateMock,
      config: [ { component: 'br' }]
    });
    
    expect(emptyForm[0].props.onChange).toBe(undefined);
    expect(form[0].props.validate).toBe(undefined);
  });

  // test('renders field with missing onChange prop', () => {
  // });

  // test('renders field with missing validate prop', () => {
  //   console.log(form[0])
  // });
});

describe('validateForm()', () => {
  let spy;
  const setStateMock = jest.fn();

  beforeEach(() => {
    spy = jest.spyOn(formUtils, 'validateField').mockImplementation(() => {});
  });

  test('validates each field', () => {
    formUtils.validateForm({
      setState: jest.fn(),
      state: stateMock,
      config: configMock
    });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(expect.any(Object), 'password');
    expect(spy).toHaveBeenCalledWith(expect.any(Object), 'passwordConfirm');
  });

  test('errors get set in state', () => {
    const wrapper = setup(componentMock, {}, { ...formUtils.initFormState(fieldsMock) });
    wrapper.state().errors = {
      password: 'You must enter a password'
    };

    formUtils.validateForm({
      setState: setStateMock,
      state: wrapper.state(),
      config: configMock
    });

    expect(setStateMock).toHaveBeenCalledWith({
      values: fieldsMock,
      errors: {
        ...wrapper.state().errors,
        form: null
      },
      showErrorMessage: true
    });
  });
});

describe('validateField', () => {
  test('retrieves field', () => {
    const spy = jest.spyOn(functions, 'getByValue');

    validateField({
      state: stateMock,
      config: configMock
    }, 'name');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('validation called', () => {
    const spy2 = jest.spyOn(validation, 'validateRequired');
    validateField({
      state: stateMock,
      config: configMock,
      setState: jest.fn()
    }, 'password');

    expect(spy2).toHaveBeenCalled();
  });

  test('validation called with param', () => {
    const spy3 = jest.spyOn(validation, 'validateMatching');
    validateField({
      state: stateMock,
      config: configMock,
      setState: jest.fn()
    }, 'passwordConfirm');

    expect(spy3).toHaveBeenCalledWith(fieldsMock.passwordConfirm, fieldsMock.password);
  });

  test('error set if invalid field', () => {
    const setErrorState = jest.fn();

    validateField({
      state: stateMock,
      config: configMock,
      setState: setErrorState
    }, 'passwordConfirm');

    expect(setErrorState).toHaveBeenCalledWith(expect.objectContaining({
      errors: expect.objectContaining(
        { passwordConfirm: expect.any(String) }
      )}
    ));
  });

  test('error cleared when invalid field made valid ',() => {
    const clearErrorState = jest.fn();

    validateField({
      state: errorStateMock,
      config: configMock,
      setState: clearErrorState
    }, 'password');

    expect(clearErrorState).toHaveBeenCalledWith(expect.objectContaining({
      errors: {}
    }));
  });
});
