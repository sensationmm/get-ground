import { setup, findByTestAttr } from '../../../test-utils/test-utils'

import ButtonHeader from './ButtonHeader'

describe('<ButtonHeader />', () => {
  let wrapper;
  const mockOnClick = jest.fn();

  beforeEach(() => {
    wrapper = setup(ButtonHeader, { onClick: mockOnClick });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-button-header');
    expect(component.length).toBe(1);
  });
});
