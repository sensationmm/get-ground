import {
  COMPANY_UPDATE,
  ADD_COMPANY,
  SET_COMPANIES
} from 'src/config/constants';

export const companyModel = {
  name: '',
  address: { premise: '', street: '', posttown: '', postcode: '' },
  shareholders: [],
  directors: [],
  documents: [],
  bank_account: {
    name: '',
    sort_code: '',
    account_number: '',
    address: { branch: '', street: '', town: '', postcode: '' },
    iban: '',
    balance: '',
    transactions: []
  }
};

export const initialState = [
  {
    id: 1,
    additional_services_required: true,
    property_address:{
      address:{
        premise:'37B',
        street:'Sandringham Road',
        thoroughfare:null,
        posttown:'London',
        postcode:'E8 2LR',
        country_name:'UK'
       },
       is_confirmed:true
    },
    purchase_details:{
       price:{
          amount_in_cents:50000000,
          currency:'GBP'
       },
       is_new_build:null,
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
          },
          {
            type:'first_installment',
            due_date:'2019-09-06T00:00:00Z',
            amount:{
               amount_in_cents:10000000,
               currency:'GBP'
            }
          },
          {
            type:'second_installment',
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
    }
  },
  {
    id: 2,
    additional_services_required: true,
    property_address:{
      address:{
        premise:'37B',
        street:'Sandringham Road',
        thoroughfare:null,
        posttown:'London',
        postcode:'E8 2LR',
        country_name:'UK'
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
            first_name:'martin',
            last_name:'Marriot',
            email:'mark@gmail.com',
            allocated_shares:100,
            is_director:false,
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
    }
  }
];

export const companies = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_COMPANY: 
      return [
        ...state,
        action.company
      ]
      
    case COMPANY_UPDATE:
      return state.map(company => {
        if (company.id === action.companyID) {
          return {
            ...company,
            [action.key]: action.value
          }
        }

        return company;
      });

    case SET_COMPANIES:
      return action.companies

    default:
      return state;
  }
};

