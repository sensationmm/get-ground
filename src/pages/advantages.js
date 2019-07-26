import React from 'react'
import { connect } from 'react-redux';
import Layout from 'src/components/Layout/Layout'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import PageHeader from 'src/components/_layout/PageHeader/PageHeader';
import PageIntro from 'src/components/_layout/PageIntro/PageIntro';
import LandingContent from 'src/components/_layout/LandingContent/LandingContent';
import Links from 'src/components/_layout/Links/Links';
import Columns from 'src/components/_layout/Columns/Columns';
import Cards from 'src/components/_layout/Cards/Cards';
import Comparison from 'src/components/_layout/Comparison/Comparison';
import CurveBox from 'src/components/_layout/CurveBox/CurveBox';
import Button from 'src/components/_buttons/Button/Button';

import TableSlider from 'src/components/TableSlider/TableSlider'

import ImageOthers from 'src/assets/images/how-it-works.svg'
import ImageMortgage from 'src/assets/images/palace.svg'
import ImageIncome from 'src/assets/images/advantages.svg'

import tick from 'src/assets/images/tick.svg'
import cross from 'src/assets/images/cross.svg'

import 'src/styles/pages/landing-pages.scss';


const Advantages = (props) => {
  const { isMobile } = props;
  const [t, i18n] = useTranslation()

  const ukTaxObj = i18n.t('advantages.tax', { returnObjects: true });

  const taxSections = [
    { copy: ukTaxObj.table.left['info1'], img: '' },
    { copy: ukTaxObj.table.left['info2'], img: '' },
    { copy: ukTaxObj.table.left['info3'], img: '' },
    { copy: ukTaxObj.table.left['info4'], img: '' },
    { copy: ukTaxObj.table.left['info5'], img: '' }
  ]

  const taxSmallFeed1 = [
    { copy: '', img: cross },
    { copy: '', img: cross },
    { copy: '', img: cross },
    { copy: '', img: cross },
    { copy: '', img: cross }
  ]

  const taxSmallFeed2 = [
    { copy: '', img: tick },
    { copy: '', img: tick },
    { copy: '', img: tick },
    { copy: '', img: tick },
    { copy: '', img: tick }
  ]

  const taxLargeFeed1 = [
    { copy: ukTaxObj.table.right.large.feed1['info1'], img: tick, override: true },
    { copy: ukTaxObj.table.right.large.feed1['info2'], img: tick },
    { copy: ukTaxObj.table.right.large.feed1['info3'], img: tick },
    { copy: ukTaxObj.table.right.large.feed1['info4'], img: tick },
    { copy: ukTaxObj.table.right.large.feed1['info5'], img: tick }
  ]

  const taxLargeFeed2 = [
    { copy: '', img: '' },
    { copy: ukTaxObj.table.right.large.feed2['info2'], img: cross },
    { copy: ukTaxObj.table.right.large.feed2['info3'], img: cross },
    { copy: ukTaxObj.table.right.large.feed2['info4'], img: cross },
    { copy: ukTaxObj.table.right.large.feed2['info5'], img: cross }
  ]

  return (
    <Layout>
      <div data-test="container-advantages" className="advantages" role="landing">
        <PageHeader title={ t('advantages.title') } text={ t('advantages.intro') } />

        <LandingContent>
          <PageIntro heading={ t('advantages.content.heading') } text={t('advantages.content.text') } />

          <TableSlider
            leftHandFeed={taxSections}
            smallFeed1={taxSmallFeed1}
            smallFeed2={taxSmallFeed2}
            feed1={taxLargeFeed1}
            feed2={taxLargeFeed2}
            tableName="tax"
            data-test="tax-table-slider"
            isMobile={isMobile}
          />

          <div className="table-footnote">{ t('advantages.tax.footnote') }</div>
        </LandingContent>

        <CurveBox>
          <PageIntro heading={ t('advantages.columns.heading') } text={t('advantages.columns.text') } />

          <Columns
            sections={[
              {
                heading: t('advantages.columns.content.others.heading'),
                text: t('advantages.columns.content.others.text'),
                image: ImageOthers
              }, 
              {
                heading: t('advantages.columns.content.mortgage.heading'),
                text: t('advantages.columns.content.mortgage.text'),
                image: ImageMortgage
              }, 
              {
                heading: t('advantages.columns.content.income.heading'),
                text: t('advantages.columns.content.income.text'),
                image: ImageIncome
              }
            ]}
          />

          <PageIntro heading={ t('advantages.comparison.heading') } />

          <Comparison
            heading={ t('advantages.comparison.tables.2year.heading') }
            compareA={{
              heading: t('advantages.comparison.tables.labels.uk') ,
              labels: [
                t('advantages.comparison.tables.labels.60percent'),
                t('advantages.comparison.tables.labels.75percent')
              ],
              values: [
                t('advantages.comparison.tables.2year.uk.60percent'),
                t('advantages.comparison.tables.2year.uk.75percent')
              ]
            }}
            compareB={{
              heading: t('advantages.comparison.tables.labels.nonUk') ,
              labels: [
                t('advantages.comparison.tables.labels.60percent'),
                t('advantages.comparison.tables.labels.75percent')
              ],
              values: [
                t('advantages.comparison.tables.2year.nonUk.60percent'),
                t('advantages.comparison.tables.2year.nonUk.75percent')
              ]
            }}
          />

          <Comparison
            heading={ t('advantages.comparison.tables.5year.heading') }
            compareA={{
              heading: t('advantages.comparison.tables.labels.uk'),
              labels: [
                t('advantages.comparison.tables.labels.60percent'),
                t('advantages.comparison.tables.labels.75percent')
              ],
              values: [
                t('advantages.comparison.tables.5year.uk.60percent'),
                t('advantages.comparison.tables.5year.uk.75percent')
              ]
            }}
            compareB={{
              heading: t('advantages.comparison.tables.labels.nonUk'),
              labels: [
                t('advantages.comparison.tables.labels.60percent'),
                t('advantages.comparison.tables.labels.75percent')
              ],
              values: [
                t('advantages.comparison.tables.5year.nonUk.60percent'),
                t('advantages.comparison.tables.5year.nonUk.75percent')
              ]
            }}
            footnote={t('advantages.comparison.tables.labels.updated')}
          />
        </CurveBox>

        <LandingContent>
          <Cards
            heading={ t('advantages.fees.heading') }
            cardA={{
              name: t('advantages.fees.getground.name'),
              price: t('advantages.fees.getground.price'),
              explanation: t('advantages.fees.getground.explanation'),
              content: t('advantages.fees.getground.content')
            }}
            cardB={{
              name: t('advantages.fees.others.name'),
              price: t('advantages.fees.others.price'),
              explanation: t('advantages.fees.others.explanation')
            }}
          />


          <center><Button classes="get-started" label={ t('home.cta')} onClick={() => navigate('/onboarding/intro') } /></center>

          <Links
            next={{ label: t('menu.links.third'), link: '/how-it-works' }}
            prev={{ label: t('menu.links.first'), link: '/what-we-do' }}
          />
        </LandingContent>
      </div>
    </Layout>
  )
}

Advantages.propTypes = {
  isMobile: PropTypes.bool
}

const mapStateToProps = state => ({
  isMobile: state.layout.isMobile
});

export const RawComponent = Advantages;

export default connect(mapStateToProps)(Advantages);
