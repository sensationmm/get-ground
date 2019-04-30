
import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'

import { fetchVerification } from '../services/Verification'
import IntroBox from '../components/_layout/IntroBox/IntroBox';
import Layout from '../components/layout/layout'
import ContactUs from '../components/ContactUs/ContactUs'
import PhoneImg from '../assets/images/account-pending.png'
import '../styles/pages/account-pending.scss'

const VerifyEmail = () => {
  const [t] = useTranslation();

  useEffect(() => {
    fetchVerification().then((status => {
      if(status === 200) {
        navigate('/email-verified')
      }
    }))
  });

  return (
    <Layout>
      <div data-test="container-account-pending" className="account-pending">
        <div className="account-pending--title">{t('accountPending.title')}</div>
        <div className="account-pending--copy">{t('accountPending.text')}</div>
        <img className="account-pending--img" src={PhoneImg} />
        <IntroBox>{ t('accountPending.introBox') }</IntroBox>
        <ContactUs />
      </div>
    </Layout>
  );
}

export default VerifyEmail;
