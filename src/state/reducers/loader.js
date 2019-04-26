import {
  SHOW_LOADER,
  HIDE_LOADER,
} from '../../config/constants';

const initialState = {
  isLoading: false
};

export const loader = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...initialState,
        isLoading: true,
      };

    case HIDE_LOADER:
      return initialState;

    default:
      return state;
  }
};
