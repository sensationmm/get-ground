import { dataURLToBlob } from 'blob-util'
import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * KYCService
 * @param {Image} passport - Image of passport
 * @param {Image} address - Image of address
 * @param {Blob} selfie - Blob of selfie
 * @return {Object} KYCService
 */
class KYCService extends BaseService {
  makeCheck = (passport, address, selfie) => {
    const blobPassport = passport !== '' ? dataURLToBlob(passport) : null
    const blobAddress = address !== '' ? dataURLToBlob(address) : null;
    const blobSelfie = selfie !== '' ? dataURLToBlob(selfie) : null;

    const fd = new FormData();
    const passportFile = blobPassport !== null ? new File( [blobPassport], 'passport.jpg', { type: 'image/jpeg' } ) : null;
    const addressFile = blobAddress !== null ? new File( [blobAddress], 'passport.jpg', { type: 'image/jpeg' } ) : null;
    const selfieFile = blobSelfie !== null ? new File( [blobSelfie], 'passport.jpg', { type: 'image/jpeg' } ) : null;

    fd.append('file_passport', passportFile)
    fd.append('file_selfie', selfieFile)
    fd.append('file_proof_of_address', addressFile)

    const config = {
      url: `v2/users/${store.getState().user.id}/kyc/files`,
      method: 'post',
      data: fd,
    };

    return this.doRequest(config);
  }
}

export default KYCService;
