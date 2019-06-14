import {
  SAVE_AUTH,
  DELETE_AUTH
} from 'src/config/constants';

export const saveAuth = (token) => (dispatch) => {
  localStorage.setItem('gg-auth', JSON.stringify({ token: token }));
  dispatch({ type: SAVE_AUTH, token });
};

export const deleteAuth = () => (dispatch) => {
  dispatch({ type: DELETE_AUTH });
};
