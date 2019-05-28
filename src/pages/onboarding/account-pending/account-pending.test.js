import { navigate } from 'gatsby';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import AccountPending, { AuthService } from './index';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<AccountPending />', () => {
  let props;

  AuthService.verifyEmail = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));

  beforeEach(() => {
    props = {
      location: {
        state: {
          passwordReset: false
        }
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
    const content = component.find('[data-test="account-pending-content"]')

    expect(content.text()).toEqual('forgotPassword.emailPending')
    expect(AuthService.verifyEmail).toHaveBeenCalledTimes(0)
  });

  test('renders without error', () => {
    const wrapper = setup(AccountPending, props);
    const component = findByTestAttr(wrapper, 'container-account-pending');
    expect(component.length).toBe(1);
  });

  test('renders correct content', () => {
    const wrapper = setup(AccountPending, props);
    const component = findByTestAttr(wrapper, 'container-account-pending');
    const content = component.find('[data-test="account-pending-content"]')

    expect(content.text()).toEqual('onBoarding.accountPending.text')
  });

  describe('verifyEmail()', () => {
    test('success', () => {
      setup(AccountPending, props);
      expect(navigate).toHaveBeenCalledWith('/onboarding/email-verified');
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