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

