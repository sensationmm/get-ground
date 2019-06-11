import BaseService from './BaseService';
import store from 'src/state/store';

import { saveDocuments } from 'src/state/actions/documents';

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

  /**
   * savePersonalDetails
   * saves users personal details
   * @param {object} data - data object for post
   * @return {Promise} savePersonalDetails response
   */
  savePersonalDetails = data => {
    const config = {
      url: `users/${data.userID}`,
      method: 'put',
      data: {
        'first_name': data.firstName,
        'middle_name': data.middleName,
        'last_name': data.lastName,
        'date_of_birth': data.formattedDate,
        'nationality_name': data.nationalityName,
        'birth_town': data.cityOfBirth,
        'occupation': data.jobTitle,
        'country': data.countryName,
        'street': data.street,
        'posttown': data.city,
        'premise': data.unitNumber,
        'postcode': data.postcode,
        'previous_names': data.previousNames,
        'phone_number': data.phone
      }
    };

    return this.doRequest(config);
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
      url: `users/${userID}`,
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
      url: 'documents',
      method: 'post',
      data: formData
    };

    return this.doRequest(config);
  };

  /**
   * getDocuments
   * Gets documents for current user
   * @return {Promise} getDocuments response
   */
  getDocuments = () => {
    const config = {
      url: `documents`,
      method: 'get'
    };
  
    return this.doRequest(config, (response) => {
      store.dispatch(saveDocuments(response.data.filter(item => item.creator === store.getState().user.id)));
    });
  };
}

export default AccountService;
