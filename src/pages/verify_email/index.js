
import React from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import IntroBox from 'src/components/_layout/IntroBox/IntroBox'
import Layout from 'src/components/Layout/Layout'
import ImageFull from 'src/components/ImageFull/ImageFull'
import EmailSent from 'src/assets/images/email-sent.svg'

import authService from 'src/services/Auth';
export const AuthService = new authService();

const AccountPending = ({ location }) => {
  const [t] = useTranslation();
  const isPasswordReset = location.state && location.state.passwordReset;
  const verificationCode = queryString.parse(location.search).email_verification_code;
  const email = location.state && location.state.email

  if (!isPasswordReset && verificationCode) {
    AuthService.verifyEmail(verificationCode).then((response => {
      if(!response.data.error) {
        navigate('/onboarding/email-verified');
      } else {
        navigate('/login');
      }
    }));
  }

  const accountPendingText = () => {
    return `${t('onBoarding.accountPending.initialText')} ${email}. ${t('onBoarding.accountPending.text')}`
  }

  return (
    <Layout>
      <div data-test="container-account-pending" className="account-pending" role="account">
        <h1>{ t('onBoarding.accountPending.title') }</h1>
        <p data-test="account-pending-content">{ isPasswordReset ? t('forgotPassword.emailPending') :  accountPendingText() }</p>

        <ImageFull src={EmailSent} />

        <IntroBox>{ t('onBoarding.accountPending.introBox') }</IntroBox>

      </div>
    </Layout>
  );
}

AccountPending.propTypes = {
  location: PropTypes.object
};

export default AccountPending;
