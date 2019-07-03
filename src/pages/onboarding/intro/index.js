
import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import sliderImg1 from 'src/assets/images/getStarted.svg';
import sliderImg2 from 'src/assets/images/piggy.svg';
import sliderImg3 from 'src/assets/images/clock.svg';
import sliderImg4 from 'src/assets/images/roof.svg';
import IntroSlider from 'src/components/IntroSlider/IntroSlider';
import Button from 'src/components/_buttons/Button/Button';
import Layout from 'src/components/Layout/Layout';

import 'src/styles/pages/intro.scss';

const OnboardingIntroContainer = () => {
  const [t, i18n] = useTranslation();

  const slidesContent = i18n.t('onBoarding.intro.slides', { returnObjects: true });
  const slidesConfig = {
    slides: [
      {
        'image': sliderImg1,
        'imageAltText': slidesContent[0].imageAltText,
        'title': slidesContent[0].title,
        'copy': slidesContent[0].copy
      },
      {
        'image': sliderImg2,
        'imageAltText': slidesContent[1].imageAltText,
        'title': slidesContent[1].title,
        'copy': slidesContent[1].copy
      },
      {
        'image': sliderImg3,
        'imageAltText': slidesContent[2].imageAltText,
        'title': slidesContent[2].title,
        'copy': slidesContent[2].copy
      },
      {
        'image': sliderImg4,
        'imageAltText': slidesContent[3].imageAltText,
        'title': slidesContent[3].title,
        'copy': slidesContent[3].copy
      }
    ]
  };

  return (
    <Layout>
      <div data-test="container-onboarding-intro" className="intro" role="fullscreen account hasFooter hasCurve form-page">
        {slidesContent.length &&
          <IntroSlider slides={slidesConfig.slides} />
        }
        <div className="intro--buttons-container">
          <Link to="/onboarding/create-account">
            <Button
              fullWidth
              big
              label={t('onBoarding.intro.button1')}
            />
          </Link>
          <Link to="/login">
            <Button
              fullWidth
              opaque
              small
              label={t('onBoarding.intro.button2')}
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default OnboardingIntroContainer;
