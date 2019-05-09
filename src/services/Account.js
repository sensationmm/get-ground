import BaseService from './BaseService';

/**
 * AccountService
 * @return {Object} AccountService
 */
class AccountService extends BaseService {
  /**
   * createAccount
   * Creates user account
   * @param {string} email - email address of new account
   * @param {string} password - password of new account
   * @param {boolean} receives_marketing - marketing opt in
   * @return {Promise} login response
   */
  createAccount = (email, password, receives_marketing) => {
    const config = {
      url: 'users',
      method: 'post',
      data: {
        'email': email,
        'password': password,
        'receives_marketing': receives_marketing
      }
    };

    return this.doRequest(config);
  };
}

export default AccountService;
