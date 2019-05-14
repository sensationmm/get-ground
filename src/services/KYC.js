import querystring from 'querystring'
import qs from 'qs'
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
  makeCheck = (fd) => {
    const config = {
      url: `users/${store.getState().user.id}/kyc`,
      method: 'post',
      data: fd,
    };

    return this.doRequest(config);
  }
}

export default KYCService;
