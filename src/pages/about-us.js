import React from 'react'
import { useTranslation } from 'react-i18next';

import Layout from 'src/components/Layout/Layout'
import ContactUs from 'src/components/ContactUs/ContactUs'
import MeetTheFounders from 'src/components/MeetTheFounders/MeetTheFounders'

import Clock from 'src/assets/images/clock.svg'
import 'src/styles/pages/about-us.scss'

const Pricing = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div>
        <img className="about-us-img" src={Clock} alt="clock" data-test="about-us-img" />
        <h1 className="about-us-title">{t('aboutUs.title.first')}</h1>
        <p className="about-us-content">{t('aboutUs.content.first')}</p>
        <p className="about-us-content">{t('aboutUs.content.second')}</p>
        <h3 className="about-us-title-second">{t('aboutUs.title.second')}</h3>
        <p className="about-us-content">{t('aboutUs.content.third')}</p>
        <p className="about-us-content">{t('aboutUs.content.fourth')}</p>
        <p className="about-us-content">{t('aboutUs.content.fifth')}</p>
        <p className="about-us-content">{t('aboutUs.content.sixth')}</p>
        <MeetTheFounders />
        <ContactUs data-test="about-us-contact-us"/>
      </div>
      </Layout>
  )
}

export default Pricing
