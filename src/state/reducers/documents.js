import {
  SAVE_DOCUMENTS,
  SAVE_SIGNATURE
} from 'src/config/constants';

export const initialState = {};

export const documents = (state = initialState, action={}) => {
  switch (action.type) {
    case SAVE_DOCUMENTS:
      return {...state, ...action.documents};
    case SAVE_SIGNATURE:
      return {...state, file_signature: action.signature};

    default:
      return state;
  }
};
