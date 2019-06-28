import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'src/components/Layout/Layout'
import TrustAndPrivacy from 'src/components/TrustAndPrivacy/TrustAndPrivacy'

import Image from 'src/assets/images/what-we-do.svg'
import 'src/styles/pages/what-we-do.scss'

const WhatWeDo = () => {
  const [t] = useTranslation();

  return (
    <Fragment>
      <Layout>
        <div data-test="container-whatWeDo" className="whatWeDo" role="company-design brochure">
          <img className="hero-image" src={Image} alt="Hands holding Phone" data-test="whatWeDo-img" />
          <h1 data-test="whatWeDo-title" >{t('whatWeDo.title')}</h1>
          <div className="whatWeDo-content">
            <p data-test="whatWeDo-content-first">{t('whatWeDo.content.first')}</p>
            <p data-test="whatWeDo-content-second" >{t('whatWeDo.content.second')}</p>
            <p data-test="whatWeDo-content-third" >{t('whatWeDo.content.third')}</p>
            <p data-test="whatWeDo-content-fourth" >{t('whatWeDo.content.fourth')}</p>
            <p data-test="whatWeDo-content-fifth" >{t('whatWeDo.content.fifth')}</p>
          </div>
          <TrustAndPrivacy />
        </div>
      </Layout>
    </Fragment>
  )
}

export default WhatWeDo;
