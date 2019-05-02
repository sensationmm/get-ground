import {
  SHOW_MODAL,
  HIDE_MODAL,
} from 'src/config/constants';

export const showModal = () => (dispatch) => {
  dispatch({ type: SHOW_MODAL });
}

export const hideModal = () => (dispatch) => {
  dispatch({ type: HIDE_MODAL });
}
