import {
  SAVE_DOCUMENTS
} from 'src/config/constants';

export const saveDocuments = (documents) => ({
  type: SAVE_DOCUMENTS,
  documents
});
