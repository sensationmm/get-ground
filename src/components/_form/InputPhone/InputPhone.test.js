import React from 'react';
import ReactFlagsSelect from 'react-flags-select';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import InputPhone from './InputPhone';
import Note from 'src/components/_layout/Note/Note';

describe('<InputPhone />', () => {
  let wrapper, component, input;

  const changeMock = jest.fn();
  const focusMock = jest.fn();
  const validateMock = jest.fn();
  const countryMock = '+44';
  const countryCodeMock = 'GB';
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
        const component = wrapper.find(ReactFlagsSelect);

        component.props().onSelect(countryCodeMock);

        expect(changeMock).toHaveBeenCalledWith(`(${countryMock})`, 'input-name');
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
