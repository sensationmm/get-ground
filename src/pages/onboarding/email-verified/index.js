
import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

import Button from 'src/components/_buttons/Button/Button'
import Layout from 'src/components/Layout/Layout'
import successImg from 'src/assets/images/email-verified.png'

import 'src/styles/pages/email-verified.scss'

const VerifyEmailSucess = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-email-verified" className="email-verified" role="account">
      <img className="email-verified--img" src={successImg} />
        <h1>{t('onBoarding.emailVerified.title')}</h1>
        <p>{t('onBoarding.emailVerified.copy')}</p>
        <Link to="/onboarding">
          <Button label={t('onBoarding.emailVerified.button')} classes="primary" />
        </Link>
      </div>
    </Layout>
  );
}

export default VerifyEmailSucess;
