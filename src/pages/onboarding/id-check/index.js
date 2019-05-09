import React from 'react'
import { useTranslation } from 'react-i18next'

import Layout from 'src/components/Layout/Layout'
import AddPassport from 'src/components/AddProof/Passport/AddPassport'

import './id-check.scss'

/**
 * IdCheck
 * @author Ravin Patel
 * @return {ReactComponent} IdCheck
 */
const IdCheck = () => {
  const [t] = useTranslation();
  return (
    <Layout>
      <div data-test="container-id-check" className="id-check" role="account">
        <h1 className="id-check-title">{ t('onBoarding.idCheck.title') }</h1>
        <AddPassport />
      </div>
    </Layout>
  );
}

export default IdCheck;
