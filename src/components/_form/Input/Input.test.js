import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import Input from './Input';

describe('<Input />', () => {
  let wrapper, component, input;

  const changeMock = jest.fn();
  const focusMock = jest.fn();
  const validateMock = jest.fn();
  const inputMock = 'Spongebob';

  describe('passing validation', () => {
    beforeEach(() => {
      wrapper = setup(Input, {
        id: 'input-name',
        label: 'Name',
        stateKey: 'name',
        onChange: changeMock,
        onFocus: focusMock,
        validate: validateMock,
        note: 'test note'
      });
      component = findByTestAttr(wrapper, 'component-input');
      input = findByTestAttr(wrapper, 'component-input-field');
    });

    test('renders without error', () => {
      expect(component.length).toBe(1);
    });

    test('onChange callback fires on type', () => {
      input.simulate('change', {
        preventDefault() {},
        target: { value: inputMock }
      });

      expect(changeMock).toHaveBeenCalledWith(inputMock);
    });

    test('onFocus callback fires on focus', () => {
      input.simulate('focus', {
        target: { value: focusMock }
      });

      expect(focusMock).toHaveBeenCalled();
    });

    // test('error state is cleared on click', () => {
    //   const wrapperError = setup(
    //     Input,
    //     {
    //       id: 'input-name',
    //       label: 'Name',
    //       onChange: changeMock
    //     },
    //     {
    //       validated: false,
    //       validationMessage: 'Required'
    //     }
    //   );

    //   const inputError = findByTestAttr(wrapperError, 'component-input-field');
    //   inputError.simulate('focus');

    //   expect(wrapperError.state().validated).toBe(true);
    //   expect(wrapperError.state().validationMessage).toBe(null);
    // });

    test('validate is called on blur', () => {
      input.simulate('blur', {
        preventDefault() {},
        target: { value: inputMock }
      });

      expect(validateMock).toHaveBeenCalled();
    });

    test('renders note if passed', () => {
      const note = findByTestAttr(wrapper, 'text-input-note');
      expect(note.length).toBe(1);
    });

    test('does not render note if none passed', () => {
      const noNote = setup(Input, {
        id: 'input-name',
        onChange: changeMock,
      });
      const note = findByTestAttr(noNote, 'text-input-note');
      expect(note.length).toBe(0);
    });
  });

  describe('failing validation', () => {
    beforeEach(() => {
      wrapper = setup(Input, {
        id: 'input-name',
        label: 'Name',
        onChange: changeMock,
        error: 'field required'
      });
      component = findByTestAttr(wrapper, 'component-input');
      input = findByTestAttr(wrapper, 'component-input-field');
    });

    test('error message set', () => {
      const error = findByTestAttr(wrapper, 'text-input-error');

      expect(error.length).toBe(1);
      expect(error.text()).toBe('field required');
    });
  });

  // describe('without validation', () => {
  //   beforeEach(() => {
  //     wrapper = setup(Input, {
  //       id: 'input-name',
  //       label: 'Name',
  //       onChange: changeMock,
  //       validationFunction: null,
  //       hidden: true
  //     });
  //     component = findByTestAttr(wrapper, 'component-input');
  //     input = findByTestAttr(wrapper, 'component-input-field');
  //   });

  //   test('onValidate when no validation supplied', () => {
  //     wrapper.instance().onValidate = jest.fn();
  //     input.simulate('blur', {
  //       preventDefault() {},
  //       target: { value: inputMock }
  //     });

  //     expect(wrapper.instance().onValidate).toHaveBeenCalledTimes(0);
  //   });
  // });

  // describe('onValidate()', () => {
  //   test('passes validation (without param)', () => {
  //     wrapper = setup(
  //       Input,
  //       {
  //         id: 'input-name',
  //         label: 'Name',
  //         onChange: changeMock,
  //         validationFunction: 'validateRequired'
  //       }
  //     );

  //     wrapper.instance().onValidate(inputMock);
  //     expect(wrapper.state().validated).toBe(true);
  //   });

  //   test('passes validation (with param)', () => {
  //     wrapper = setup(
  //       Input,
  //       {
  //         id: 'input-name',
  //         label: 'Name',
  //         onChange: changeMock,
  //         validationFunction: 'validateMatching',
  //         validationParam: inputMock
  //       }
  //     );

  //     wrapper.instance().onValidate(inputMock, inputMock);
  //     expect(wrapper.state().validated).toBe(true);
  //   });

  //   test('fails validation', () => {
  //     wrapper = setup(
  //       Input,
  //       {
  //         id: 'input-name',
  //         label: 'Name',
  //         onChange: changeMock,
  //         validationFunction: 'validateEmail'
  //       }
  //     );

  //     wrapper.instance().onValidate(inputMock);
  //     expect(wrapper.state().validated).toBe(false);
  //   });

  //   test('no validation', () => {
  //     wrapper = setup(
  //       Input,
  //       {
  //         id: 'input-name',
  //         label: 'Name',
  //         onChange: changeMock,
  //         validationFunction: null
  //       }
  //     );

  //     wrapper.instance().onValidate(inputMock);
  //     expect(wrapper.state().validated).toBe(true);
  //   });
  // });
});
