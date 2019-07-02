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
      <div role="fullscreen account hasFooter hasCurve">
        <TextImage
          title={t('onBoarding.confirmation.heading')}
          image={confirmationImage}
          text={t('onBoarding.confirmation.copy')}
          buttonAction={() => navigate('/dashboard')}
          buttonLabel={t('onBoarding.confirmation.buttonText')}
        />
        {/* <img className="intro--hero-image" src={confirmationImage} alt={t('onBoarding.confirmation.imageAltText')} />
        <div className="confirmation-content">
          <h1 className="confirmation--heading">{t('onBoarding.confirmation.heading')}</h1>
          <div className="confirmation--copy" dangerouslySetInnerHTML={{ __html: t('onBoarding.confirmation.copy') }} />
          <Link to="/dashboard">
            <Button label={t('onBoarding.confirmation.buttonText')} />
          </Link>
        </div> */}
      </div>
    </Layout>
  );
}

export default OnboardingConfirmation;
