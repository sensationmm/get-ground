import { navigate } from 'gatsby';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import AccountPending, { AuthService } from './index';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<AccountPending />', () => {
  AuthService.verifyEmail = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));

  test('renders without error', () => {
    const wrapper = setup(AccountPending);
    const component = findByTestAttr(wrapper, 'container-account-pending');
    expect(component.length).toBe(1);
  });
  
  describe('verifyEmail()', () => {
    test('success', () => {
      setup(AccountPending);
      expect(navigate).toHaveBeenCalledWith('/onboarding/email-verified');
    });
    
    test('failure', () => {
      AuthService.verifyEmail = jest.fn().mockReturnValue(Promise.resolve({ status: 500 }));
      setup(AccountPending);
      expect(navigate).toHaveBeenCalledTimes(0);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
  });
});
