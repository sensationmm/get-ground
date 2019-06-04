import React from 'react'
import { useTranslation } from 'react-i18next';

import Layout from 'src/components/Layout/Layout'
import ContactUs from 'src/components/ContactUs/ContactUs'
import Bounce from 'react-reveal/Bounce'

import Step1 from 'src/assets/images/HowItWorks-step1.svg'
import Step2 from 'src/assets/images/HowItWorks-step2.svg'
import Step3 from 'src/assets/images/HowItWorks-step3.svg'
import Step4 from 'src/assets/images/HowItWorks-step4.svg'
import Step5 from 'src/assets/images/HowItWorks-step5.svg'

import CoinAndHand from 'src/assets/images/coins-and-hand.svg'

import 'src/styles/pages/how-it-works.scss'

const HowItWorks = () => {
  const [t, i18n] = useTranslation();

  const stepContent = i18n.t('howItWorks.sections', { returnObjects: true });
  const stepConfig = {
    steps: [
      {
        'title': stepContent['step1'].title,
        'copy': stepContent['step1'].copy,
        'image': CoinAndHand
      },
      {
        'title': stepContent['step2'].title,
        'copy': stepContent['step2'].copy,
        'image': CoinAndHand
      },
      {
        'title': stepContent['step3'].title,
        'copy': stepContent['step3'].copy,
        'image': CoinAndHand
      },
      {
        'title': stepContent['step4'].title,
        'copy': stepContent['step4'].copy,
        'image': CoinAndHand
      },
      {
        'title': stepContent['step5'].title,
        'copy': stepContent['step5'].copy,
        'image': CoinAndHand
      }
    ]
  };



  return (
    <Layout>
      <div className="how-it-works">
        <img className="pricing-img" src={CoinAndHand} alt="coins in a jar" data-test="pricing-img" />
        <h1 className="how-it-works-title">{t('howItWorks.title')}</h1>
        <ul>
        {stepConfig.steps.map((step, idx) => (
          <div key={`${idx} + ${step.title}`}>
            <Bounce>
              <div className="how-it-works-step">
                <img src={CoinAndHand}/>
                <li className="how-it-works-step-li">
                  <div className="how-it-works-step-bullet"></div>
                  <p className="how-it-works-step-title">{step.title}</p>
                  <p className="how-it-works-step-copy">{step.copy}</p>
                </li>
              </div>
            </Bounce>
          </div>
        ))}
        </ul>
        <ContactUs data-test="pricing-contact-us"/>
      </div>
      </Layout>
  )
}

export default HowItWorks
