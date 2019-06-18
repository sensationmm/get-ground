import React from 'react';
import { navigate } from 'gatsby';
import { setup, findByTestAttr } from '../../test-utils/test-utils';

import Header from './Header';
import Button from 'src/components/_buttons/Button/Button';

jest.mock('gatsby', () => ({
  Link: jest.fn(),
  navigate: jest.fn()
}));

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

  test('dashboard btn', () => {
    wrapper = setup(Header, { onClick: onClickMock });

    expect(findByTestAttr(wrapper, 'dashboard').length).toEqual(0);
    wrapper.setProps({
      userID: 1234
    })
    expect(findByTestAttr(wrapper, 'dashboard').length).toEqual(1);
    findByTestAttr(wrapper, 'dashboard').props().onClick()
    expect(navigate).toHaveBeenCalledWith('/dashboard')
  });
});
