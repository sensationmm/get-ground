import React, { useState } from 'react'
import Layout from 'src/components/Layout/Layout'
import { useTranslation } from 'react-i18next'

import Piggy from 'src/assets/images/piggy.svg'
import whiteTick from 'src/assets/images/white-tick.svg'
import orangeCross from 'src/assets/images/orange-cross.svg'
import orangeTick from 'src/assets/images/orange-tick.svg'
import blueTick from 'src/assets/images/blue-tick.svg'

import ContactUs from 'src/components/ContactUs/ContactUs'
import Footer from 'src/components/Footer/Footer';
import Button from 'src/components/_buttons/Button/Button'
import TableSlider from 'src/components/TableSlider/TableSlider'

import 'src/styles/pages/advantages.scss'

const Advantages = () => {
  const [t, i18n] = useTranslation()
  const [showTaxTable, toggleTaxTable] = useState(false);
  const [showCompanyTable, toggleCompanyTable] = useState(false);

  const ukTaxObj = i18n.t('advantages.tax', { returnObjects: true });
  const companyObj = i18n.t('advantages.company', { returnObjects: true });

  const uKTaxAdvantages = [
    ukTaxObj['info1'],
    ukTaxObj['info2'],
    ukTaxObj['info3'],
    ukTaxObj['info4'],
    ukTaxObj['info5']
  ]


  const companyAdvantages = [
    companyObj['info1'],
    companyObj['info2'],
    companyObj['info3']
  ]

  const taxSections = [
    {
      copy: ukTaxObj.table.left['info1'],
      img: ''
    },
    {
      copy: ukTaxObj.table.left['info2'],
      img: ''
    },
    {
      copy: ukTaxObj.table.left['info3'],
      img: ''
    },
    {
      copy: ukTaxObj.table.left['info4'],
      img: ''
    },
    {
      copy: ukTaxObj.table.left['info5'],
      img: ''
    }
  ]

  const taxSmallFeed1 = [
    {
      copy: '',
      img: ''
    },
    {
      copy: '',
      img: orangeCross
    },
    {
      copy: '',
      img: orangeCross
    },
    {
      copy: '',
      img: orangeCross
    },
    {
      copy: '',
      img: orangeCross
    }
  ]

  const taxSmallFeed2 = [
    {
      copy: '',
      img: ''
    },
    {
      copy: '',
      img: whiteTick
    },
    {
      copy: '',
      img: whiteTick
    },
    {
      copy: '',
      img: whiteTick
    },
    {
      copy: '',
      img: whiteTick
    }
  ]

  const taxLargeFeed1 = [
    {
      copy: ukTaxObj.table.right.large.feed1['info1'],
      img: ''
    },
    {
      copy: ukTaxObj.table.right.large.feed1['info2'],
      img: orangeCross
    },
    {
      copy: ukTaxObj.table.right.large.feed1['info3'],
      img: orangeCross
    },
    {
      copy: ukTaxObj.table.right.large.feed1['info4'],
      img: orangeCross
    },
    {
      copy: ukTaxObj.table.right.large.feed1['info5'],
      img: orangeCross
    }
  ]

  const taxLargeFeed2 = [
    {
      copy: ukTaxObj.table.right.large.feed2['info1'],
      img: ''
    },
    {
      copy: ukTaxObj.table.right.large.feed2['info2'],
      img: whiteTick
    },
    {
      copy: ukTaxObj.table.right.large.feed2['info3'],
      img: whiteTick
    },
    {
      copy: ukTaxObj.table.right.large.feed2['info4'],
      img: whiteTick
    },
    {
      copy: ukTaxObj.table.right.large.feed2['info5'],
      img: whiteTick
    }
  ]


  const companySections = [
    {
      copy: companyObj.table.left['info1'],
      img: ''
    },
    {
      copy: companyObj.table.left['info2'],
      img: ''
    },
    {
      copy: companyObj.table.left['info3'],
      img: ''
    },
    {
      copy: companyObj.table.left['info4'],
      img: ''
    },
  ]

  const companySmallFeed1 = [
    {
      copy: '',
      img: blueTick
    },
    {
      copy: '',
      img: orangeCross
    },
    {
      copy: '',
      img: orangeCross
    },
    {
      copy: '',
      img: orangeCross
    }
  ]

  const companySmallFeed2 = [
    {
      copy: '',
      img: whiteTick
    },
    {
      copy: '',
      img: whiteTick
    },
    {
      copy: '',
      img: whiteTick
    },
    {
      copy: '',
      img: whiteTick
    }
  ]

  const companyLargeFeed1 = [
    {
      copy: companyObj.table.right.large.feed1['info1'],
      img: orangeTick
    },
    {
      copy: companyObj.table.right.large.feed1['info2'],
      img: orangeCross
    },
    {
      copy: companyObj.table.right.large.feed1['info3'],
      img: orangeCross
    },
    {
      copy: companyObj.table.right.large.feed1['info4'],
      img: orangeCross
    },
  ]

  const companyLargeFeed2 = [
    {
      copy: companyObj.table.right.large.feed2['info1'],
      img: whiteTick
    },
    {
      copy: companyObj.table.right.large.feed2['info2'],
      img: whiteTick
    },
    {
      copy: companyObj.table.right.large.feed2['info3'],
      img: whiteTick
    },
    {
      copy: companyObj.table.right.large.feed2['info4'],
      img: whiteTick
    },
  ]


  return (
    <Layout>
      <div className="advantages">
        <img className="advantages-img" src={Piggy} alt="Piggy bank"/>
        <h1>{t('advantages.title')}</h1>
        <div className="advantages-uk-tax">
        <h3 className="advantages-uk-tax-title">{t('advantages.tax.title')}</h3>
        {showTaxTable ?
          <div className="advantages-uk-tax-more-expanded">
          <TableSlider
            leftHandFeed={taxSections}
            smallFeed1={taxSmallFeed1}
            smallFeed2={taxSmallFeed2}
            feed1={taxLargeFeed1}
            feed2={taxLargeFeed2}
            showTable={showTaxTable}
            tableName="tax"
          />
          <p className="advantages-uk-tax-more-expanded-info">{t('advantages.warning')}</p>
          </div>
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
        }
        </div>
        <div className="advantages-company">
        <h3 className="advantages-company-title">{t('advantages.company.title')}</h3>
        {showCompanyTable ?
          <div className="advantages-company-more-expanded">
            <TableSlider
              leftHandFeed={companySections}
              smallFeed1={companySmallFeed1}
              smallFeed2={companySmallFeed2}
              feed1={companyLargeFeed1}
              feed2={companyLargeFeed2}
              showTable={showCompanyTable}
              tableName="company"
            />
            <p className="advantages-company-more-expanded-info">{t('advantages.warning')}</p>
          </div>
          :
          <>
            <ul>
              {companyAdvantages.map((info, idx) => (
                <li key={`${info} + ${idx}`}>
                  <p className="advantages-company-info" >{info}</p>
                </li>
              ))}
            </ul>
            <Button classes="advantages-btn chat" fullWidth label={t('advantages.cta')} onClick={() => toggleCompanyTable(!showCompanyTable)}/>
          </>
        }
        </div>
        <ContactUs />
        <Footer />
      </div>
    </Layout>
  )
}

export default Advantages
