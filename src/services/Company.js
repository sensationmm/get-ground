import BaseService from './BaseService';
import store from 'src/state/store';

import { companyUpdate } from 'src/state/actions/activeCompany';

/**
 * CompanyService
 * @return {Object} CompanyService
 */
class CompanyService extends BaseService {
  /**
    * addCompany
    * @param {boolean} isAddServices - whether the user is adding services or not
    * @return {Promise} CompanyService.addCompany
   */
  addCompany = (isAddServices) => {
    const config = {
      url: `property_purchases`,
      method: 'post',
      data: {
        additional_services_required: isAddServices
      }
    };

    return this.doRequest(config);
  }

  getCompanies = () => {
    const config = {
      url: `/users/${store.getState().user.id}/companies`,
      method: 'get'
    };

    return this.doRequest(config);
  }

  /**
    * updateCompany
    * @param {object} payload - object to be sent in the request
    * @param {string} key - object key to update in state
    * @param {number} companyId - id of current company
    * @return {Promise} CompanyService.addCompany
   */
  updateCompany = (payload, key, companyId) => {
    const config = {
      url: `property_purchases/${companyId}`,
      method: 'put',
      data: payload
    };

    return this.doRequest(config, () => {
      store.dispatch(companyUpdate(companyId, key, payload));
    });
  }
}

export default CompanyService;
