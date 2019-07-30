
import React from 'react';
import { navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';

import sliderImg1 from 'src/assets/images/getStarted.svg';
import Button from 'src/components/_buttons/Button/Button';
import TextImage from 'src/components/_layout/TextImage/TextImage';
import Layout from 'src/components/Layout/Layout';

import 'src/styles/pages/intro.scss';

const OnboardingIntroContainer = () => {
  const [t, i18n] = useTranslation();

  const slidesContent = i18n.t('onBoarding.intro.slides', { returnObjects: true });

  return (
    <Layout>
      <div data-test="container-onboarding-intro" className="intro" role="fullscreen account hasFooter hasCurve">
        <TextImage
          title={slidesContent[0].title}
          text={slidesContent[0].copy}
          image={sliderImg1}
        />

        <div className="intro--buttons-container">
          <Button
            fullWidth
            big
            label={t('onBoarding.intro.button1')}
            onClick={() => navigate('/onboarding/create-account')}
          />

          <Button
            fullWidth
            opaque
            
            label={t('onBoarding.intro.button2')}
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
    </Layout>
  );
}

export default OnboardingIntroContainer;
