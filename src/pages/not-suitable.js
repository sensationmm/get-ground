
import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

import Button from '../components/_buttons/Button/Button'
import Layout from '../components/Layout/Layout'
import successImg from '../assets/images/email-verified.png'

import '../styles/pages/email-verified.scss'

const NotSuitable = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-not-suitable" className="email-verified" role="account">
      <img className="email-verified--img" src={successImg} />
        <div className="email-verified--title">{t('compliance.notSuitable.title')}</div>
        <div className="email-verified--copy">{t('compliance.notSuitable.text')}</div>
        <Link to="/">
          <Button label={t('compliance.notSuitable.button')} classes="primary" />
        </Link>
      </div>
    </Layout>
  );
}

export default NotSuitable;
