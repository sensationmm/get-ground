import {
  SAVE_USER,
  USER_LOGIN,
  USER_UPDATE,
  DELETE_USER
} from 'src/config/constants';

export const userLogin = (user) => (dispatch) => {
  dispatch({ type: USER_LOGIN, user: { ...user } });
};

export const userUpdate = (key, value) => (dispatch) => {
  dispatch({ type: USER_UPDATE, key, value });
};

export const deleteUser = () => (dispatch) => {
  dispatch({ type: DELETE_USER });
};

export const saveUser = (user) => (dispatch) => {
  dispatch({ type: SAVE_USER, user });
}
