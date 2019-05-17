import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { ProcessSection } from 'src/components/ProcessSection/ProcessSection'
import Layout from 'src/components/Layout/Layout'
import Button from 'src/components/_buttons/Button/Button'
import PropertyImage from 'src/assets/images/property.svg'
import PurchaseImage from 'src/assets/images/purchase.svg'
import SolicitorImage from 'src/assets/images/solicitor.svg'
import ShareholderImage from 'src/assets/images/shareholder.svg'
import ServicesImage from 'src/assets/images/services.svg'

import './process-tracker.scss'

/**
 * ProcessTracker
 * @return {ReactComponent} ProcessTracker
 */
export class ProcessTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkbox: false
    }
  }

  render() {
    const { t, i18n } = this.props;
    const sectionsContent = i18n.t('companyDesign.progressTracker.sections', { returnObjects: true });
    const sectionsConfig = {
      sections: [
        {
          'title': sectionsContent['step1'].title,
          'imageAltText': sectionsContent['step1'].imageAltText,
          'copy': sectionsContent['step1'].copy,
          'path': '/company-design/property-address',
          'status': 'complete',
          'image': PropertyImage,
        },
        {
          'title': sectionsContent['step2'].title,
          'imageAltText': sectionsContent['step2'].imageAltText,
          'copy': sectionsContent['step2'].copy,
          'path': '/company-design/purchase-details',
          'status': 'incomplete',
          'image': PurchaseImage,
        },
        {
          'title': sectionsContent['step3'].title,
          'imageAltText': sectionsContent['step3'].imageAltText,
          'copy': sectionsContent['step3'].copy,
          'path': '/company-design/solicitor-details',
          'status': 'incomplete',
          'image': SolicitorImage,
        },
        {
          'title': sectionsContent['step4'].title,
          'imageAltText': sectionsContent['step4'].imageAltText,
          'copy': sectionsContent['step4'].copy,
          'path': '/company-design/shareholder-details',
          'status': 'to_do',
          'image': ShareholderImage,
        },
        {
          'title': sectionsContent['step5'].title,
          'imageAltText': sectionsContent['step5'].imageAltText,
          'copy': sectionsContent['step5'].copy,
          'path': '/company-design/add-services',
          'status': 'to_do',
          'image': ServicesImage,
        }
      ]
    };

    return (
      <Fragment>
          <Layout secure>
            <div className="process-tracker" role="fullscreen company-design">
              <h3 className="process-tracker--title">{t('companyDesign.progressTracker.inProgressTitle')}</h3>
              <div className="process-tracker-sections">
                {sectionsConfig.sections.map((section, idx) => <ProcessSection key={`${idx} + ${section.title}`} {...section} />)}
              </div>
              <Button classes="primary" fullWidth/>
            </div>
          </Layout>
        </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader,
});

ProcessTracker.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null)(withTranslation()(ProcessTracker))
