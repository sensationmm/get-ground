import {
  SET_ACTIVE_COMPANY,
  COMPANY_UPDATE,
  ADD_COMPANY,
  SET_COMPANIES
} from 'src/config/constants';

export const setActiveCompany = (companyID) => {
  return {
  type: SET_ACTIVE_COMPANY,
  companyID
}};

export const addCompany = (company) => ({
  type: ADD_COMPANY,
  company
});

export const companyUpdate = (companyID, key, value) => {
  return {
    type: COMPANY_UPDATE,
    companyID,
    key,
    value
  }
};

export const setCompanies = (companies) => ({
  type: SET_COMPANIES,
  companies
});
