import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import Select from './Select';

describe('<Select />', () => {
  let wrapper;
  const changeMock = jest.fn();
  const validateMock = jest.fn();
  const mockEvent = {
    target: {
      value: 'spain'
    }
  };

  beforeEach(() => {
    wrapper = setup(Select, { 
      label: 'label',
      classes: 'my-class',
      onChange: changeMock,
      options: [],
      defaultOptionText: 'select option',
      validate: validateMock,
      error: 'field required'
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-select');
    expect(component.length).toBe(1);
  });

  test('onChange callback fires on select', () => {
    const component = findByTestAttr(wrapper, 'component-select');

    component.find('select').props().onChange(mockEvent);

    expect(changeMock).toHaveBeenCalledWith('spain', validateMock);
  });

  test('error message is set', () => {
    const error = findByTestAttr(wrapper, 'select-error');

    expect(error.length).toBe(1);
    expect(error.text()).toBe('field required');
  });

});
