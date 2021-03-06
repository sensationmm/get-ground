import {
  SAVE_AUTH,
  DELETE_AUTH,
  DELETE_USER
} from 'src/config/constants';

const initialState = {
  token: null
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_AUTH:
      return { ...state, token: action.token };

    case DELETE_USER:
    case DELETE_AUTH:
      return { token: null };

    default:
      return state;
  }
};
