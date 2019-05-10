import {
  SET_PASSPORT,
  SET_ADDRESS,
  SET_SELFIE
} from 'src/config/constants';

export const initialState = {
  passport: '',
  address: '',
  selfie: ''
};

export const idCheck = (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSPORT:
      return { ...state, passport: action.img };
    case SET_ADDRESS:
      return { ...state, address: action.img };
    case SET_SELFIE:
      return { ...state, selfie: action.img };

    default:
      return state;
  }
};
