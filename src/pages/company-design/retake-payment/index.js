import React from 'react';

import Layout from 'src/components/Layout/Layout'

const RetakePayment = () => {
  return (
    <Layout secure redirect='company-design/payment?retakePayment=true'>
      <div role="form-page"></div>
    </Layout>
  );
}

export default RetakePayment;
