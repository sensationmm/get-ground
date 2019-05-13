
import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

import Button from 'src/components/_buttons/Button/Button'
import Layout from 'src/components/Layout/Layout'
/* TODO: replace this when I have the proper svg from design */
import successImg from 'src/assets/images/email-verified.png'
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';

import './company-complete.scss'

const VerifyEmailSucess = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-company-complete" className="company-complete">
      <img className="company-complete--image" src={successImg} />
        <h1 className="company-complete--heading">{t('companyDesign.companyComplete.title')}</h1>
        <p className="company-complete--copy">{t('companyDesign.companyComplete.copy')}</p>
        <IntroBox>{ t('companyDesign.companyComplete.info') }</IntroBox>
        <Link to="/company-design/process-tracker">
          <Button label={t('companyDesign.companyComplete.button')} classes="primary full" />
        </Link>
      </div>
    </Layout>
  );
}

export default VerifyEmailSucess;
