import { blobToDataURL } from 'blob-util'
import BaseService from './BaseService';
import store from 'src/state/store';

import { saveDocuments, saveSignature } from 'src/state/actions/documents';
import { saveUser } from 'src/state/actions/user';

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
      url: 'v2/users',
      method: 'post',
      data: {
        'email': email,
        'password': password,
        'receives_marketing': receives_marketing
      }
    };

    return this.doRequest(config);
  };

  /**
   * getUser
   * fetches a single user based on id
   * @param {integer} userID - id of user to fetch
   * @return {Promise} getUser response
   */
  getUser = (userID) => {
    const config = {
      url: `v2/users/${userID}`,
      method: 'get'
    };

    return this.doRequest(config, (response) => {
      store.dispatch(saveUser(response.data));
    });
  }

  /**
   * savePersonalDetails
   * saves users personal details
   * @param {object} data - data object for post
   * @return {Promise} savePersonalDetails response
   */
  savePersonalDetails = (data) => {
    const userID = data.userID;
    delete data.userID;

    Object.keys(data).forEach((key) => {
      if(data[key] === '') {
        delete data[key];
      }
    });

    const config = {
      url: `v2/users/${userID}`,
      method: 'put',
      data
    };

    return this.doRequest(config, (response) => {

      const login_variables = [
        { name: 'First Name', value: data.firstName },
        { name: 'Middle Name', value: data.middleName },
        { name: 'Last Name', value: data.lastName },
      ];

      window.LC_API.set_custom_variables(login_variables);

      store.dispatch(saveUser(response.data));
    });
  };

  /**
   * updatePersonalDetails
   * Updates specified keys on the user model
   * @param {object} data - data object for post
   * @return {Promise} updatePersonalDetails response
   */
  updatePersonalDetails = data => {
    const userID = data.userID;
    delete data.userID;

    const config = {
      url: `v2/users/${userID}`,
      method: 'put',
      data
    };

    return this.doRequest(config);
  };

  /**
   * saveSignature
   * saves the users signature
   * @param {Blob} signatureBlob - signature blob
   * @return {Promise} saveSignature response
   */
  saveSignature = signatureBlob => {
    const formData = new FormData();
    const data = {
      'file': signatureBlob,
      'user_id': store.getState().user.id.toString(),
      'description': 'signature'
    }

    for ( const key in data ) {
      formData.append(key, data[key]);
    }

    const config = {
      url: 'v1/documents',
      method: 'post',
      data: formData
    };

    blobToDataURL(signatureBlob).then((res) => {
      store.dispatch(saveSignature(res))
    })

    return this.doRequest(config);
  };

  /**
   * getDocuments
   * Gets documents for current user
   * @return {Promise} getDocuments response
   */
  getDocuments = () => {
    const config = {
      url: `v2/users/${store.getState().user.id}/kyc/files/latest`,
      method: 'get'
    };

    return this.doRequest(config, (response) => {
      store.dispatch(saveDocuments(response.data));
    });
  };

  /**
   * getSignature
   * Gets Users signature
   * @return {Promise} getDocuments response
   */
  getSignature = () => {
    const config = {
      url: `v2/users/${store.getState().user.id}/signature`,
      method: 'get'
    };

    return this.doRequest(config, (response) => {
      const { data: { content } } = response;

      store.dispatch(saveSignature(content))
    });
  };

  /**
   * retrieveInvestedUser
   * Gets User and property info
   * @param {string} token - token passed from email
   * @return {Promise} retrieveInvestedUser response
   */
  retrieveInvestedUser = (token) => {
    const config = {
      url: `v2/property_purchases_users/${token}`,
      method: 'get'
    };

    return this.doRequest(config);
  };

  /**
   * completeOnboarding
   * Marks onboarding process as complete
   * @return {Promise} completeOnboarding response
   */
  completeOnboarding = () => {
    const userID = store.getState().user.id.toString();

    const config = {
      url: `v2/users/${userID}`,
      method: 'put',
      data: {
        last_page_visited: 'dashboard'
      }
    };

    return this.doRequest(config, (response) => {
      store.dispatch(saveUser(response.data));
    });
  };
}

export default AccountService;
