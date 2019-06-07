import React, { useState, useEffect } from 'react'
import Layout from 'src/components/Layout/Layout'
import { useTranslation } from 'react-i18next'

import Piggy from 'src/assets/images/piggy.svg'
import whiteTick from 'src/assets/images/white-tick.svg'
import orangeCross from 'src/assets/images/orange-cross.svg'
import classNames from 'classnames';

import ContactUs from 'src/components/ContactUs/ContactUs'
import Footer from 'src/components/Footer/Footer';
import Button from 'src/components/_buttons/Button/Button'
import Table from 'src/components/Table/Table'

import 'src/styles/pages/advantages.scss'

const Advantages = () => {
  const [t, i18n] = useTranslation()
  const [taxTableIndex, toggleTableIndex] = useState(0)
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
    {
      copy: 'Same taxes on property purchase',
      img: ''
    },
    {
      copy: 'Deduct mortgage interest from your UK tax bill',
      img: ''
    },
    {
      copy: 'Lower capital gains tax (CGT)',
      img: ''
    },
    {
      copy: 'Save on stamp duty and land tax (SDLT) when you sell',
      img: ''
    },
    {
      copy: 'Efficiently take income from your property',
      img: ''
    }
  ]

  const smallFeed = [
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

  const smallFeed2 = [
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

  const feed1 = [
    {
      copy: '',
      img: ''
    },
    {
      copy: 'Replaced with a basic rate credit',
      img: orangeCross
    },
    {
      copy: '18% or 28% CGT tax',
      img: orangeCross
    },
    {
      copy: '',
      img: orangeCross
    },
    {
      copy: 'Either income tax or capital gains tax',
      img: orangeCross
    }
  ]

  const feed2 = [
    {
      copy: 'same taxes (e.g SDLT) as personal ownership if you rent out your property to 3rd parties',
      img: ''
    },
    {
      copy: '',
      img: whiteTick
    },
    {
      copy: '10% or 20% CGT tax for sale of shares',
      img: whiteTick
    },
    {
      copy: 'No SDLT when buying shares',
      img: whiteTick
    },
    {
      copy: 'Choose between capital repayments or dividends',
      img: whiteTick
    }
  ]

  const showTable = (index) => {
    if(index === 0) {
      return (
        <div className="answers tax">
          <Table header="Personal ownership" classes="right" sections={smallFeed} images small/>
          <Table header="Company ownership" classes="right blue" sections={smallFeed2} images small />
        </div>
      )
    }

    if (index === 1) {
      return (
        <Table header="Personal ownership" classes="answers right tax" sections={feed1} />
      )
    }

    if (index === 2) {
      return (
        <Table header="Company ownership" classes="answers right blue tax" sections={feed2} />
      )
    }
  }

  useEffect(() => {
    if (showTaxTable) {
      const _T = document.querySelector('.answers.tax');
      let ts = 0;
      _T.addEventListener('touchstart', function(e) {
        ts = e.changedTouches[0].clientX
      })

      _T.addEventListener('touchend', function(e) {
        const te = e.changedTouches[0].clientX
        if (ts < te ) {
          const idx = taxTableIndex === 0 ? 2 : taxTableIndex - 1
          toggleTableIndex(idx)
        } else {
          const idx = taxTableIndex === 2 ? 0 : taxTableIndex + 1
          toggleTableIndex(idx)
        }
      })
    }
  })

  const expandedTax = () => (
    <div className="advantages-uk-tax-more-expanded">
      <Table sections={sections} />
        {showTable(taxTableIndex)}
      <div className="advantages-uk-tax-more-expanded-bullet">
        <span
          className={classNames({ 'active' : taxTableIndex === 0 })}
          onClick={() => toggleTableIndex(0)}
        />
        <span
          className={classNames({ 'active' : taxTableIndex === 1 })}
          onClick={() => toggleTableIndex(1)}
        />
        <span
          className={classNames({ 'active' : taxTableIndex === 2 })}
          onClick={() => toggleTableIndex(2)}
        />
      </div>
      <p className="advantages-uk-tax-more-expanded-info">None of the information contained here, nor anywhere in this presentation contributes advice</p>
    </div>
  )



  return (
    <Layout>
      <div className="advantages">
        <img className="advantages-img" src={Piggy} alt="Piggy bank"/>
        <h1>{t('advantages.title')}</h1>
        <div className="advantages-uk-tax">
        <h3 className="advantages-uk-tax-title">{t('advantages.tax.title')}</h3>
        {showTaxTable ?
          expandedTax()
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
