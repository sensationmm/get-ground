import BaseService from './BaseService';

/**
 * CompanyService
 * @param {object} solicitor - data object passed to the service, containing:
    * @param {string|null} have_solicitor - have_solicitor response
    * @param {string} need_solicitor - need_solicitor response
    * @param {string} first_name - first_name response
    * @param {string} last_name - last_name response
    * @param {string} email - email response
    * @param {string} phone - phone response
    * @param {boolean} authority - authority response
    * 
 * @return {Object} PropertyService
 */
class CompanyService extends BaseService {
  saveSolicitor = solicitor => {
    const config = {
      url: `companies`,
      method: 'put',
      data: {
        solicitor: solicitor
      }
    };

    return this.doRequest(config);
  }
}

export default CompanyService;
