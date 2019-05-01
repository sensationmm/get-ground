import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import Select from './Select';

describe('<Select />', () => {
  let wrapper;
  const changeMock = jest.fn();

  beforeEach(() => {
    wrapper = setup(Select, { 
      label: 'label',
      classes: 'my-class',
      onChange: changeMock,
      options: [],
      defaultOptionText: 'select option'
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-select');
    expect(component.length).toBe(1);
  });

  test('onChange callback fires on select', () => {
    const component = findByTestAttr(wrapper, 'component-select');

    component.find('select').simulate('change');

    expect(changeMock).toHaveBeenCalled();
  });

});
