import {
  SET_ADDITIONAL_SERVICES
} from 'src/config/constants';

const initialState = {
  mortgage: false,
  insurance: false,
  management: false
};

export const additionalServices = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDITIONAL_SERVICES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
