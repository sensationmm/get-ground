import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout';
import PageHeader from 'src/components/_layout/PageHeader/PageHeader';
import Sections from 'src/components/_layout/Sections/Sections';
import Tiles from 'src/components/_layout/Tiles/Tiles';
import Links from 'src/components/_layout/Links/Links';
import CurveBox from 'src/components/_layout/CurveBox/CurveBox';
import Button from 'src/components/_buttons/Button/Button';

import ImageSection1 from 'src/assets/images/partnerships.svg';
import ImageSection2 from 'src/assets/images/what-we-do.svg';
import ImageSection3 from 'src/assets/images/documents-modal.svg';
import ImageSection4 from 'src/assets/images/pricing.svg';

import IconProperty from 'src/assets/images/icon-company.svg';
import IconInvestment from 'src/assets/images/icon-welcome-home.svg';
import IconLending from 'src/assets/images/icon-bank.svg';
import IconEmployment from 'src/assets/images/icon-employee.svg';
import IconLegalDocs from 'src/assets/images/icon-legal-documents.svg';
import IconAccounting from 'src/assets/images/icon-company-name.svg';
import IconPartnerships from 'src/assets/images/icon-partnerships.svg';
import IconBankAccount from 'src/assets/images/icon-debit-card.svg';

import 'src/styles/pages/landing-pages.scss'

const WhatWeDo = () => {
  const [t] = useTranslation();

  return (
    <Fragment>
      <Layout>
        <div data-test="container-whatWeDo" className="whatWeDo" role="company-design landing">
          <PageHeader title={ t('whatWeDo.title') } text={ t('whatWeDo.intro') } />

          <div className="landing-content">
            <div className="landing-content-inner">
              <h2 className="center">{ t('whatWeDo.content.heading') }</h2>
              <div dangerouslySetInnerHTML={{ __html: t('whatWeDo.content.text.p1') }} />
              <div dangerouslySetInnerHTML={{ __html: t('whatWeDo.content.text.p2') }} />
              <div dangerouslySetInnerHTML={{ __html: t('whatWeDo.content.text.p3') }} />
              <div dangerouslySetInnerHTML={{ __html: t('whatWeDo.content.text.p4') }} />
              <div dangerouslySetInnerHTML={{ __html: t('whatWeDo.content.text.p5') }} />

              <Sections
                sections={[
                  {
                    heading: t('whatWeDo.sections.first.heading'),
                    text: t('whatWeDo.sections.first.text'),
                    image: ImageSection1
                  }, 
                  {
                    heading: t('whatWeDo.sections.second.heading'),
                    text: t('whatWeDo.sections.second.text'),
                    more: t('whatWeDo.sections.second.more'),
                    image: ImageSection2
                  }, 
                  {
                    heading: t('whatWeDo.sections.third.heading'),
                    text: t('whatWeDo.sections.third.text'),
                    image: ImageSection3
                  }, 
                  {
                    heading: t('whatWeDo.sections.fourth.heading'),
                    text: t('whatWeDo.sections.fourth.text'),
                    image: ImageSection4
                  }
                ]}
              />

            </div>
          </div>

          <CurveBox>
            <h2>{ t('whatWeDo.tiles.heading') }</h2>
            <div dangerouslySetInnerHTML={{ __html: t('whatWeDo.tiles.text') }} />

            <Tiles
              tiles={[
                { text: t('whatWeDo.tiles.content.property'), icon: IconProperty },
                { text: t('whatWeDo.tiles.content.investment'), icon: IconInvestment },
                { text: t('whatWeDo.tiles.content.lending'), icon: IconLending },
                { text: t('whatWeDo.tiles.content.employment'), icon: IconEmployment },
                { text: t('whatWeDo.tiles.content.legalDocs'), icon: IconLegalDocs },
                { text: t('whatWeDo.tiles.content.accounting'), icon: IconAccounting },
                { text: t('whatWeDo.tiles.content.partnerships'), icon: IconPartnerships },
                { text: t('whatWeDo.tiles.content.bankAccount'), icon: IconBankAccount }
              ]}
            />

            <div dangerouslySetInnerHTML={{ __html: t('whatWeDo.tiles.outro') }} />
          </CurveBox>

          <div className="landing-content padded">
            <div className="landing-content-inner">
              <center><Button classes="get-started" label="Get Started" onClick={() => navigate('/onboarding/intro') } /></center>

              <Links
                prev={{ label: t('menu.links.third'), link: '/how-it-works' }}
                next={{ label: t('menu.links.second'), link: '/advantages' }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  )
}

export default WhatWeDo;
