import {
  USER_LOGIN
} from 'src/config/constants';

export const userLogin = (user) => (dispatch) => {
  dispatch({ type: USER_LOGIN, user: { ...user } });
};
