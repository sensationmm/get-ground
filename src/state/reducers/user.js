import {
  SAVE_USER,
  USER_LOGIN,
  USER_UPDATE
} from 'src/config/constants';

export const initialState = {
  id: null
};

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USER:
    case USER_LOGIN:
      return action.user;

    case USER_UPDATE:
      return {
        ...state,
        [action.key]: action.value
      }

    default:
      return state;
  }
};
