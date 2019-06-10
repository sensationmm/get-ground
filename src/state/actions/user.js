import {
  USER_LOGIN,
  USER_UPDATE
} from 'src/config/constants';

export const userLogin = (user) => (dispatch) => {
  dispatch({ type: USER_LOGIN, user: { ...user } });
};


export const userUpdate = (key, value) => (dispatch) => {
  dispatch({ type: USER_UPDATE, key, value });
};
