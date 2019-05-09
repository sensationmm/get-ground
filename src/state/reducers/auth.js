import {
  SAVE_AUTH
} from 'src/config/constants';

const initialState = {
  token: null
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_AUTH:
      return { token: action.token };

    default:
      return state;
  }
};
