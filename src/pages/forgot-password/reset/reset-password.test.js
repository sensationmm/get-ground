import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import { RawComponent as ResetPassword, AuthService } from './index'

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('ResetPassword', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    AuthService.setNewPassword = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));

    props = {
      t: jest.fn(),
      showLoader: jest.fn(),
      hideLoader: jest.fn(),
      location: {
        search: ''
      }
    }
    wrapper = shallow(<ResetPassword {...props}/>)
  })

  test('renders without error', () => {
    expect(wrapper.length).toEqual(1)
  })

  test('makes call to set new password', async () => {
    wrapper.setState({
      values: {
        password: 'test1',
        passwordConfirm: 'test1',
        optin: false,
        privacy: false
      }
    })
    const form = wrapper.find('[data-test="reset-password-form"]')
    const button = wrapper.find('[data-test="reset-password-button"]')
    await button.props().onClick()
    expect(form.length).toEqual(1);
    expect(props.showLoader).toHaveBeenCalled();
    expect(props.hideLoader).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/login')
  })

  test('error state', async () => {
    wrapper.setState({
      values: {
        password: 'test1',
        passwordConfirm: 'test1',
        optin: false,
        privacy: false
      },
      errors: {
        form: 'error-form'
      }
    })
    const error = wrapper.find('[data-test="reset-password-error"]')
    expect(error.length).toEqual(1)
  })
})
