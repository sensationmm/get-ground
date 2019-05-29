import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import ImageFull from 'src/components/ImageFull/ImageFull'
import ContactUs from 'src/components/ContactUs/ContactUs'

import house from 'src/assets/images/house.svg'
import Layout from 'src/components/Layout/Layout'
import 'src/styles/pages/landing.scss'
import Footer from 'src/components/Footer/Footer';

const IndexPage = () => {
  const [t] = useTranslation();

  return (
    <Fragment>
      <Layout>
        <div data-test="container-landing" className="landing" role="company-design">
          <h1 data-test="landing-title" >{t('landing.title')}</h1>
          <h1 data-test="landing-secondary-title" >{t('landing.secondaryTitle')}</h1>
          <ImageFull src={house} alt="house" data-test="landing-img" />
          <div className="landing-content">
            <p data-test="landing-content-first" >{t('landing.firstParagraph')}</p>
            <p data-test="landing-content-second" >{t('landing.secondParagraph')}</p>
            <p data-test="landing-content-third" >{t('landing.thirdParagraph')}</p>
          </div>
          <ContactUs />
          <Footer />
        </div>
      </Layout>
    </Fragment>
  )
}

export default IndexPage;
