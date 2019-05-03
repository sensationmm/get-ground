import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import InputText from './InputText';

describe('<InputText />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(InputText, { 
      id: 'input-name',
      label: 'Name',
      onChange: jest.fn(),
      validationFunction: 'validateRequired'
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-input-text');
    expect(component.length).toBe(1);
  });
});
