import { dataURLToBlob } from 'blob-util'
import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * PaymentService
 * @param {Image} passport - Image of passport
 * @param {Image} address - Image of address
 * @param {Blob} selfie - Blob of selfie
 * @return {Object} PaymentService
 */
class KYCService extends BaseService {
  makeCheck = (passport, address, selfie) => {
    const blobPassport = passport ? dataURLToBlob(passport) : null
    const blobAddress = address ? dataURLToBlob(address) : null;
    const blobSelfie = selfie ? dataURLToBlob(selfie) : null;

    const fd = new FormData();
    const passportFile = new File( [blobPassport], 'passport.jpg', { type: 'image/jpeg' } )
    const addressFile = new File( [blobAddress], 'passport.jpg', { type: 'image/jpeg' } )
    const selfieFile = new File( [blobSelfie], 'passport.jpg', { type: 'image/jpeg' } )

    fd.append('file_passport', passportFile)
    fd.append('file_selfie', addressFile)
    fd.append('file_proof_of_address', selfieFile)

    const config = {
      url: `users/${store.getState().user.id}/kyc/files`,
      method: 'post',
      data: fd,
    };

    return this.doRequest(config);
  }
}

export default KYCService;
