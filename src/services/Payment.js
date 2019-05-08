import { API } from 'src/config/endpoints';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjk1LCJSb2xlIjoiIiwiZXhwIjoxNTU3MzE4MjU0LCJuYmYiOjE1NTczMTQ2NTV9.w-ItUrsFrrJ2OxBVQEhfTeTg06WPIBlVbbSeCI2RvRM';

export const makePayment = async (stripeToken, numberOfCompanies) => (
  await fetch(`${API}/users/95/payment`, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      'stripe_token': stripeToken,
      'quantity': numberOfCompanies
    }),
  })
  .then(response => response.json())
  .then(data => {
    return data;
  })
);

const PaymentServices = {
  makePayment
};

export default PaymentServices;
