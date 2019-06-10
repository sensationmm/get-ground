import { RawComponent as CompanyOverview } from './index';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { navigate } from 'gatsby';

import Button from 'src/components/_buttons/Button/Button';

export const companyMock = {
  id: '1',
  name: 'Dunmow Limited',
  address: {
    premise: '93  Dunmow Road',
    street: 'Lanstephan',
    posttown: 'Launceston',
    postcode: 'PL15 8JN'
  },
  shareholders: [
    'Shona Longley',
    'Patrick Richards'
  ],
  directors: [
    'Grace Hecker'
  ],
  documents: [
    { name: 'Shareholders agreement', file: 'http://www.google.com' },
    { name: 'Company Articles of Association', file: 'http://www.google.com' },
    { name: 'Directors Loan Agreement', file: 'http://www.google.com' }
  ],
  bank_account: {
    name: 'Daniel Hecker',
    sort_code: '10-75-99',
    account_number: '9837 4831',
    address: {
      branch: 'Barclays Bank PLC',
      street: '1 Churchill Place',
      town: 'London',
      postcode: 'E14 5HP'
    },
    iban: 'DE27100777-770209299700',
    balance: '£483,293.62',
    transactions: [
      {
        date: '2019-04-30',
        name: 'Smith Plumbers Ltd',
        sum: '-£200',
        balance: '£483,293.62'
      },
      {
        date: '2019-04-30',
        name: 'J Jones Rent',
        sum: '+£1,200',
        balance: '£483,293.62'
      },
      {
        date: '2019-04-30',
        name: 'J Jones Rent',
        sum: '+£1,200',
        balance: '£483,293.62'
      },
      {
        date: '2019-04-13',
        name: 'Smith Plumbers Ltd',
        sum: '-£200',
        balance: '£483,293.62'
      },
      {
        date: '2019-04-13',
        name: 'J Jones Rent',
        sum: '+£1,200',
        balance: '£483,293.62'
      }
    ]
  }
};

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('CompanyOverview', () => {
  let wrapper;
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id ),
    activeCompany: '1',
    companies: [ companyMock ]
  };

  beforeEach(() => {
    wrapper = setup(CompanyOverview, defaultProps);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-company');
    expect(component.length).toBe(1);
  });

  test('renders without error when activeCompany not set', () => {
    wrapper = setup(CompanyOverview, { ...defaultProps, activeCompany: null });
    const component = findByTestAttr(wrapper, 'component-company');
    expect(component.length).toBe(1);
  });

  test('manage button', () => {
    const button = findByTestAttr(wrapper, 'manage-company-button');
    button.simulate('click');

    expect(navigate).toHaveBeenCalledWith('/dashboard/company/manage');
  });

  test('bank account button', () => {
    const button = findByTestAttr(wrapper, 'bank-account-button');
    button.simulate('click');

    expect(navigate).toHaveBeenCalledWith('/dashboard/company/bank-account');
  });

  test('translations', () => {
    expect(wrapper.find('h2').at(0).text()).toBe('dashboard.company.overview.sections.company');
    expect(wrapper.find('h2').at(1).text()).toBe('dashboard.company.overview.sections.address');
    expect(wrapper.find('h2').at(2).text()).toBe('dashboard.company.overview.sections.shareholders');
    expect(wrapper.find('h2').at(3).text()).toBe('dashboard.company.overview.sections.directors');
    expect(wrapper.find('h2').at(4).text()).toBe('dashboard.company.overview.sections.documents');
    expect(wrapper.find(Button).at(0).props().label).toBe('dashboard.company.overview.ctaPrimary');
    expect(wrapper.find(Button).at(1).props().label).toBe('dashboard.company.overview.ctaSecondary');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
