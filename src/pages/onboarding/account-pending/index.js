
import React from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'

import IntroBox from 'src/components/_layout/IntroBox/IntroBox'
import Layout from 'src/components/Layout/Layout'
import ImageFull from 'src/components/ImageFull/ImageFull'
import Button from 'src/components/_buttons/Button/Button'
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
        <h1>{ t('onBoarding.accountPending.title') }</h1>
        <p>{ t('onBoarding.accountPending.text') }</p>

        <ImageFull src={EmailSent} />

        <IntroBox>{ t('onBoarding.accountPending.introBox') }</IntroBox>

        <Button classes="link small full" data-test="button-redo" label={t('contactUs.title')} onClick={() => navigate('/contact-us')} />

      </div>
    </Layout>
  );
}

export default AccountPending;
