import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import InputPassword from './InputPassword';

describe('<InputPassword />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(InputPassword, { 
      id: 'input-name',
      label: 'Name',
      onChange: jest.fn(),
      validationFunction: 'validateRequired'
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-input-password');
    expect(component.length).toBe(1);
  });
});
