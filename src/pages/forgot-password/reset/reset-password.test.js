import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import { RawComponent as ResetPassword, AuthService } from './index'
import { initialState as ReduxFormMock } from 'src/state/reducers/form';

import formUtils from 'src/utils/form';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('ResetPassword', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    AuthService.setNewPassword = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
    jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);

    props = {
      t: jest.fn(),
      showLoader: jest.fn(),
      hideLoader: jest.fn(),
      form: ReduxFormMock,
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
    const form = wrapper.find('[data-test="reset-password-form"]')
    const button = wrapper.find('[data-test="reset-password-button"]')
    await button.props().onClick()
    expect(form.length).toEqual(2);
    expect(props.showLoader).toHaveBeenCalled();
    expect(props.hideLoader).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/login')
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
