import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from 'src/components/Layout/Layout';
import PageHeader from 'src/components/_layout/PageHeader/PageHeader';
import Links from 'src/components/_layout/Links/Links';
import Button from 'src/components/_buttons/Button/Button';
import LandingContent from 'src/components/_layout/LandingContent/LandingContent';
import Sections from 'src/components/_layout/Sections/Sections';
import CurveBox from 'src/components/_layout/CurveBox/CurveBox';

import ImageSection1 from 'src/assets/images/crest.svg';
import ImageSection2 from 'src/assets/images/codebreaker1.svg';
import ImageSection3 from 'src/assets/images/glasses2.svg';
import ImageSection4 from 'src/assets/images/city.svg';

import 'src/styles/pages/landing-pages.scss';

const TrustAndPrivacy = (props) => {
  const [t] = useTranslation();

  return (
    <Fragment>
      <Layout location={props.location.pathname}>
        <div data-test="container-trustAndPrivacy" className="trustAndPrivacy" role="company-design landing">
          <PageHeader title={ t('trustAndPrivacy.title') } text={ t('trustAndPrivacy.intro') } />

          <LandingContent>
            <Sections
              sections={[
                {
                  heading: t('trustAndPrivacy.sections.first.heading'),
                  text: t('trustAndPrivacy.sections.first.text'),
                  image: ImageSection1
                }, 
                {
                  heading: t('trustAndPrivacy.sections.second.heading'),
                  text: t('trustAndPrivacy.sections.second.text'),
                  image: ImageSection2
                }
              ]}
              reverse
            />
          </LandingContent>

          <CurveBox>
            <Sections
              sections={[
                {
                  heading: t('trustAndPrivacy.sections.third.heading'),
                  text: t('trustAndPrivacy.sections.third.text'),
                  image: ImageSection3
                }, 
                {
                  heading: t('trustAndPrivacy.sections.fourth.heading'),
                  text: t('trustAndPrivacy.sections.fourth.text'),
                  image: ImageSection4
                }
              ]}
              reverse
            />
          </CurveBox>

          <LandingContent>
            <br /><br />
            <center><Button classes="get-started" label={ t('home.cta')} onClick={() => navigate('/onboarding/intro') } /></center>

            <Links
              prev={{ label: t('menu.links.fourth.label'), link: '/pricing' }}
              next={{ label: t('menu.links.sixth.label'), link: '/partnerships' }}
            />
          </LandingContent>
        </div>
      </Layout>
    </Fragment>
  )
}

TrustAndPrivacy.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default TrustAndPrivacy;
