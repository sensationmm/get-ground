import BaseService from './BaseService';
import store from 'src/state/store';

import { userLogin } from 'src/state/actions/user';
import { saveAuth } from 'src/state/actions/auth';

import accountService from 'src/services/Account';
export const AccountService = new accountService();
import companyService from 'src/services/Company';
export const CompanyService = new companyService();

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
      const { first_name, middle_name, last_name, email } = response.data.user

      const login_variables = [
        { name: 'First Name', value: first_name },
        { name: 'Middle Name', value: middle_name },
        { name: 'Last Name', value: last_name },
        { name: 'Email', value: email }
      ];

      window.LC_API.set_custom_variables(login_variables);

      setTimeout(function() { // jwt delayed 1 sec for bots
        AccountService.getDocuments();
        CompanyService.getCompanies();
      }, 750);
    });
  };

  /**
   * reset password
   * Authenticates user via api and stores auth token and user object
   * @param {string} email - email address for login
   * @return {Promise} reset password response
   */
  requestResetPassword = (email) => {
    const config = {
      url: '/auth/request_reset_password',
      method: 'post',
      data: {
        'email': email
      }
    };

    return this.doRequest(config);
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

      AccountService.getDocuments();
      CompanyService.getCompanies();
    });
  };

  /**
   * setNewPassword
   * sets new password for user
   * @param {string} password - new password
   * @param {string} token - token passed from reset email
   * @return {Promise} set new password
   */
  setNewPassword = (password, token) => {
    const config = {
      url: 'auth/new_password',
      method: 'post',
      data: {
        'password': password,
        'token': token
      }
    };

    return this.doRequest(config);

  };

  /**
   * verifyEmail
   * Verifies email
   * @param {string} verificationCode - verification code
   * @return {Promise} verify email response
   */
  verifyEmail = (verificationCode) => {
    const config = {
      url: 'users/verify_email',
      method: 'post',
      data: JSON.stringify({'email_verification_code': verificationCode})
    };

    return this.doRequest(config, (response) => {
      store.dispatch(userLogin(response.data.user));
      store.dispatch(saveAuth(response.data.token));

      // const { first_name, middle_name, last_name, email } = response.data.user

      // const login_variables = [
      //   { name: 'First Name', value: first_name },
      //   { name: 'Middle Name', value: middle_name },
      //   { name: 'Last Name', value: last_name },
      //   { name: 'Email', value: email }
      // ];

      // TODO this fails!
      // window.LC_API.set_custom_variables(login_variables);

    });
  };

  /**
   * acceptRoleLogin
   * Login for accept role
   * @param {string} token - accept role token
   * @return {Promise} verify email response
   */
  acceptRoleLogin = (token) => {
    const config = {
      url: 'accept-role/login',
      method: 'post',
      data: JSON.stringify({'token': token})
    };

    return this.doRequest(config, (response) => {
      store.dispatch(userLogin(response.data.user));
      store.dispatch(saveAuth(response.data.token));

      const { first_name, middle_name, last_name, email } = response.data.user

      const login_variables = [
        { name: 'First Name', value: first_name },
        { name: 'Middle Name', value: middle_name },
        { name: 'Last Name', value: last_name },
        { name: 'Email', value: email }
      ];

      window.LC_API.set_custom_variables(login_variables);

    });
  };

  /**
   * acceptSetPassword
   * Login for accept role
   * @param {string} token - accept role token
   * @return {Promise} verify email response
   */
  acceptRoleSetPassword = (token) => {
    const config = {
      url: 'accept-role/set_password',
      method: 'post',
      data: JSON.stringify({'token': token})
    };

    return this.doRequest(config);
  };
}

export default AuthService;
