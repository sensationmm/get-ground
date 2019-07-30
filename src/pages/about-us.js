import React from 'react'
import { useTranslation } from 'react-i18next';

import Layout from 'src/components/Layout/Layout'
import PageHeader from 'src/components/_layout/PageHeader/PageHeader';
import PageIntro from 'src/components/_layout/PageIntro/PageIntro';
import LandingContent from 'src/components/_layout/LandingContent/LandingContent';
import Sections from 'src/components/_layout/Sections/Sections';

import Moubin from 'src/assets/images/moubin.jpg'
import Misrab from 'src/assets/images/misrab.jpg'

import 'src/styles/pages/landing-pages.scss';
import 'src/styles/pages/about-us.scss';

const AboutUs = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-aboutUs" className="about-us" role="landing">
        <PageHeader title={ t('aboutUs.title') } text={ t('aboutUs.intro') } />

        <LandingContent>
          <PageIntro heading={ t('aboutUs.content.heading') } />
          <div dangerouslySetInnerHTML={{ __html: t('aboutUs.content.text') }} />

          <Sections
            sections={[
              {
                heading: t('aboutUs.moubin.name'),
                text: t('aboutUs.moubin.text'),
                image: Moubin
              }, 
              {
                heading: t('aboutUs.misrab.name'),
                text: t('aboutUs.misrab.text'),
                image: Misrab
              }
            ]}
            reverse
          />
        </LandingContent>
      </div>
    </Layout>
  )
}

export default AboutUs;
