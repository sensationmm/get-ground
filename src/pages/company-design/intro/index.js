
import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import Button from 'src/components/_buttons/Button/Button';
import Layout from 'src/components/Layout/Layout';

import house from 'src/assets/images/fullhousepure.svg';

import 'src/styles/pages/intro.scss';

const OnboardingIntroContainer = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="container-company-design-intro" className="intro" role="brochure fullscreen">
        <img className="hero-image" src={house} />
        <h1>{t('companyDesign.intro.title')}</h1>
        <p className="wrap">{t('companyDesign.intro.para1')}</p>
        <p className="wrap">{t('companyDesign.intro.para2')}</p>
        <p className="wrap">{t('companyDesign.intro.para3')}</p>
        <div className="intro--buttons-container">
          <Link to="/company-design/add-services">
            <Button
              fullWidth
              label={t('companyDesign.intro.button1')}
            />
          </Link>
          <Link to="/company-design">
            <Button
              opaque
              small
              label={t('companyDesign.intro.button2')}
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default OnboardingIntroContainer;
