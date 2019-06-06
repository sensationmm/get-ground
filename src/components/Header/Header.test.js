import React from 'react';
import { setup, findByTestAttr } from '../../test-utils/test-utils';

import Header from './Header';
import Button from 'src/components/_buttons/Button/Button';

describe('<Header />', () => {
  let wrapper;
  const onClickMock = jest.fn();

  test('renders without error', () => {
    wrapper = setup(Header);
    const component = findByTestAttr(wrapper, 'component-header');
    expect(component.length).toBe(1);
  });

  test('renders header buttons', () => {
    wrapper = setup(Header, { children: <Button label="str" />});

    expect(wrapper.find(Button).length).toBe(3);
  });

  test('clicking menu icon toggles the menu', () => {
    wrapper = setup(Header, { onClick: onClickMock });
    const menuIcon = wrapper.find('.header-menu-toggle');

    menuIcon.props().onClick();
    expect(onClickMock).toHaveBeenCalled();
  });
});
