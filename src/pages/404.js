import React from 'react'
import { useTranslation } from 'react-i18next';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout';
import Button from 'src/components/_buttons/Button/Button';
import SEO from 'src/components/seo';

import Image from 'src/assets/images/oops.svg'

const NotFoundPage = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div role="brochure">
        <SEO title="404: Not found" />
        <img className="hero-image" src={Image} alt="clock" data-test="about-us-img" />
        <h1>{ t('404.title') }</h1>
        <p className="wrap">{ t('404.text') }</p>

        <Button classes="primary" onClick={() => navigate('/')} label={ t('404.cta') } />
      </div>
    </Layout>
  );
};

export default NotFoundPage
