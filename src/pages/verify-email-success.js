
import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

import Button from '../components/_buttons/Button/Button'
import Layout from '../components/layout/layout'
import successImg from '../assets/images/verify-email.png'

import '../styles/pages/verify-email.scss'

const VerifyEmailSucess = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-verify-email" className="verify-email">
      <img className="verify-email-success--img" src={successImg} />
        <div className="verify-email-success--title">{t('onBoarding.verifyEmail.success.title')}</div>
        <div className="verify-email-success--copy">{t('onBoarding.verifyEmail.success.copy')}</div>
        <Link to="/onboarding">
          <Button label={t('onBoarding.verifyEmail.button1')} classes="primary" />
        </Link>
      </div>
    </Layout>
  );
}

export default VerifyEmailSucess;
