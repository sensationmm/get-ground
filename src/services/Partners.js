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
  sendEmail = (email) => {
    const config = {
      url: '/partners/know_more_email',
      method: 'post',
      data: {
        'email': email
      }
    };

    return this.doRequest(config)
  };
}

export default PartnersService;
