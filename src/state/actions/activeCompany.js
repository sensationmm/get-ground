import {
  SET_ACTIVE_COMPANY,
  COMPANY_UPDATE,
  ADD_COMPANY
} from 'src/config/constants';

export const setActiveCompany = (companyID) => ({
  type: SET_ACTIVE_COMPANY,
  companyID
});

export const addCompany = (response) => ({
  type: ADD_COMPANY,
  response
});

export const companyUpdate = (companyID, key, value) => {
  return {
    type: COMPANY_UPDATE, 
    companyID,
    key,
    value
  }
};
