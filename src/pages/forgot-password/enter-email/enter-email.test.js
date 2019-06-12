import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby';
import { RawComponent as EnterEmail, AuthService } from './index'
import formUtils from 'src/utils/form';
import { initialState as ReduxFormMock } from 'src/state/reducers/form';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<EnterEmail />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    AuthService.requestResetPassword = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
    jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);

    props = {
      t: jest.fn(),
      showLoader: jest.fn(),
      hideLoader: jest.fn(),
      form: ReduxFormMock
    }
    wrapper = shallow(<EnterEmail {...props}/>)
  })

  test('renders without error', () => {
    expect(wrapper.length).toEqual(1)
  })

  test('makes call to make a request to set new password', async () => {
    wrapper.setProps({
      form: {
        ...props.form,
        values: {
         email: 'fancy-email@email.com'
        }
      }
    })
    const form = wrapper.find('[data-test="reset-password-form"]')
    const button = wrapper.find('[data-test="enter-email-button"]')
    await button.props().onClick()
    expect(form.length).toEqual(1);
    expect(props.showLoader).toHaveBeenCalled();
    expect(props.hideLoader).toHaveBeenCalled();
    expect(AuthService.requestResetPassword).toHaveBeenCalledWith('fancy-email@email.com')
    expect(navigate).toHaveBeenCalledWith('/onboarding/verify_email', {
      state: {
        passwordReset: true,
      }
    })
  })
})
