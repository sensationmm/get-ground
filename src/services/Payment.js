import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * PaymentService
 * @param {string} stripeToken - Stripe service auth token
 * @param {integer} numberOfCompanies - number of companies payment taken for
 * @return {Object} PaymentService
 */
class PaymentService extends BaseService {
  makePayment = (stripeToken, numberOfCompanies) => {
    const config = {
      url: `users/${store.getState().user.id}/payment`,
      method: 'post',
      data: {
        'stripe_token': stripeToken,
        'quantity': numberOfCompanies
      }
    };

    return this.doRequest(config);
  }
}

export default PaymentService;
