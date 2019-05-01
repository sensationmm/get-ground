
import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'

import { fetchVerification } from '../services/Verification'
import IntroBox from '../components/_layout/IntroBox/IntroBox';
import Layout from '../components/Layout/Layout'
import ContactUs from '../components/ContactUs/ContactUs'
import ImageFull from '../components/ImageFull/ImageFull'
import EmailSent from '../assets/images/email-sent.svg'

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
      <div data-test="container-account-pending" className="account-pending" role="account">
        <h1>{ t('accountPending.title') }</h1>
        <p>{ t('accountPending.text') }</p>
        
        <ImageFull src={EmailSent} />

        <IntroBox>{ t('accountPending.introBox') }</IntroBox>

        <ContactUs />
      </div>
    </Layout>
  );
}

export default VerifyEmail;
