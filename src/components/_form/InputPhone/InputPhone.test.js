import React from 'react';
import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import InputPhone from './InputPhone';
import Note from '../../_layout/Note/Note';

describe('<InputPhone />', () => {
  let wrapper, component, input, select;

  const changeMock = jest.fn();
  const focusMock = jest.fn();
  const validateMock = jest.fn();
  const countryMock = '+44';
  const numberMock = '012345';
  const noteMock = 'test note';
  // const splitValueSpy = jest.spyOn(InputPhone.prototype, 'setValue');

  describe('passing validation', () => {
    beforeEach(() => {
      wrapper = setup(InputPhone, { 
        id: 'input-name',
        label: 'Name',
        stateKey: 'name',
        onChange: changeMock,
        onFocus: focusMock,
        validate: validateMock,
        note: noteMock
      });
      component = findByTestAttr(wrapper, 'component-input-phone');
      input = findByTestAttr(wrapper, 'phone-number');
      select = findByTestAttr(wrapper, 'phone-country');
    });
    
    test('renders without error', () => {
      expect(component.length).toBe(1);
    });

    describe('text component', () => {
      test('onChange callback fires on type', () => {
        input.simulate('change', {
          preventDefault() {},
          target: { value: numberMock }
        });

        expect(changeMock).toHaveBeenCalledWith(`(${countryMock})${numberMock}`);
      });

      test('validate is called on blur', () => {
        input.simulate('blur', {
          preventDefault() {},
          target: { value: numberMock }
        });

        expect(validateMock).toHaveBeenCalled();
      });
    });

    describe('select component', () => {
      test('onChange callback fires on select', () => {
        select.simulate('change', {
          preventDefault() {},
          target: { value: countryMock}
        });

        expect(changeMock).toHaveBeenCalledWith(`(${countryMock})${numberMock}`);
      });
    });

    test('renders note if passed', () => {
      expect(wrapper.contains(<Note>{noteMock}</Note>)).toBe(true);
    });

    test('does not render note if none passed', () => {
      const noNote = setup(InputPhone, { 
        id: 'input-name',
        label: 'Phone',
        onChange: changeMock,
      });
      expect(noNote.contains(<Note>{noteMock}</Note>)).toBe(false);
    });
  });

  describe('failing validation', () => {
    beforeEach(() => {
      wrapper = setup(InputPhone, { 
        id: 'input-name',
        label: 'Name',
        onChange: changeMock,
        error: 'field required'
      });
      component = findByTestAttr(wrapper, 'component-input');
      input = findByTestAttr(wrapper, 'component-input-field');
    });

    test('error message set', () => {
      const error = findByTestAttr(wrapper, 'input-phone-error');

      expect(error.length).toBe(1);
      expect(error.text()).toBe('field required');
    });
  });

  describe('without validation', () => {
    beforeEach(() => {
      wrapper = setup(InputPhone, { 
        id: 'input-name',
        label: 'Name',
        value: '(+44)12345',
        onChange: changeMock
      });
      component = findByTestAttr(wrapper, 'component-input');
      input = findByTestAttr(wrapper, 'phone-number');
    });

    test('onValidate when no validation supplied', () => {
      input.simulate('blur', {
        preventDefault() {},
        target: { value: numberMock }
      });

      expect(input.props().onBlur).toBeFalsy();
    });
  });
});
