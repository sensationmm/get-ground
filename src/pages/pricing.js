import React from 'react'
import { useTranslation } from 'react-i18next';

import Layout from 'src/components/Layout/Layout'
import ContactUs from 'src/components/ContactUs/ContactUs'

import CoinAndHand from 'src/assets/images/coins-and-hand.svg'
import 'src/styles/pages/pricing.scss'

const Pricing = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div>
        <img className="pricing-img" src={CoinAndHand} alt="coins in a jar" data-test="pricing-img" />
        <h1 className="pricing-title">{t('pricing.title')}</h1>
        <div className="pricing-property">
          <h3 className="pricing-property-title">{t('pricing.property.title')}</h3>
          <div className="pricing-property-sign">
            <h3 data-test="property-oneTime-price">{t('pricing.property.oneTime.price')}</h3>
            <h3 data-test="property-oneTime-price">{t('pricing.vat')}</h3>
          </div>
          <p className="pricing-property-sign-caption">{t('pricing.property.oneTime.caption')}</p>

          <div className="pricing-property-monthly">
            <h3 data-test="property-monthly-price">{t('pricing.property.monthly.price')}</h3>
            <h3 data-test="property-monthly-vat" >{t('pricing.vat')}</h3>
          </div>
          <p className="pricing-property-monthly-caption">{t('pricing.property.monthly.caption')}</p>

          <div className="pricing-property-annual">
            <h3 data-test="property-annual-price">{t('pricing.property.annual.price')}</h3>
          </div>
            <p data-test="property-annual-caption" className="pricing-property-annual-caption">{t('pricing.property.annual.caption')}</p>
          <div>
            <div data-test="property-annual-caption-small" className="pricing-property-annual-small">{t('pricing.property.annual.smallCaption')}</div>
          </div>
        </div>
        <div className="pricing-services">
          <h3 className="pricing-services-title">{t('pricing.services.title')}</h3>
          <p data-test="services-content-first" >{t('pricing.services.firstContent')}</p>
          <p data-test="services-content-second" >{t('pricing.services.secondContent')}</p>
        </div>
        <ContactUs data-test="pricing-contact-us"/>
      </div>
      </Layout>
  )
}

export default Pricing
