import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * Additional Services
 * @param {Boolean} mortgage - need mortgage
 * @param {Boolean} insurance - need insurance
 * @param {Boolean} management - need management
 * @param {Boolean} solicitor - need solicitor
 * @return {Function} AdditionalServices
 */
class AdditionalServices extends BaseService {
  addServices = (mortgage, insurance, management, solicitor) => {
    const config = {
      url: `companies/${store.getState().user.id}/services`,
      method: 'put',
      data: {
        services: {
          mortgage,
          insurance,
          management,
          solicitor
        }
      }
    };

    return this.doRequest(config);
  }
}

export default AdditionalServices;
