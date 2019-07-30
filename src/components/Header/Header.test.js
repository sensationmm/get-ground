import React from 'react';
import { navigate } from 'gatsby';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as Header } from './Header';
import Button from 'src/components/_buttons/Button/Button';

jest.mock('gatsby', () => ({
  Link: jest.fn(),
  navigate: jest.fn()
}));

describe('<Header />', () => {
  let wrapper;
  const onClickMock = jest.fn();

  const props = {
    t: jest.fn(),
    onClick: onClickMock
  }

  test('renders without error', () => {
    wrapper = setup(Header, { ...props, isMobile: true, });
    const component = findByTestAttr(wrapper, 'component-header');
    expect(component.length).toBe(1);
  });

  test('clicking menu icon toggles the menu', () => {
    wrapper = setup(Header, { ...props, isMobile: true });
    const menuIcon = wrapper.find('.header-menu-toggle');

    menuIcon.props().onClick();
    expect(onClickMock).toHaveBeenCalled();
  });

  test('dashboard btn', () => {
    wrapper = setup(Header, { ...props, isMobile: true, showDashboardButton: true });

    expect(findByTestAttr(wrapper, 'dashboard').length).toEqual(0);
    wrapper.setProps({
      userID: 1234
    })
    expect(findByTestAttr(wrapper, 'dashboard').length).toEqual(1);
    findByTestAttr(wrapper, 'dashboard').props().onClick()
    expect(navigate).toHaveBeenCalledWith('/dashboard')
    wrapper.setProps({
      children: <Button />
    })
    expect(findByTestAttr(wrapper, 'dashboard').length).toEqual(0);
  });

  test('disable classname to children', () => {
    wrapper = setup(Header, { ...props, childrenDisabled: true, children: <Button label="str" />, isMobile: true });

    expect(findByTestAttr(wrapper, 'children').props().className).toEqual('header-children disabled');
  });
});
