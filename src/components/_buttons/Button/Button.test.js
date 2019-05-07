import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import Button from './Button'
import addIcon from 'src/assets/images/add-icon.svg';

describe('<Button />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      icon: addIcon,
      hidden: false
    }

   wrapper = setup(Button, props);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-button');
    expect(component.length).toBe(1);
  });

  test('renders and is hidden', () => {
    wrapper = setup(Button, { onClick: jest.fn(), hidden: true });
    const component = findByTestAttr(wrapper, 'component-button');
    expect(component.length).toBe(1);
  });
});
