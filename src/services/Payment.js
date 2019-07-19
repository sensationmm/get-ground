import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * PaymentService
 * @param {string} stripeToken - Stripe service auth token
 * @param {integer} numberOfCompanies - number of companies payment taken for
 * @param {integer} companyID - id of company
 * @return {Object} PaymentService
 */
class PaymentService extends BaseService {
  makePayment = (stripeToken, numberOfCompanies, companyID) => {
    const config = {
      url: `v2/users/${store.getState().user.id}/payment`,
      method: 'post',
      data: {
        'stripe_token': stripeToken,
        'quantity': numberOfCompanies,
        'property_purchase_id': companyID.toString()
      }
    };

    return this.doRequest(config);
  }
}

export default PaymentService;
