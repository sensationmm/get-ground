import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { ProcessSection } from 'src/components/ProcessSection/ProcessSection'
import Layout from 'src/components/Layout/Layout'
import Button from 'src/components/_buttons/Button/Button'
import PropertyImage from 'src/assets/images/company-property-details.svg'
import PurchaseImage from 'src/assets/images/company-purchase-details.svg'
import SolicitorImage from 'src/assets/images/company-solicitor-details.svg'
import ShareholderImage from 'src/assets/images/company-shareholder-details.svg'
import ServicesImage from 'src/assets/images/company-add-services.svg'
import TaxQuestion from 'src/assets/images/company-tax-question.svg'
import PaymentImage from 'src/assets/images/company-payment.svg'

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
    const { t, i18n, additionalServices } = this.props;
    const sectionsContent = i18n.t('companyDesign.progressTracker.sections', { returnObjects: true });
    const sectionsConfig = {
      sections: [

        {
          'title': sectionsContent['step2'].title,
          'imageAltText': sectionsContent['step2'].imageAltText,
          'copy': sectionsContent['step2'].copy,
          'path': '/company-design/property-address',
          'status': 'complete',
          'image': PropertyImage,
        },
        {
          'title': sectionsContent['step3'].title,
          'imageAltText': sectionsContent['step3'].imageAltText,
          'copy': sectionsContent['step3'].copy,
          'path': '/company-design/purchase-details',
          'status': 'incomplete',
          'image': PurchaseImage,
        },
        {
          'id': 'solicitor',
          'title': sectionsContent['step4'].title,
          'imageAltText': sectionsContent['step4'].imageAltText,
          'copy': sectionsContent['step4'].copy,
          'path': '/company-design/solicitor-details',
          'status': 'incomplete',
          'image': SolicitorImage,
        },
        {
          'title': sectionsContent['step5'].title,
          'imageAltText': sectionsContent['step5'].imageAltText,
          'copy': sectionsContent['step5'].copy,
          'path': '/company-design/shareholder-details',
          'status': 'to_do',
          'image': ShareholderImage,
        },
        {
          'title': sectionsContent['step6'].title,
          'imageAltText': sectionsContent['step6'].imageAltText,
          'copy': sectionsContent['step6'].copy,
          'path': '/company-design/tax-questions',
          'status': 'to_do',
          'image': TaxQuestion,
        },
        {
          'title': sectionsContent['step7'].title,
          'imageAltText': sectionsContent['step7'].imageAltText,
          'copy': sectionsContent['step7'].copy,
          'path': '/company-design/payment',
          'status': 'to_do',
          'image': PaymentImage,
        }
      ]
    };

    if (additionalServices.hasUsedAdditionalServices) {
      sectionsConfig.sections.unshift({
        'title': sectionsContent['step1'].title,
        'imageAltText': sectionsContent['step1'].imageAltText,
        'copy': sectionsContent['step1'].copy,
        'path': '/company-design/add-services',
        'status': 'to_do',
        'image': ServicesImage,
      });
    }

    if (additionalServices.solicitor) {
      sectionsConfig.sections.map((section, i) => {
        if (section.id === 'solicitor') {
          sectionsConfig.sections.splice(i, 1);
        }
      });
    }

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
  additionalServices: state.additionalServices
});

ProcessTracker.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  additionalServices: PropTypes.object,
};

export default connect(mapStateToProps, null)(withTranslation()(ProcessTracker))
