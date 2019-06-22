import BaseService from './BaseService';
import store from 'src/state/store';

import { companyUpdate } from 'src/state/actions/activeCompany';

/**
 * PropertyService
 * @param {object} payload - data object passed to the service
 * @param {string} street - street name passed in data object
 * @param {string} city - city passed in data object
 * @param {string} unitNumber - house/flat number passed in data object
 * @param {string} postcode - postcode passed in data object
 * @return {Object} PropertyService
 */
class PropertyService extends BaseService {

  SavePropertyAddress = payload => {
    const config = {
      url: 'companies/1',
      method: 'put',
      data: payload
    };

    return this.doRequest(config, () => {
      store.dispatch(companyUpdate(1, 'property_address', payload));
    });
  }

  SavePurchaseDetails = payload => {
    const config = {
      url: 'companies/1',
      method: 'put',
      data: payload
    };
    //   data: {
    //     'price': data.priceOfProperty,
    //     'new_build': data.newBuild,
    //     'expected_exchange': data.expectedExchange,
    //     'completion_date': data.completionDate,
    //     'deposit_due_date': data.depositDueDate,
    //     'deposit_amount': data.depositAmount,
    //     'exchange_date': data.exchangeDate,
    //     'first_installment_date': data.firstInstallmentDate,
    //     'first_installment': data.firstInstallmentAmount,
    //     'second_installment_date': data.secondInstallmentDate,
    //     'second_installment': data.secondInstallmentAmount
    //   }

    return this.doRequest(config, () => {
      store.dispatch(companyUpdate('1', 'purchase_details', payload));
    });
  }
}

export default PropertyService;
