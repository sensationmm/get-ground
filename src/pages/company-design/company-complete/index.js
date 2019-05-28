
import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import Button from 'src/components/_buttons/Button/Button';
import Layout from 'src/components/Layout/Layout';
import successImg from 'src/assets/images/star.svg';

import './company-complete.scss'

const CompanyComplete = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-company-complete" className="company-complete" role="fullscreen">
      <img className="company-complete--image" src={successImg} />
        <h1 className="company-complete--heading">{t('companyDesign.companyComplete.title')}</h1>
        <p className="company-complete--copy">{t('companyDesign.companyComplete.copy')}</p>
        <p className="company-complete--copy">{ t('companyDesign.companyComplete.info') }</p>
        <Link to="/dashboard">
          <Button label={t('companyDesign.companyComplete.button')} classes="full" />
        </Link>
      </div>
    </Layout>
  );
}

export default CompanyComplete;
