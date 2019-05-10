import React from 'react';

import Layout from 'src/components/Layout/Layout'

const RetakePayment = () => {
  return (
    <Layout secure redirect='onboarding/payment?retakePayment=true'>
      <div></div>
    </Layout>
  );
}

export default RetakePayment;
