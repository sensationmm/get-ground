import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Bounce from 'react-reveal/Bounce'
import useWindowScroll from 'react-use/lib/useWindowScroll';

import Layout from 'src/components/Layout/Layout'
import ContactUs from 'src/components/ContactUs/ContactUs'
import Button from 'src/components/_buttons/Button/Button';

import Step1 from 'src/assets/images/HowItWorks-step1.svg'
import Step2 from 'src/assets/images/HowItWorks-step2.svg'
import Step3 from 'src/assets/images/HowItWorks-step3.svg'
import Step4 from 'src/assets/images/HowItWorks-step4.svg'
import Step5 from 'src/assets/images/HowItWorks-step5.svg'

import Roof from 'src/assets/images/roof.svg'

import 'src/styles/pages/how-it-works.scss'

const HowItWorks = () => {
  const [t, i18n] = useTranslation();
  const { y } = useWindowScroll() ;

  console.log((y /window.innerHeight) * 100);

  const height = () => {

  }

  const stepContent = i18n.t('howItWorks.sections', { returnObjects: true });
  const stepConfig = {
    steps: [
      {
        'title': stepContent['step1'].title,
        'copy': stepContent['step1'].copy,
        'image': Step1
      },
      {
        'title': stepContent['step2'].title,
        'copy': stepContent['step2'].copy,
        'image': Step2
      },
      {
        'title': stepContent['step3'].title,
        'copy': stepContent['step3'].copy,
        'image': Step3
      },
      {
        'title': stepContent['step4'].title,
        'copy': stepContent['step4'].copy,
        'image': Step4
      },
      {
        'title': stepContent['step5'].title,
        'copy': stepContent['step5'].copy,
        'image': Step5
      }
    ]
  };

  const lineHeight = (y/window.innerHeight) * 100

  return (
    <Layout>
      <div className="how-it-works">
        <img className="how-it-works-img" src={Roof} alt="roof of house" data-test="how-it-works-img" />
        <h1 className="how-it-works-title">{t('howItWorks.title')}</h1>
          <ul>
          {stepConfig.steps.map((step, idx) => (
            <div key={`${idx} + ${step.title}`} className="how-it-works-steps">
              <Bounce>
                <div className="how-it-works-step">
                  <img src={step.image}/>
                  <li className="how-it-works-step-li">
                    <p className="how-it-works-step-title">{step.title}</p>
                    <p className="how-it-works-step-copy">{step.copy}</p>
                  </li>
                </div>
              </Bounce>
            </div>
          ))}
          <div className="how-it-works-step-verticalLine" style={{height: lineHeight > 88 ? `77.5%` : `${lineHeight}%`}}></div>
        </ul>
        <Button classes="full chat how-it-works-find-out-more" label={t('howItWorks.findOutMore.label')} fullWidth/>
        <ContactUs data-test="pricing-contact-us"/>
      </div>
      </Layout>
  )
}

export default HowItWorks
