import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

import confirmationImage from 'src/assets/images/intro-slide-image.png'
import Button from 'src/components/_buttons/Button/Button'
import Layout from 'src/components/Layout/Layout'

import 'src/styles/pages/confirmation.scss'

const OnboardingConfirmation = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div className="confirmation" role="fullscreen">
        <div className="confirmation--image-wrapper">
          <img src={confirmationImage} alt={t('onBoarding.confirmation.imageAltText')} />
        </div>
        <h2 className="confirmation--heading">{t('onBoarding.confirmation.heading')}</h2>
        <div className="confirmation--copy" dangerouslySetInnerHTML={{ __html: t('onBoarding.confirmation.copy') }} />
        <Link to="/dashboard">
          <Button
            label={t('onBoarding.confirmation.buttonText')}
          />
        </Link>
        <p>{t('onBoarding.confirmation.contactUsText')}</p>
        <Button
          classes="link"
          label={t('onBoarding.confirmation.contactUsLinkText')}
        />
      </div>
    </Layout>
  );
}

export default OnboardingConfirmation;
