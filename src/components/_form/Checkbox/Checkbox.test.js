import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import Checkbox from './Checkbox';

describe('<Input />', () => {
  let wrapper, component, layout;

  const mockOnChange = jest.fn();

  beforeEach(() => {
    wrapper = setup(Checkbox, {
      id:'text-checkbox',
      label:'Please click to confirm',
      onChange: mockOnChange
    });
    component = findByTestAttr(wrapper, 'component-checkbox');
    layout = findByTestAttr(wrapper, 'component-checkbox-layout');
  });

  test('renders without error', () => {
    expect(component.length).toBe(1);
  });

  test('onChange() called when input clicked', () => {
    layout.simulate('click');
    expect(mockOnChange).toHaveBeenCalled();
  });
});
