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
        'nationality_name': data.nationality,
        'birth_town': data.cityOfBirth,
        'occupation': data.jobTitle,
        'country': data.country,
        'street': data.street,
        'city': data.city,
        'unit_number': data.unitNumber,
        'postcode': data.postcode,
        'previous_names': data.previousNames,
        'phone_number': data.phone
      }
    };

    return this.doRequest(config);
  };
}

export default AccountService;
