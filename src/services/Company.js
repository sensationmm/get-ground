import BaseService from './BaseService';
import store from 'src/state/store';

import { companyUpdate, setCompanies } from 'src/state/actions/activeCompany';

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
      url: `v1/property_purchases`,
      method: 'post',
      data: {
        additional_services_required: isAddServices
      }
    };

    return this.doRequest(config);
  }

  getCompanies = () => {
    const config = {
      url: `v1/property_purchases?creator_id=${store.getState().user.id}`,
      method: 'get'
    };

    return this.doRequest(config, (response) => {
      store.dispatch(setCompanies(response.data));
    });
  }

  /**
    * getCompany
    * @param {number} id - id of the company
    * @return {Promise} CompanyService.getCompany
   */
  getCompany = id => {
    const config = {
      url: `v1/property_purchases/${id}`,
      method: 'get'
    };

    return this.doRequest(config, (response) => {
      const { data: { id, progress }} = response;
      store.dispatch(companyUpdate(id, 'progress', progress));
    });
  };

  /**
    * updateCompany
    * @param {object} payload - object to be sent in the request
    * @param {string} key - object key to update in state
    * @param {number} companyId - id of current company
    * @return {Promise} CompanyService.updateCompany
   */
  updateCompany = (payload, key, companyId) => {
    const config = {
      url: `v1/property_purchases/${companyId}`,
      method: 'put',
      data: {
        [key]: payload
      }
    };

    return this.doRequest(config, () => {
      store.dispatch(companyUpdate(companyId, key, payload));
    });
  }

  /**
    * confirmCompany
    * @param {number} companyId - id of the company
    * @return {Promise} CompanyService.confirmCompany
   */
  confirmCompany = (companyId) => {
    const config = {
      url: `v1/property_purchases/${companyId}/confirm`,
      method: 'put',
      data: {}
    };

    return this.doRequest(config);
  }
}

export default CompanyService;
