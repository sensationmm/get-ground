import { SET_ACTIVE_COMPANY } from 'src/config/constants';

const initialState = null;

export const activeCompany = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_COMPANY:
      return action.companyID;    
    
    default:
      return state;
  }
};
