import React from 'react'
import Layout from 'src/components/Layout/Layout'
import { useTranslation } from 'react-i18next';

import ContactUs from 'src/components/ContactUs/ContactUs'
import Footer from 'src/components/Footer/Footer';
import Button from 'src/components/_buttons/Button/Button'

import 'src/styles/pages/advantages.scss'

const Advantages = () => {
  const [t, i18n] = useTranslation()

  const ukTaxObj = i18n.t('advantages.tax', { returnObjects: true });

  const uKTaxAdvantages = [
    ukTaxObj['info1'],
    ukTaxObj['info2'],
    ukTaxObj['info3'],
    ukTaxObj['info4'],
    ukTaxObj['info5']
  ]

  const companyObj = i18n.t('advantages.company', { returnObjects: true });

  const companyAdvantages = [
    companyObj['info1'],
    companyObj['info2'],
    companyObj['info3']
  ]

  return (
    <Layout>
      <div className="advantages">
        <h1>{t('advantages.title')}</h1>
        <div className="advantages-uk-tax">
        <h3 className="advantages-uk-tax-title">{t('advantages.tax.title')}</h3>
          <ul>
            {uKTaxAdvantages.map((info, idx) => (
              <li key={`${info} + ${idx}`}>
                <p className="advantages-uk-tax-info" >{info}</p>
              </li>
            ))}
          </ul>
          <Button classes="advantages-btn chat" fullWidth label={t('advantages.cta')}/>
        </div>
        <div className="advantages-company">
        <h3 className="advantages-company-title">{t('advantages.company.title')}</h3>
          <ul>
            {companyAdvantages.map((info, idx) => (
              <li key={`${info} + ${idx}`}>
                <p className="advantages-company-info" >{info}</p>
              </li>
            ))}
          </ul>
          <Button classes="advantages-btn chat" fullWidth label={t('advantages.cta')}/>
        </div>
      </div>
      <ContactUs />
      <Footer />
    </Layout>
  )
}

export default Advantages
