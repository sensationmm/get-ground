import {
  USER_LOGIN
} from 'src/config/constants';

const initialState = {
  id: null
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.user;

    default:
      return state;
  }
};
