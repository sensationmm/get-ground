
import React, { Fragment, useContext } from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

import WindowSizeContext from '../context/WindowSizeContext'
import sliderImg from '../assets/images/intro-slide-image.png'
import IntroSlider from '../components/IntroSlider/IntroSlider'
import Button from '../components/_buttons/Button/Button'
import Layout from '../components/layout/layout'

import '../styles/pages/onboarding-intro.scss'

const OnboardingIntroContainer = () => {
  const windowContext = useContext(WindowSizeContext);
  const [t, i18n] = useTranslation();

  const slidesContent = i18n.t('onBoarding.intro.slides', { returnObjects: true });
  const slidesConfig = {
    slides: [
      {
        'image': sliderImg,
        'imageAltText': slidesContent[0].imageAltText,
        'title': slidesContent[0].title,
        'copy': slidesContent[0].copy
      },
      {
        'image': sliderImg,
        'imageAltText': slidesContent[1].imageAltText,
        'title': slidesContent[1].title,
        'copy': slidesContent[1].copy
      },
      {
        'image': sliderImg,
        'imageAltText': slidesContent[2].imageAltText,
        'title': slidesContent[2].title,
        'copy': slidesContent[2].copy
      },
      {
        'image': sliderImg,
        'imageAltText': slidesContent[3].imageAltText,
        'title': slidesContent[3].title,
        'copy': slidesContent[3].copy
      }
    ]
  };

  return (
    <div data-test="container-onboarding-intro" className="onboarding-intro">
      <span>Width: {windowContext.width}</span>
      <span> Height: {windowContext.height}</span>
      <span> Breakpoint: {windowContext.breakpoint}</span>
      {slidesContent.length &&
        <Fragment>
          <Layout>
            <IntroSlider
              slides={slidesConfig.slides}
            />
            <div className="buttons-container">
              <Link to="/create-account">
                <Button
                  fullWidth
                  label={t('onBoarding.intro.button1')}
                />
              </Link>
              <Link to="/login">
                <Button
                  opaque
                  small
                  label={t('onBoarding.intro.button2')}
                />
              </Link>
            </div>
          </Layout>
        </Fragment>
      }
    </div>
  );
}

export default OnboardingIntroContainer;
