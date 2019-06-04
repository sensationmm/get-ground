import {
  SET_ACTIVE_COMPANY
} from 'src/config/constants';

export const setActiveCompany = (companyID) => ({
  type: SET_ACTIVE_COMPANY,
  companyID
})
