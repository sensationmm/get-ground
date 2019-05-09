import BaseService from './BaseService';
import store from 'src/state/store';

import { userLogin } from 'src/state/actions/user';
import { saveAuth } from 'src/state/actions/auth';

/**
 * AuthService
 * @return {Object} AuthService
 */
class AuthService extends BaseService {
  /**
   * login
   * Authenticates user via api and stores auth token and user object
   * @param {string} email - email address for login
   * @param {string} password - password for login
   * @return {Promise} login response
   */
  login = (email, password) => {
    const config = {
      url: 'auth',
      method: 'post',
      data: {
        'email': email,
        'password': password
      }
    };

    return this.doRequest(config, (response) => {
      store.dispatch(userLogin(response.data.user));
      store.dispatch(saveAuth(response.data.token));
    });
  };

  /**
   * reauthenticate
   * Refetch user with existing JWT in localStorage
   * @return {Promise} reauthenticate response
   */
  reauthenticate = () => {
    const config = {
      url: 'auth_reset',
      method: 'post'
    };

    return this.doRequest(config, (response) => {
      store.dispatch(userLogin(response.data.user));
      store.dispatch(saveAuth(response.data.token));
    });
  };

  verifyEmail = () => {
    const config = {
      url: 'users/verify_email',
      method: 'post',
      data: JSON.stringify({'email_verification_code': 'string'})
    };

    return this.doRequest(config, (response) => {
      store.dispatch(userLogin(response.data.user));
      store.dispatch(saveAuth(response.data.token));
    });
  };
}

export default AuthService;
