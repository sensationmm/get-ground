
import React from 'react'
import { useTranslation } from 'react-i18next'

import IntroBox from '../components/_layout/IntroBox/IntroBox';
import Layout from '../components/Layout/Layout'
import ImageFull from '../components/ImageFull/ImageFull'
import addPassport from '../assets/images/add-passport.svg'

const IdCheck = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-account-pending" className="account-pending" role="account">
        <h1>{ t('onBoarding.idCheck.title') }</h1>
        <IntroBox>{ t('onBoarding.idCheck.passport.title') }</IntroBox>
        <p>{ t('onBoarding.idCheck.passport.content') }</p>

        <ImageFull src={addPassport} alt="add-passport" />
      </div>
    </Layout>
  );
}

export default IdCheck;
