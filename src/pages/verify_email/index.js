
import React from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Layout from 'src/components/Layout/Layout'
import TextImage from 'src/components/_layout/TextImage/TextImage'
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
      if(response.status === 200) {
        navigate('/onboarding/email-verified');
      } else {
        navigate('/login');
      }
    }));
  }

  const accountPendingText = () => {
    return `<p>${t('onBoarding.accountPending.initialText')} ${email}. ${t('onBoarding.accountPending.text')}</p>`
  }

  return (
    <Layout>
      <div data-test="container-account-pending" role="fullscreen account hasCurve">

        <TextImage
          title={t('onBoarding.accountPending.title')}
          image={Image}
          text={isPasswordReset ? <p>{t('forgotPassword.emailPending')}</p> :  accountPendingText()}
        />
      </div>
    </Layout>
  );
}

AccountPending.propTypes = {
  location: PropTypes.object
};

export default AccountPending;
