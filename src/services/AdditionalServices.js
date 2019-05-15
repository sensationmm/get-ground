import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * Additional Services
 * @param {Boolean} mortgage - need mortgage
 * @param {Boolean} insurance - need insurance
 * @param {Boolean} management - need management
 * @return {Function} AdditionalServices
 */
class AdditionalServices extends BaseService {
  addServices = (mortgage, insurance, management) => {
    const config = {
      url: `companies/${store.getState().user.id}/services`,
      method: 'post',
      data: {
        additional_services_mortgage: mortgage,
        additional_services_insurance: insurance,
        additional_services_management: management,
      }
    };

    return this.doRequest(config);
  }
}

export default AdditionalServices;
