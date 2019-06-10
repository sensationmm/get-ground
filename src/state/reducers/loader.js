import {
  SHOW_LOADER,
  HIDE_LOADER,
} from '../../config/constants';

export const initialState = {
  isLoading: true
};

export const loader = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return initialState;

    case HIDE_LOADER:
      return {
        ...initialState,
        isLoading: false,
      }

    default:
      return state;
  }
};
