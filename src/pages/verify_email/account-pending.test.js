import { navigate } from 'gatsby';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import AccountPending, { AuthService } from './index';
import TextImage from 'src/components/_layout/TextImage/TextImage';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<AccountPending />', () => {
  let props;

  AuthService.verifyEmail = jest.fn().mockReturnValue(Promise.resolve({ status: 200, data: {} }));

  beforeEach(() => {
    props = {
      location: {
        state: {
          passwordReset: false,
          email: 'test-email@getground.co.uk'
        },
        search: '?email_verification_code=code'
      }
    }
  })

  test('renders forgot password content when password reset is true', () => {
    props = {
      location: {
        state: {
          passwordReset: true
        }
      }
    }
    const wrapper = setup(AccountPending, props);
    const component = findByTestAttr(wrapper, 'container-account-pending');

    const layoutComp = component.find(TextImage);
    expect(layoutComp.props().text).toEqual('<p>forgotPassword.emailPending</p>');
    expect(AuthService.verifyEmail).toHaveBeenCalledTimes(0);
  });

  test('renders without error', () => {
    const wrapper = setup(AccountPending, props);
    const component = findByTestAttr(wrapper, 'container-account-pending');
    expect(component.length).toBe(1);
  });

  test('renders correct content', () => {
    const wrapper = setup(AccountPending, props);
    const component = findByTestAttr(wrapper, 'container-account-pending');

    const layoutComp = component.find(TextImage);
    expect(layoutComp.props().text).toEqual('<p>onBoarding.accountPending.initialText test-email@getground.co.uk. onBoarding.accountPending.text</p>');
  });

  describe('verifyEmail()', () => {
    test('success', async () => {
      await setup(AccountPending, props);
      expect(navigate).toHaveBeenCalledWith('/onboarding/email-verified');
    });

    test('already verified', async () => {
      AuthService.verifyEmail = jest.fn().mockReturnValue(Promise.resolve({ status: 404, data: { error: 'sasd' } }));
      await setup(AccountPending, props);
      expect(navigate).toHaveBeenCalledWith('/login');
    });

    test('failure', () => {
      AuthService.verifyEmail = jest.fn().mockReturnValue(Promise.resolve({ status: 500 }));
      setup(AccountPending, props);
      expect(navigate).toHaveBeenCalledTimes(0);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
  });
});
