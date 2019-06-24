import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

import confirmationImage from 'src/assets/images/fullhousepure.svg'
import Button from 'src/components/_buttons/Button/Button'
import Layout from 'src/components/Layout/Layout'

import 'src/styles/pages/confirmation.scss'

const OnboardingConfirmation = () => {
  const [t] = useTranslation();

  return (
    <Layout secure>
      <div className="confirmation" role="fullscreen account brochure hasFooter">
        <img className="intro--hero-image" src={confirmationImage} alt={t('onBoarding.confirmation.imageAltText')} />
        <div className="confirmation-content">
          <h1 className="confirmation--heading">{t('onBoarding.confirmation.heading')}</h1>
          <div className="confirmation--copy" dangerouslySetInnerHTML={{ __html: t('onBoarding.confirmation.copy') }} />
          <Link to="/dashboard">
            <Button
              label={t('onBoarding.confirmation.buttonText')}
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default OnboardingConfirmation;
