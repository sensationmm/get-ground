import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import ButtonIcon from './ButtonIcon'
import addIcon from 'src/assets/images/add-icon.svg';

describe('<ButtonIcon />', () => {
  let wrapper, component;

  const onClickMock = jest.fn();
  const defaultProps = {
    onClick: onClickMock,
    icon: addIcon,
    hidden: false
  };

  beforeEach(() => {
    wrapper = setup(ButtonIcon, defaultProps);
  });

  test('renders without error', () => {
    component = findByTestAttr(wrapper, 'component-button-icon');
    expect(component.length).toBe(1);
  });

  test('executes onClick', () => {
    component.simulate('click');
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
