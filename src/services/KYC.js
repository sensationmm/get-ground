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
    const config = {
      url: `users/${store.getState().user.id}/kyc`,
      method: 'post',
      data: {
        'file_selfie': selfie,
        'file_passport': passport,
        'file_proof_of_address': address
      }
    };

    return this.doRequest(config);
  }
}

export default KYCService;
