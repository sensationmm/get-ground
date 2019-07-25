import React from 'react'
import { useTranslation } from 'react-i18next';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout';
import PageHeader from 'src/components/_layout/PageHeader/PageHeader';
import PageIntro from 'src/components/_layout/PageIntro/PageIntro';
import LandingContent from 'src/components/_layout/LandingContent/LandingContent';
import Button from 'src/components/_buttons/Button/Button';
import Links from 'src/components/_layout/Links/Links';
import Step from 'src/components/_layout/Step/Step';

import Step1 from 'src/assets/images/for-sale.svg';
import Step2 from 'src/assets/images/deed.svg';
import Step3 from 'src/assets/images/documents-modal.svg';

const HowItWorks = () => {
  const [t] = useTranslation()

  return (
    <Layout>
      <div data-test="container-how-it-works" className="how-it-works" role="landing">
        <PageHeader title={ t('howItWorks.title') } text={ t('howItWorks.intro') } />

        <LandingContent>
          <PageIntro heading={ t('howItWorks.content.heading') } text={t('howItWorks.content.text') } />

          <Step
            image={Step1}
            stepName={ t('howItWorks.sections.step1.stepName') }
            heading={ t('howItWorks.sections.step1.heading') }
            content={ t('howItWorks.sections.step1.content') }
          />

          <Step
            image={Step2}
            stepName={ t('howItWorks.sections.step2.stepName') }
            heading={ t('howItWorks.sections.step2.heading') }
            content={ t('howItWorks.sections.step2.content') }
          />

          <Step
            image={Step3}
            stepName={ t('howItWorks.sections.step3.stepName') }
            heading={ t('howItWorks.sections.step3.heading') }
            content={ t('howItWorks.sections.step3.content') }
          />
          
          <PageIntro heading={ t('howItWorks.outro.heading') } text={t('howItWorks.outro.text') } />

          <center><Button classes="get-started" label="Get Started" onClick={() => navigate('/onboarding/intro') } /></center>

          <Links
            next={{ label: t('menu.links.fourth'), link: '/pricing' }}
            prev={{ label: t('menu.links.second'), link: '/advantages' }}
          />
        </LandingContent>
      </div>
    </Layout>
  )
}

export default HowItWorks
