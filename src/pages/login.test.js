import { navigate } from 'gatsby';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as Login, AuthService } from 'src/pages/login';
import { initialState as ReduxFormMock } from 'src/state/reducers/form';
import formUtils from 'src/utils/form';

jest.mock('gatsby', () => ({
  navigate: jest.fn(),
  Link: jest.fn()
}));

describe('Login', () => {
  let wrapper, loginSpy;

  jest.spyOn(formUtils, 'initFormState');
  jest.spyOn(formUtils, 'clearFormState');
  jest.spyOn(formUtils, 'setFormError');

  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();

  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id ),
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    form: ReduxFormMock,
    location: {
      search: null
    }
  };
  
  beforeEach(() => {
    wrapper = setup(Login, defaultProps);
    loginSpy = jest.spyOn(wrapper.instance(), 'onLogin');
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-login');
    expect(component.length).toBe(1);
    expect(formUtils.initFormState).toHaveBeenCalledTimes(1);
  });

  test('form cleared on unmount', () => {
    jest.spyOn(formUtils, 'clearFormState');
    wrapper.unmount();
    expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
  });

  describe('enterSubmit()', () => {
    test('logs in on enter', () =>{
      const keyPress = { key: 'Enter' };
  
      wrapper.instance().enterSubmit(keyPress);
      expect(loginSpy).toHaveBeenCalled();
    });

    test('else nothing', () => {
      const keyPress = { key: 'Space' };
  
      wrapper.instance().enterSubmit(keyPress);
      expect(loginSpy).toHaveBeenCalledTimes(0);
    });
  });
  
  test('login button', () => {
    const button = findByTestAttr(wrapper, 'login-button');
    button.simulate('click');

    expect(button.dive().text()).toEqual('login.ctaPrimary');
    expect(loginSpy).toHaveBeenCalled();
  });

  describe('onLogin()', () => {
    test('success', async () => {
      jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      AuthService.login = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
      
      await wrapper.instance().onLogin();
      
      expect(showLoaderMock).toHaveBeenCalled();
      expect(hideLoaderMock).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith('/onboarding');
    });
    
    test('failure', async () => {
      jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      AuthService.login = jest.fn().mockReturnValue(Promise.resolve({ status: 404 }));
      
      await wrapper.instance().onLogin();
      
      expect(showLoaderMock).toHaveBeenCalled();
      expect(hideLoaderMock).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledTimes(0);
      expect(formUtils.setFormError).toHaveBeenCalledWith('login.form.error');
    });
    
    test('verify failure', async () => {
      jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      AuthService.login = jest.fn().mockReturnValue(Promise.resolve({ status: 401 }));
      
      await wrapper.instance().onLogin();
      
      expect(showLoaderMock).toHaveBeenCalled();
      expect(hideLoaderMock).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledTimes(0);
      expect(formUtils.setFormError).toHaveBeenCalledWith('login.form.errorVerify');
    });
    
    test('success with redirect', async () => {
      wrapper = setup(Login, { ...defaultProps, location: { search: '?redirect=/company-design' }});
      jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      AuthService.login = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
      
      await wrapper.instance().onLogin();
      
      expect(showLoaderMock).toHaveBeenCalled();
      expect(hideLoaderMock).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith('/company-design');
    });
  });

  test('renders error message if errors present', () => {
    wrapper = setup(Login, {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        showErrorMessage: true,
        errors: {
          form: 'Test error'
        }
      }
    });
    const component = findByTestAttr(wrapper, 'create-error-box');
    expect(component.length).toBe(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});
