import {
  SHOW_MENU,
  HIDE_MENU,
} from 'src/config/constants';

const initialState = {
  isOpen: false
};

export const menu = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MENU:
      return {
        ...initialState,
        isOpen: true,
      };

    case HIDE_MENU:
      return initialState;

    default:
      return state;
  }
};
