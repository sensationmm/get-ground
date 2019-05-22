import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import ImageFull from 'src/components/ImageFull/ImageFull'
import ContactUs from 'src/components/ContactUs/ContactUs'

import house from 'src/assets/images/house.svg'
import Layout from 'src/components/Layout/Layout'
import 'src/styles/pages/landing.scss'

const IndexPage = () => {
  const [t] = useTranslation();

  return (
    <Fragment>
      <Layout>
        <div data-test="container-home" className="home" role="company-design">
          <h1>{t('landing.title')}</h1>
          <h1>{t('landing.secondaryTitle')}</h1>
          <ImageFull src={house} alt="house"/>
          <div className="home-content">
            <p>{t('landing.firstParagraph')}</p>
            <p>{t('landing.secondParagraph')}</p>
            <p>{t('landing.thirdParagraph')}</p>
          </div>
          <ContactUs />
        </div>
      </Layout>
    </Fragment>
  )
}

export default IndexPage;
