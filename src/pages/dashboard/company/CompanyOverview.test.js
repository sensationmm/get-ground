import { RawComponent as CompanyOverview } from './index';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { navigate } from 'gatsby';

import functions from 'src/utils/functions';

import Button from 'src/components/_buttons/Button/Button';

export const companyMock = {
  id: 1,
  additional_services_required: true,
  property_address:{
    address:{
      premise: '37B',
      street: 'Sandringham Road',
      thoroughfare: null,
      posttown: 'London',
      postcode: 'E8 2LR',
      country_name: 'UK'
     },
     is_confirmed:true
  },
  purchase_details:{
     price:{
        amount_in_cents:50000000,
        currency:'GBP'
     },
     is_new_build:false,
     completion_date:'2020-09-08T00:00:00Z',
     expected_exchange_date:'2020-10-12T00:00:00Z',
     payment_schedule:[
        {
           type:'deposit',
           due_date:'2019-09-06T00:00:00Z',
           amount:{
              amount_in_cents:10000000,
              currency:'GBP'
           }
        }
     ]
  },
  shareholder_details:{
     collection:[
        {
          first_name:'Dillion',
          last_name:'Marriot',
          email:'mark@gmail.com',
          allocated_shares:100,
          is_director:true,
          is_existing_user:true
        },
        {
          first_name:'Dillion',
          last_name:'Marriot',
          email:'mark@gmail.com',
          allocated_shares:100,
          is_director:true,
          is_existing_user:true
        }
     ]
  },
  solicitor_details: {
    first_name: 'bob',
    last_name: 'stuff',
    email: 'asdf@sdf.com',
    phone: '07732343567',
    authority: false
  },
  tax_questions:{
    is_owner_of_other_companies: null,
    more_than_50_employees: null,
    assets: null,
    turnover: null
  },
  additional_services:{
    mortgage: null,
    insurance: null,
    management: null,
    solicitor: null
  },
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
  },
  progress: {
    overall_status: 'INCOMPLETE'
  }
};

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('CompanyOverview', () => {
  let wrapper;
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id ),
    activeCompany: 1,
    companies: [ companyMock ],
  };

  jest.spyOn(functions, 'getByValue').mockReturnValue(companyMock);

  beforeEach(() => {
    wrapper = setup(CompanyOverview, defaultProps, { hasLoaded: true, company: companyMock });
  });

  test('renders without error', () => {
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
    expect(wrapper.find('h2').at(2).text()).toBe('dashboard.company.overview.sections.directors');
    expect(wrapper.find('h2').at(3).text()).toBe('dashboard.company.overview.sections.shareholders');
    // expect(wrapper.find('h2').at(4).text()).toBe('dashboard.company.overview.sections.documents');
    expect(wrapper.find(Button).at(0).props().label).toBe('dashboard.company.overview.ctaPrimary');
    expect(wrapper.find(Button).at(1).props().label).toBe('dashboard.company.overview.ctaSecondary');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
