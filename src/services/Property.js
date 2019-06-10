import BaseService from './BaseService';

/**
 * PropertyService
 * @param {object} data - data object passed to the service
 * @param {string} street - street name passed in data object
 * @param {string} city - city passed in data object
 * @param {string} unitNumber - house/flat number passed in data object
 * @param {string} postcode - postcode passed in data object
 * @return {Object} PropertyService
 */
class PropertyService extends BaseService {

  SavePropertyAddress = data => {
    const config = {
      url: 'companies',
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

  SavePurchaseDetails = data => {
    const config = {
      url: 'companies/1',
      method: 'put',
      data: {
        'price': data.priceOfProperty,
        'new_build': data.newBuild,
        'expected_exchange': data.expectedExchange,
        'completion_date': data.completionDate,
        'deposit_due_date': data.depositDueDate,
        'deposit_amount': data.depositAmount,
        'exchange_date': data.exchangeDate,
        'first_installment_date': data.firstInstallmentDate,
        'first_installment': data.firstInstallmentAmount,
        'second_installment_date': data.secondInstallmentDate,
        'second_installment': data.secondInstallmentAmount
      }
    };

    return this.doRequest(config);
  }
}

export default PropertyService;
