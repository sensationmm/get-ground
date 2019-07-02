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

// export const initialState = [
//   {
//     "id":1,
//     "property_address": {
//       "address": {
//         "premise":null,
//         "street":null,
//         "thoroughfare":null,
//         "posttown":null,
//         "postcode":null,
//         "country_name":null
//       },"is_confirmed":null
//     },
//     "purchase_details":{
//       "price":{
//         "amount_in_cents":null,
//         "currency":null
//       },
//       "is_new_build":null,
//       "completion_date":null,
//       "expected_exchange_date":null,
//       "payment_schedule":null
//     },
//     "shareholder_details":{
//       "collection":null
//     },
//     "tax_questions":{
//       "is_owner_of_other_companies":null,
//       "more_than_50_employees":null,
//       "assets_less_than_10m":null,
//       "turnover_less_than_10m":null
//     },
//     "additional_services":{
//       "mortgage":null,
//       "insurance":null,
//       "management":null,
//       "solicitor":null
//     },
//     "additional_services_required":true,
//     "solicitor_details":{
//       "first_name":null,
//       "last_name":null,
//       "email":null,
//       "phone_number":null,
//       "permission":null
//     },
//     "progress":{
//       "property_address_status":"",
//       "purchase_details_status":"",
//       "shareholder_details_status":"",
//       "tax_questions_status":"",
//       "payment_status":"",
//       "overall_status":""
//     },
//     bank_account: {
//       name: 'Daniel Hecker',
//       sort_code: '10-75-99',
//       account_number: '9837 4831',
//       address: {
//         branch: 'Barclays Bank PLC',
//         street: '1 Churchill Place',
//         town: 'London',
//         postcode: 'E14 5HP'
//       },
//       iban: 'DE27100777-770209299700',
//       balance: '£483,293.62',
//       transactions: [
//         {
//           date: '2019-04-30',
//           name: 'Smith Plumbers Ltd',
//           sum: '-£200',
//           balance: '£483,293.62'
//         },
//         {
//           date: '2019-04-30',
//           name: 'J Jones Rent',
//           sum: '+£1,200',
//           balance: '£483,293.62'
//         },
//         {
//           date: '2019-04-30',
//           name: 'J Jones Rent',
//           sum: '+£1,200',
//           balance: '£483,293.62'
//         },
//         {
//           date: '2019-04-13',
//           name: 'Smith Plumbers Ltd',
//           sum: '-£200',
//           balance: '£483,293.62'
//         },
//         {
//           date: '2019-04-13',
//           name: 'J Jones Rent',
//           sum: '+£1,200',
//           balance: '£483,293.62'
//         }
//       ]
//     }
//   }
// ];

export const initialState = [];

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

