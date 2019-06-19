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

  /**
   * saveTaxAnswers
   * @param {object} solicitor - data object passed to the service, containing:
      * @param {string|null} ownership - ownership of 25% or more response
      * @param {string|null} employ - fewer than 50 employees response
      * @param {string|null} assets - assets of 10 million or less response
      * @param {string|null} turnover - turnover of 10 million or less response
      * @return {Promise} CompanyService.saveTaxAnswers
   */
  saveTaxAnswers = ({ownership, employ, assets, turnover}) => {
    const config = {
      url: `companies/${store.getState().activeCompany}`,
      method: 'put',
      data: {
        ownership,
        employ,
        assets,
        turnover
      }
    };

    return this.doRequest(config);
  }

  /**
   * addCompany
      * @param {boolean} isAddServices - whether the user is adding services or not
      * @return {Promise} CompanyService.addCompany
   */
  addCompany = (isAddServices) => {
    const config = {
      url: `companies`,
      method: 'post',
      data: {
        // isAddServices: isAddServices
      }
    };

    return this.doRequest(config);
  }

}

export default CompanyService;
