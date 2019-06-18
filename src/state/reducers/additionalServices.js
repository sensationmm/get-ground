import {
  SET_ADDITIONAL_SERVICES
} from 'src/config/constants';

export const initialState = {
  mortgage: false,
  insurance: false,
  management: false,
  solicitor: false
};

export const additionalServices = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDITIONAL_SERVICES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
