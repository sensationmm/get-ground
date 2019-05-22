import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import InputNumber from './InputNumber';

describe('<InputNumber />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(InputNumber, { 
      id: 'input-name',
      label: 'Name',
      onChange: jest.fn(),
      validationFunction: 'validateRequired'
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-input-number');
    expect(component.length).toBe(1);
  });
});
