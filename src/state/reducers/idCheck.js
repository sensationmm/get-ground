import {
  SET_PASSPORT,
  SET_ADDRESS,
  SET_SELFIE,
  ACTIVE_PASSPORT,
  ACTIVE_ADDRESS,
  ACTIVE_SELFIE,
  ACTIVE_RESET,
  SET_RETAKE_PASSPORT,
  SET_RETAKE_ADDRESS,
  SET_RETAKE_SELFIE
} from 'src/config/constants';

export const initialState = {
  active: '',
  passport: { img: '', retake: false},
  address: { img: '', retake: false},
  selfie: { img: '', retake: false}
};

export const idCheck = (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSPORT:
      return { ...state, passport: { img: action.img } };
    case SET_ADDRESS:
      return { ...state, address: { img: action.img } };
    case SET_SELFIE:
      return { ...state, selfie: { img: action.img } };
      case ACTIVE_PASSPORT:
        return { ...state, active: 'passport' };
      case ACTIVE_ADDRESS:
        return { ...state, active: 'address' };
      case ACTIVE_SELFIE:
        return { ...state, active: 'selfie' };
      case ACTIVE_RESET:
      return { ...state, active: '' };
      case SET_RETAKE_PASSPORT:
      return {
        ...state,
        passport: {
          ...state.passport,
          retake: action.payload
        }
      };
      case SET_RETAKE_ADDRESS:
      return {
        ...state,
        address: {
          ...state.address,
          retake: action.payload
        }
      };
      case SET_RETAKE_SELFIE:
      return {
        ...state,
        selfie: {
          ...state.selfie,
          retake: action.payload
        }
      };
    default:
      return state;
  }
};
