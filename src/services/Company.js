import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * CompanyService
 * @return {Object} CompanyService
 */
class CompanyService extends BaseService {
  /**
   * saveSolicitor
   * @param {object} solicitor - data object passed to the service, containing:
      * @param {string|null} have_solicitor - have_solicitor response
      * @param {string} need_solicitor - need_solicitor response
      * @param {string} first_name - first_name response
      * @param {string} last_name - last_name response
      * @param {string} email - email response
      * @param {string} phone - phone response
      * @param {boolean} authority - authority response
      * @return {Promise} CompanyService.saveSolicitor
   */
  saveSolicitor = solicitor => {
    const config = {
      url: `companies/${store.getState().activeCompany}`,
      method: 'put',
      data: {
        solicitor: solicitor
      }
    };

    return this.doRequest(config);
  }

  /**
   * saveShareholders
   * @param {array<Object>} shareholders - data array of objects, containing:
      * @param {string} first_name - shareholder first name
      * @param {string} last_name - shareholder last name
      * @param {string} email - shareholder email address
      * @param {string} shares - shareholder shares value
      * @param {bool} is_director - whether shareholder is a director
      * @return {Promise} CompanyService.saveShareholders
   */
  saveShareholders = (shareholders) => {
    const config = {
      url: `companies/${store.getState().activeCompany}`,
      method: 'put',
      data: {
        shareholders: shareholders
      }
    };

    return this.doRequest(config);
  }
}

export default CompanyService;
