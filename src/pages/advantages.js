import React, { useState } from 'react'
import Layout from 'src/components/Layout/Layout'
import { useTranslation } from 'react-i18next';

import ContactUs from 'src/components/ContactUs/ContactUs'
import Footer from 'src/components/Footer/Footer';
import Button from 'src/components/_buttons/Button/Button'
import Table from 'src/components/Table/Table'

import 'src/styles/pages/advantages.scss'

const Advantages = () => {
  const [t, i18n] = useTranslation()
  const [showTaxTable, toggleTaxTable] = useState(false);
  // const [showCompanyTable, toggleCompanyTable] = useState(false);
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

  const sections = [
    'Same taxes on property purchase',
    'Deduct mortgage interest from your UK tax bill',
    'Lower capital gains tax (CGT)',
    'Save on stamp duty and land tax (SDLT) when you sell',
    'Efficiently take income from your property'
  ]

  const sectionsFeed = [
    '',
    'Same',
    'Deduct',
    'Lower',
    'Save',
    'Efficiently'
  ]

  return (
    <Layout>
      <div className="advantages">
        <h1>{t('advantages.title')}</h1>
        <div className="advantages-uk-tax">
        <h3 className="advantages-uk-tax-title">{t('advantages.tax.title')}</h3>
        {/* {showTaxTable ?
          <Table sections={sections} />
          :
          <>
            <ul>
              {uKTaxAdvantages.map((info, idx) => (
                <li key={`${info} + ${idx}`}>
                  <p className="advantages-uk-tax-info" >{info}</p>
                </li>
              ))}
            </ul>
            <Button classes="advantages-btn chat" fullWidth label={t('advantages.cta')} onClick={() => toggleTaxTable(!showTaxTable)}/>
          </>
        } */}
        <div className="advantages-uk-tax-more-expanded">
          <div className="advantages-uk-tax-more-expanded-table-first">
            <Table sections={sections} />
          </div>
          <div className="advantages-uk-tax-more-expanded-table-second">
            <Table classes="small" sections={sectionsFeed} />
            <Table classes="small" sections={sectionsFeed} />
          </div>
        </div>
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
        <ContactUs />
        <Footer />
      </div>
    </Layout>
  )
}

export default Advantages
