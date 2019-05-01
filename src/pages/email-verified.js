
import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

import Button from '../components/_buttons/Button/Button'
import Layout from '../components/Layout/Layout'
import successImg from '../assets/images/email-verified.png'

import '../styles/pages/email-verified.scss'

const VerifyEmailSucess = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-email-verified" className="email-verified" role="account">
      <img className="email-verified--img" src={successImg} />
        <h1>{t('emailVerified.title')}</h1>
        <p>{t('emailVerified.copy')}</p>
        <Link to="/onboarding">
          <Button label={t('emailVerified.button')} classes="primary" />
        </Link>
      </div>
    </Layout>
  );
}

export default VerifyEmailSucess;
