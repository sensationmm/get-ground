
import React from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Layout from 'src/components/Layout/Layout'
import ImageFull from 'src/components/ImageFull/ImageFull'
import Image from 'src/assets/images/verify-email.svg'

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
      <div data-test="container-account-pending" className="account-pending" role="brochure fullscreen account">
        <img className="hero-image" src={Image} alt="clock" data-test="about-us-img" />
        <div className="">
          <h1>{ t('onBoarding.accountPending.title') }</h1>
          <p data-test="account-pending-content">{ isPasswordReset ? t('forgotPassword.emailPending') :  accountPendingText() }</p>

          <p>{ t('onBoarding.accountPending.introBox') }</p>
        </div>
      </div>
    </Layout>
  );
}

AccountPending.propTypes = {
  location: PropTypes.object
};

export default AccountPending;
