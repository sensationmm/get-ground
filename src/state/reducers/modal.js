import {
  SHOW_MODAL,
  HIDE_MODAL,
} from '../../config/constants';

const initialState = {
  isOpen: false
};

export const modal = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...initialState,
        isOpen: true,
      };

    case HIDE_MODAL:
      return initialState;

    default:
      return state;
  }
};
