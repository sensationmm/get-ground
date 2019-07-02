
import React from 'react'
import { useTranslation } from 'react-i18next'
import TextImage from 'src/components/_layout/TextImage/TextImage'
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout'
import Image from 'src/assets/images/email-verified.svg'

import 'src/styles/pages/email-verified.scss'

const VerifyEmailSucess = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-email-verified" role="fullscreen hasFooter account hasCurve">
        <TextImage
          title={t('onBoarding.emailVerified.title')}
          image={Image}
          text={`<p>${t('onBoarding.emailVerified.copy')}</p>`}
          buttonAction={() => navigate('/onboarding')}
          buttonLabel={t('onBoarding.emailVerified.button')}
        />
      </div>
    </Layout>
  );
}

export default VerifyEmailSucess;
