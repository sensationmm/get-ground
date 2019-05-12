import {
  SET_PASSPORT,
  SET_ADDRESS,
  SET_SELFIE,
  ACTIVE_PASSPORT,
  ACTIVE_ADDRESS,
  ACTIVE_SELFIE,
  ACTIVE_RESET
} from 'src/config/constants';

export const initialState = {
  active: '',
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
      case ACTIVE_PASSPORT:
        return { ...state, active: 'passport' };
      case ACTIVE_ADDRESS:
        return { ...state, active: 'address' };
      case ACTIVE_SELFIE:
        return { ...state, active: 'selfie' };
        case ACTIVE_RESET:
        return { ...state, active: '' };

    default:
      return state;
  }
};
