import { RawComponent as BankAccount } from './index';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { navigate } from 'gatsby';

import { companyMock } from '../CompanyOverview.test';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('BankAccount', () => {
  let wrapper;
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id ),
    activeCompany: 0,
    companies: [ companyMock ]
  };

  beforeEach(() => {
    wrapper = setup(BankAccount, defaultProps);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-bank-account');
    expect(component.length).toBe(1);
  });

  test('company link', () => {
    const button = wrapper.find('.company-header');
    button.simulate('click');

    expect(navigate).toHaveBeenCalledWith('/dashboard/company');
  });

  test('bank details link', () => {
    const button = wrapper.find('.bank-header');
    button.simulate('click');

    expect(navigate).toHaveBeenCalledWith('/dashboard/company/bank-account/details');
  });

  test('translations', () => {
    expect(wrapper.find('.bank-header-balance').at(0).find('p').text()).toBe('dashboard.company.bankAccount.available');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
