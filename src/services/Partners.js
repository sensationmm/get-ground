import BaseService from './BaseService';

/**
 * PartnersService
 * @return {Object} PartnersService
 */
class PartnersService extends BaseService {
  /**
   * knowMoreEmail
   * User sends their email to subscribe to list
   * @param {string} email - email address for login
   * @return {Object} Add Email
   */

   //TODO: this is low priority and updated last in v2
  sendEmail = (email) => {
    const config = {
      url: 'v2/partners/know_more_email',
      method: 'post',
      data: {
        'email': email
      }
    };

    return this.doRequest(config)
  };
}

export default PartnersService;
