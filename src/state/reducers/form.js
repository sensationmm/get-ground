import {
  INIT_FORM,
  CLEAR_FORM,
  UPDATE_FORM,
  SET_ERRORS
} from '../../config/constants';

export const initialState = {
  values: {},
  errors: {},
  showErrorMessage: false
};

export const form = (state = initialState, action) => {
  switch (action.type) {
    case INIT_FORM:
      return action.payload;

    case UPDATE_FORM:
      return {
        ...state,
        values: {
          ...state.values,
          [action.key]: action.value
        }
      };
    
    case SET_ERRORS:
      return {
        ...state,
        errors: action.errorsList,
        showErrorMessage: action.showErrorMessage
      };
    
    case CLEAR_FORM:
      return initialState;
      
    default:
      return state;
  }
};
