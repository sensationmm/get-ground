import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from 'src/components/Layout/Layout'
import PageHeader from 'src/components/_layout/PageHeader/PageHeader';
import PageIntro from 'src/components/_layout/PageIntro/PageIntro';
import Links from 'src/components/_layout/Links/Links';
import Boxes from 'src/components/_layout/Boxes/Boxes';
import Sections from 'src/components/_layout/Sections/Sections';
import Columns from 'src/components/_layout/Columns/Columns';
import Button from 'src/components/_buttons/Button/Button';
import LandingContent from 'src/components/_layout/LandingContent/LandingContent';

import IconCapital from 'src/assets/images/icon-capital.svg';
import IconProfits from 'src/assets/images/icon-profits.svg';
import IconTime from 'src/assets/images/icon-time.svg';

import Step1 from 'src/assets/images/for-sale.svg';
import Step2 from 'src/assets/images/deed.svg';
import Step3 from 'src/assets/images/documents-modal.svg';
import LogosTrust from 'src/assets/images/logos-trust.png';
import ImageHome from 'src/assets/images/home.svg';

import 'src/styles/pages/home.scss'

const IndexPage = (props) => {
  const { isMobile, t } = props;

  return (
    <Fragment>
      <Layout location={props.location.pathname}>
        <div data-test="container-landing" className="home" role="landing account">
          <PageHeader
            title={ t('home.title') }
            text={ t('home.intro') }
            image={ImageHome}
            button={(
              <Button 
                classes="get-started" 
                label={ t('home.cta')} 
                onClick={() => navigate('/onboarding/intro') } 
              />
            )}
          />

          <div>
            <LandingContent>
              <PageIntro heading={ t('home.whatWeDo.heading') } />

              <Sections
                sections={[
                  {
                    text: t('home.whatWeDo.content'),
                    image: <Boxes content={[ { text: t('home.whatWeDo.box') } ]} />
                  }
                ]}
                reverse={isMobile}
              />

              <center>
                <Button 
                  classes="get-started" 
                  label={ t('findOutMore.label')} 
                  onClick={() => navigate('/what-we-do') } 
                />
              </center>
            </LandingContent>
            
            <LandingContent green>
              <PageIntro heading={ t('home.advantages.heading') } />
              
              <div className="cols">
                <div style={{ backgroundImage: `url(${IconProfits})` }} dangerouslySetInnerHTML={{ __html: t('home.advantages.columns.first') }} />
                <div style={{ backgroundImage: `url(${IconTime})` }} dangerouslySetInnerHTML={{ __html: t('home.advantages.columns.second') }} />
                <div style={{ backgroundImage: `url(${IconCapital})` }} dangerouslySetInnerHTML={{ __html: t('home.advantages.columns.third') }} />
              </div>

              <center>
                <Button 
                  classes="get-started" 
                  label={ t('findOutMore.label')} 
                  onClick={() => navigate('/advantages') } 
                />
              </center>
            </LandingContent>
            
            <LandingContent>
              <PageIntro heading={ t('home.howItWorks.heading') } text={ t('home.howItWorks.content') } />

              <Columns
                sections={[
                  {
                    heading: t('home.howItWorks.columns.step1.stepName'),
                    text: t('home.howItWorks.columns.step1.text'),
                    image: Step1
                  }, 
                  {
                    heading: t('home.howItWorks.columns.step2.stepName'),
                    text: t('home.howItWorks.columns.step2.text'),
                    image: Step2
                  }, 
                  {
                    heading: t('home.howItWorks.columns.step3.stepName'),
                    text: t('home.howItWorks.columns.step3.text'),
                    image: Step3
                  }
                ]}
                bordered
                renderSlider={isMobile}
              />

              <h3>{ t('home.howItWorks.outro.heading') }</h3>
              <div dangerouslySetInnerHTML={{ __html: t('home.howItWorks.outro.text') }} />

              <center>
                <Button 
                  classes="get-started" 
                  label={ t('findOutMore.label')} 
                  onClick={() => navigate('/how-it-works') } 
                />
              </center>
            </LandingContent>
            
            <LandingContent orange>
              <PageIntro heading={ t('home.fees.heading')} text={ t('home.fees.content') } />

              <Boxes
                content={[
                  {
                    heading: t('pricing.content.fees.title'),
                    text: t('pricing.content.fees.text'),
                    items: [
                      {
                        heading: t('pricing.content.fees.prices.signup.heading'),
                        content: t('pricing.content.fees.prices.signup.text')
                      },
                      {
                        heading: t('pricing.content.fees.prices.subscription.heading'),
                        content: t('pricing.content.fees.prices.subscription.text')
                      },
                    ],
                    footer: t('pricing.content.fees.footer')
                  }, 
                  {
                    heading: t('pricing.content.included.title'),
                    text: t('pricing.content.included.text'),
                  },
                  {
                    heading: t('pricing.content.other.title'),
                    text: t('pricing.content.other.text'),
                  }
                ]}
                renderSlider={isMobile}
              />
            </LandingContent>
            
            <LandingContent trust>
              <Sections
                sections={[
                  {
                    heading: t('home.trustAndPrivacy.heading'),
                    text: t('home.trustAndPrivacy.content'),
                    image: LogosTrust,
                    button: (
                      <Button 
                        classes="get-started" 
                        label={ t('findOutMore.label')} 
                        onClick={() => navigate('/trust-and-privacy') } 
                      />
                    )
                  }
                ]}
                imageFull
                reverse={isMobile}
              />
            </LandingContent>
            
            <LandingContent>
              <center>
                <Button 
                  classes="get-started" 
                  label={ t('home.cta') } 
                  onClick={() => navigate('/onboarding/intro') } 
                />
              </center>

              <Links
                next={{ label: t('menu.links.first.label'), link: '/what-we-do' }}
                prev={{ label: t('menu.links.sixth.label'), link: '/partnerships' }}
              />
            </LandingContent>
          </div>
        </div>
      </Layout>
    </Fragment>
  )
}

IndexPage.propTypes = {
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export const RawComponent = IndexPage;

const mapStateToProps = (state) => ({
  isMobile: state.layout.isMobile
});

export default connect(mapStateToProps)(withTranslation()(IndexPage));
