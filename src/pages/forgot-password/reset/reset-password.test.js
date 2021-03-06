import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import { RawComponent as ResetPassword, AuthService } from './index'
import { initialState as ReduxFormMock } from 'src/state/reducers/form';

import formUtils from 'src/utils/form';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

window.scrollTo = () => {};

describe('ResetPassword', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    AuthService.setNewPassword = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
    AuthService.acceptRoleSetPassword = jest.fn().mockReturnValue(Promise.resolve({ status: 200, data: {
      token: '1234',
      user: {
        id: 1
      }
    } }));
    jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);

    props = {
      t: jest.fn(),
      showLoader: jest.fn(),
      hideLoader: jest.fn(),
      saveAuth: jest.fn(),
      userLogin: jest.fn(),
      form: ReduxFormMock,
      location: {
        search: '',
        state: {
          acceptRoleToken: ''
        }
      }
    }
    wrapper = shallow(<ResetPassword {...props}/>)
  })

  test('renders without error', () => {
    expect(wrapper.length).toEqual(1)
  })

  test('makes call to set new password', async () => {
    wrapper.setProps({
      form: {
        ...props.form,
        values: {
          password: 'test1',
          passwordConfirm: 'test1',
          optin: false,
          privacy: false
        }
      }
    })
    const button = wrapper.find('[data-test="reset-password-button"]')
    await button.props().onClick()
    expect(props.showLoader).toHaveBeenCalled();
    expect(props.hideLoader).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/dashboard')
  })

  test('makes call to set new password for accept role', async () => {
    wrapper.setProps({
      form: {
        ...props.form,
        values: {
          password: 'test1',
          passwordConfirm: 'test1',
          optin: false,
          privacy: false
        }
      },
      location: {
        search: '',
        state: {
          acceptRoleToken: '?token=12345'
        }
      }
    })

    const button = wrapper.find('[data-test="reset-password-button"]')
    await button.props().onClick()
    expect(props.showLoader).toHaveBeenCalled();
    expect(props.saveAuth).toHaveBeenCalledWith('1234');
    expect(props.userLogin).toHaveBeenCalledWith({ id: 1 });
    expect(props.hideLoader).toHaveBeenCalled();
    expect(AuthService.setNewPassword).not.toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/onboarding', {
      state: {
        acceptRoleToken: ''
      }
    })
  })


  test('does fire actions to saveAuth and userLogin if no state in location', async () => {
    wrapper.setProps({
      form: {
        ...props.form,
        values: {
          password: 'test1',
          passwordConfirm: 'test1',
          optin: false,
          privacy: false
        }
      },
      location: {
        search: ''
      }
    })

    const button = wrapper.find('[data-test="reset-password-button"]')
    await button.props().onClick()
    expect(props.showLoader).toHaveBeenCalled();
    expect(props.saveAuth).not.toHaveBeenCalledWith('1234');
    expect(props.userLogin).not.toHaveBeenCalledWith({ id: 1 });
    expect(props.hideLoader).toHaveBeenCalled();
  })

  test('error state', async () => {
    wrapper.setProps({
      form: {
        ...props.form,
        showErrorMessage: true,
        errors: {
          form: 'Test error'
        }
      }
    })
    AuthService.setNewPassword = jest.fn().mockReturnValue(Promise.resolve({ status: 501 }));
    const button = wrapper.find('[data-test="reset-password-button"]')
    const error = wrapper.find('[data-test="create-error-box"]')
    await button.props().onClick()

    expect(error.length).toEqual(1)
    expect(error.props().children).toBe('Test error');
  })
})
