import {
  SHOW_MENU,
  HIDE_MENU,
} from 'src/config/constants';

export const showMenu = () => (dispatch) => {
  dispatch({ type: SHOW_MENU });
}

export const hideMenu = () => (dispatch) => {
  dispatch({ type: HIDE_MENU });
}
