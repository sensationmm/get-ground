import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import InputCurrency from './InputCurrency';

describe('<InputCurrency />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(InputCurrency, { 
      id: 'input-name',
      label: 'Name',
      onChange: jest.fn(),
      validationFunction: 'validateRequired'
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-input-currency');
    expect(component.length).toBe(1);
  });
});
