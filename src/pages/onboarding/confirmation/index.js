import React from 'react'
import { useTranslation } from 'react-i18next'

import confirmationImage from 'src/assets/images/fullhousepure.svg'
import Layout from 'src/components/Layout/Layout'
import TextImage from 'src/components/_layout/TextImage/TextImage'

import 'src/styles/pages/confirmation.scss'
import { navigate } from '@reach/router';

const OnboardingConfirmation = () => {
  const [t] = useTranslation();

  return (
    <Layout secure>
      <div role="fullscreen account hasFooter hasCurve form-page">
        <TextImage
          title={t('onBoarding.confirmation.heading')}
          image={confirmationImage}
          text={t('onBoarding.confirmation.copy')}
          buttonAction={() => navigate('/dashboard')}
          buttonLabel={t('onBoarding.confirmation.buttonText')}
        />
      </div>
    </Layout>
  );
}

export default OnboardingConfirmation;
