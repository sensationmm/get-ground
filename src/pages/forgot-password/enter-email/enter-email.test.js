import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby';
import { RawComponent as EnterEmail, AuthService } from './index'

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<EnterEmail />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    AuthService.requestResetPassword = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));

    props = {
      t: jest.fn(),
      showLoader: jest.fn(),
      hideLoader: jest.fn(),
    }
    wrapper = shallow(<EnterEmail {...props}/>)
  })

  test('renders without error', () => {
    expect(wrapper.length).toEqual(1)
  })

  test('makes call to make a request to set new password', async () => {
    wrapper.setState({
      values: {
       email: 'fancy-email@email.com'
      }
    })
    const form = wrapper.find('[data-test="reset-password-form"]')
    const button = wrapper.find('[data-test="enter-email-button"]')
    await button.props().onClick()
    expect(form.length).toEqual(1);
    expect(props.showLoader).toHaveBeenCalled();
    expect(props.hideLoader).toHaveBeenCalled();
    expect(AuthService.requestResetPassword).toHaveBeenCalledWith('fancy-email@email.com')
    expect(navigate).toHaveBeenCalledWith('/onboarding/account-pending', {
      state: {
        passwordReset: true,
      }
    })
  })
})
