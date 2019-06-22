import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * Additional Services
 * @param {object} payload - payload for the request
 * @return {Function} AdditionalServices
 */
class AdditionalServices extends BaseService {
  addServices = payload => {
    const config = {
      url: `companies/${store.getState().user.id}/services`,
      method: 'put',
      data: payload
    };

    return this.doRequest(config);
  }
}

export default AdditionalServices;
