import React from 'react';
import { navigate } from 'gatsby';

import { shallow } from 'enzyme';
import { Layout, AuthService } from './Layout';
import { setup } from 'src/test-utils/test-utils';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

jest.mock('jwt-decode', () => jest.fn().mockReturnValue({ exp: (Date.now().valueOf() / 1000) + 100 }));
jest.spyOn(AuthService, 'reauthenticate');
jest.spyOn(window, 'addEventListener');
jest.spyOn(JSON, 'parse');
jest.spyOn(Storage.prototype, 'removeItem');
const setWidthMock = jest.fn();
const saveAuthMock = jest.fn();

describe('<Layout />', () => {
  const props = {
    isLoading: false,
    children: {
      props: {
        role: 'test-role'
      }
    },
    setWidth: setWidthMock,
    saveAuth: saveAuthMock
  };

  test('onmount should call setWidth with innerWidth', () => {
    shallow(<Layout {...props} />);
    expect(setWidthMock).toHaveBeenCalledWith(1024);
    expect(window.addEventListener).toHaveBeenCalled();
  });

  test('renders Loader if isLoading is true', () => {
    const customProps = {
      ...props,
      isLoading: true
    }
    const wrapper = shallow(<Layout {...customProps} />);
    expect(wrapper.find('Loader')).toHaveLength(1);
  });

  test('passes role to classname', () => {
    const wrapper = shallow(<Layout {...props} />);
    expect(wrapper.find('.wrapper.test-role')).toHaveLength(1);
  });

  test('validateCompanyID', () => {
    setup(Layout, { ...props, companyID:true, activeCompany: null });

    expect(navigate).toHaveBeenCalledWith('/dashboard');
  });
  
  describe('auth detection', () => {

    test('has userID', () => {
      setup(Layout, { ...props, userID: 1 });
      expect(AuthService.reauthenticate).toHaveBeenCalledTimes(0);
      expect(navigate).toHaveBeenCalledTimes(0);
    });
    
    test('does not have userID', () => {
      localStorage.setItem('gg-auth', JSON.stringify({ token: 'testauth' }));

      setup(Layout, { ...props });

      expect(AuthService.reauthenticate).toHaveBeenCalled();
      expect(saveAuthMock).toHaveBeenCalled();
      expect(JSON.parse).toHaveBeenCalled();
    });

    test('redirect after login if redirect provided', () => {
      localStorage.setItem('gg-auth', JSON.stringify({ token: 'testauth' }));

      setup(Layout, { ...props, redirect: '/dummy-path' });

      expect(AuthService.reauthenticate).toHaveBeenCalled();
      expect(saveAuthMock).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith('/dummy-path');
    });

    test('redirect to login if not authed', () => {
      setup(Layout, { ...props, secure: true });
      expect(navigate).toHaveBeenCalledWith('/login');
      expect(Storage.prototype.removeItem).toHaveBeenCalledTimes(1);
    });

    test('redirect to login with redirect if not authed and redirect provided', () => {
      setup(Layout, { ...props, secure: true, redirect: '/dummy-path2' });
      expect(navigate).toHaveBeenCalledWith('/login?redirect=/dummy-path2');
      expect(Storage.prototype.removeItem).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('gg-auth');
    Storage.prototype.removeItem.mockClear();
  });
})
