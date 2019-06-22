import { RawComponent as Details } from './details';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { navigate } from 'gatsby';

import { companyMock } from '../CompanyOverview.test';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('Details', () => {
  let wrapper;
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id ),
    activeCompany: '1',
    companies: [ companyMock ]
  };

  beforeEach(() => {
    wrapper = setup(Details, defaultProps, { hasLoaded: true, company: companyMock });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-bank-details');
    expect(component.length).toBe(1);
  });

  test('company link', () => {
    const button = wrapper.find('.company-header');
    button.simulate('click');

    expect(navigate).toHaveBeenCalledWith('/dashboard/company');
  });

  test('back link', () => {
    const button = wrapper.find('.back');
    button.simulate('click');

    expect(navigate).toHaveBeenCalledWith('/dashboard/company/bank-account');
  });

  test('translations', () => {
    expect(wrapper.find('.back').at(0).text()).toBe('dashboard.company.bankAccount.back');
    expect(wrapper.find('h2').at(0).text()).toBe('dashboard.company.bankAccount.sortCode');
    expect(wrapper.find('h2').at(1).text()).toBe('dashboard.company.bankAccount.accountNumber');
    expect(wrapper.find('h2').at(2).text()).toBe('dashboard.company.bankAccount.address');
    expect(wrapper.find('h2').at(3).text()).toBe('dashboard.company.bankAccount.iban');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
