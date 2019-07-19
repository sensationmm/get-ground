import {
  SAVE_DOCUMENTS,
  SAVE_SIGNATURE
} from 'src/config/constants';

export const saveDocuments = (documents) => ({
  type: SAVE_DOCUMENTS,
  documents
});

export const saveSignature = (signature) => ({
  type: SAVE_SIGNATURE,
  signature
});
