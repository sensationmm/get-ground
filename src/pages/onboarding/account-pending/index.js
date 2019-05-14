
import React from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'

import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import Layout from 'src/components/Layout/Layout'
import ContactUs from 'src/components/ContactUs/ContactUs'
import ImageFull from 'src/components/ImageFull/ImageFull'
import EmailSent from 'src/assets/images/email-sent.svg'

import authService from 'src/services/Auth';
export const AuthService = new authService();

const AccountPending = () => {
  const [t] = useTranslation();

  AuthService.verifyEmail().then((response => {
    if(response.status === 200) {
      navigate('/onboarding/email-verified')
    }
  }));

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

export default AccountPending;
