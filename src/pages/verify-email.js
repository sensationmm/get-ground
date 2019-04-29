
import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'

import { fetchVerification } from '../services/Verification'
import Layout from '../components/layout/layout'
import ContactUs from '../components/ContactUs/ContactUs'
import PhoneImg from '../assets/images/verify-email.png'
import '../styles/pages/verify-email.scss'

const VerifyEmail = () => {
  const [t] = useTranslation();

  useEffect(() => {
    fetchVerification().then((status => {
      if(status === 200) {
        navigate('/verify-email-success')
      }
    }))
  });

  return (
    <Layout>
      <div data-test="container-verify-email" className="verify-email">
        <div className="verify-email--title">{t('onBoarding.verifyEmail.initialLanding.title')}</div>
        <div className="verify-email--copy">{t('onBoarding.verifyEmail.initialLanding.copy')}</div>
        <img className="verify-email--img" src={PhoneImg} />
        <div className="verify-email--info">{t('onBoarding.verifyEmail.initialLanding.info')}</div>
        <ContactUs />
      </div>
    </Layout>
  );
}

export default VerifyEmail;
