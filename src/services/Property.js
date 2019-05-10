import BaseService from './BaseService';

/**
 * PropertyService
 * @param {object} data - data object passed to the service
 * @param {string} street - street name passed in data object
 * @param {string} city - city passed in data object
 * @param {string} unitnumber - house/flat number passed in data object
 * @param {string} postcode - postcode passed in data object
 * @return {Object} PropertyService
 */
class PropertyService extends BaseService {
  SavePropertyAddress = data => {
    const config = {
      url: `companies`,
      method: 'post',
      data: {
        'property_street': data.street,
        'property_posttown': data.city,
        'property_premise': data.unitNumber,
        'property_postcode': data.postcode
      }
    };

    return this.doRequest(config);
  }
}

export default PropertyService;
