import {
  SAVE_DOCUMENTS
} from 'src/config/constants';

export const initialState = [];

export const documents = (state = initialState, action={}) => {
  switch (action.type) {
    case SAVE_DOCUMENTS:
      return action.documents;

    default:
      return state;
  }
};
