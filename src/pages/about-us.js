import React from 'react'
import { useTranslation } from 'react-i18next';

import Layout from 'src/components/Layout/Layout'
import MeetTheFounders from 'src/components/MeetTheFounders/MeetTheFounders'

import Image from 'src/assets/images/about-us.svg'

const AboutUs = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div role="brochure">
        <img className="hero-image" src={Image} alt="clock" data-test="about-us-img" />
        <h1 className="about-us-title">{t('aboutUs.title.first')}</h1>
        <p className="about-us-content" data-test="content-first">{t('aboutUs.content.first')}</p>
        <p className="about-us-content" data-test="content-second">{t('aboutUs.content.second')}</p>
        <h3 className="about-us-title-second">{t('aboutUs.title.second')}</h3>
        <p className="about-us-content" data-test="content-third">{t('aboutUs.content.third')}</p>
        <p className="about-us-content" data-test="content-fourth">{t('aboutUs.content.fourth')}</p>
        <p className="about-us-content" data-test="content-fifth">{t('aboutUs.content.fifth')}</p>
        <p className="about-us-content" data-test="content-sixth">{t('aboutUs.content.sixth')}</p>
        <MeetTheFounders data-test="meet-the-founders"/>
      </div>
      </Layout>
  )
}

export default AboutUs
