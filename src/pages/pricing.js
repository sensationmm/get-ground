import React from 'react'
import { useTranslation } from 'react-i18next';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout'
import PageHeader from 'src/components/_layout/PageHeader/PageHeader';
import Boxes from 'src/components/_layout/Boxes/Boxes';
import LandingContent from 'src/components/_layout/LandingContent/LandingContent';
import Button from 'src/components/_buttons/Button/Button';
import Links from 'src/components/_layout/Links/Links';

import 'src/styles/pages/pricing.scss';

const Pricing = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-pricing" role="landing" className="pricing">
        <PageHeader title={ t('pricing.title') } text={ t('pricing.intro') } />

        <LandingContent>
          <Boxes
            content={[
              {
                heading: t('pricing.content.fees.title'),
                text: t('pricing.content.fees.text'),
                items: [
                  {
                    heading: t('pricing.content.fees.prices.signup.heading'),
                    content: t('pricing.content.fees.prices.signup.text')
                  },
                  {
                    heading: t('pricing.content.fees.prices.subscription.heading'),
                    content: t('pricing.content.fees.prices.subscription.text')
                  },
                ],
                footer: t('pricing.content.fees.footer')
              }, 
              {
                heading: t('pricing.content.included.title'),
                text: t('pricing.content.included.text'),
              },
              {
                heading: t('pricing.content.other.title'),
                text: t('pricing.content.other.text'),
              }
            ]}
          />
          
          <center><Button classes="get-started" label={ t('home.cta')} onClick={() => navigate('/onboarding/intro') } /></center>

          <Links
            next={{ label: t('menu.links.tenth.label'), link: '/trust-and-privacy' }}
            prev={{ label: t('menu.links.third.label'), link: '/how-it-works' }}
          />
        </LandingContent>
      </div>
    </Layout>
  )
}

export default Pricing
