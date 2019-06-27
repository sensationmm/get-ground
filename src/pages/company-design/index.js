import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { ProcessSection } from 'src/components/ProcessSection/ProcessSection'
import Layout from 'src/components/Layout/Layout'
import PropertyImage from 'src/assets/images/company-property-details.svg'
import PurchaseImage from 'src/assets/images/company-purchase-details.svg'
import SolicitorImage from 'src/assets/images/company-solicitor-details.svg'
import ShareholderImage from 'src/assets/images/company-shareholder-details.svg'
import ServicesImage from 'src/assets/images/company-add-services.svg'
import TaxQuestion from 'src/assets/images/company-tax-question.svg'
import PaymentImage from 'src/assets/images/company-payment.svg'

import { showLoader, hideLoader } from 'src/state/actions/loader'

import companyService from 'src/services/Company'
const CompanyService = new companyService()

import './process-tracker.scss'
import { navigate } from 'gatsby';

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

  componentDidMount() {
    this.getProgress();
  }

  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;

    if(!isLoading && isLoading !== prevProps.isLoading) {
      this.getProgress();
    }
  }

  getProgress = () => {
    const { company, showLoader, hideLoader } = this.props;

    showLoader();

    if (company && company.id) {
      CompanyService.getCompany(company.id).then(() => {
        hideLoader();
        
        if (this.props.company.progress.overall_status === 'COMPLETE') {
          navigate('/company-design/company-complete');
        }
      })
    } else {
      navigate('/dashboard');
    }
  }

  render() {
    const { t, i18n, company } = this.props;
    const sectionsContent = i18n.t('companyDesign.progressTracker.sections', { returnObjects: true });
    let sectionsConfig;

    if (company) {
      const progress = company.progress;
      sectionsConfig = {
        sections: [
          {
            'title': sectionsContent['step2'].title,
            'imageAltText': sectionsContent['step2'].imageAltText,
            'copy': sectionsContent['step2'].copy,
            'path': '/company-design/property-address',
            'status': progress && progress.property_address_status,
            'image': PropertyImage,
          },
          {
            'title': sectionsContent['step3'].title,
            'imageAltText': sectionsContent['step3'].imageAltText,
            'copy': sectionsContent['step3'].copy,
            'path': '/company-design/purchase-details',
            'status': progress && progress.purchase_details_status,
            'image': PurchaseImage,
          },
          {
            'id': 'solicitor',
            'title': sectionsContent['step4'].title,
            'imageAltText': sectionsContent['step4'].imageAltText,
            'copy': sectionsContent['step4'].copy,
            'path': '/company-design/solicitor-details',
            'status': progress && progress.solicitor_details_status,
            'image': SolicitorImage,
          },
          {
            'title': sectionsContent['step5'].title,
            'imageAltText': sectionsContent['step5'].imageAltText,
            'copy': sectionsContent['step5'].copy,
            'path': '/company-design/shareholder-details',
            'status': progress && progress.shareholder_details_status,
            'image': ShareholderImage,
          },
          {
            'title': sectionsContent['step6'].title,
            'imageAltText': sectionsContent['step6'].imageAltText,
            'copy': sectionsContent['step6'].copy,
            'path': '/company-design/tax-questions',
            'status': progress && progress.tax_questions_status,
            'image': TaxQuestion,
          },
          {
            'title': sectionsContent['step7'].title,
            'imageAltText': sectionsContent['step7'].imageAltText,
            'copy': sectionsContent['step7'].copy,
            'path': '/company-design/payment',
            'status': progress && progress.payment_status,
            'image': PaymentImage,
          }
        ]
      };

      if (company && company.additional_services_required) {
        sectionsConfig.sections.unshift({
          'title': sectionsContent['step1'].title,
          'imageAltText': sectionsContent['step1'].imageAltText,
          'copy': sectionsContent['step1'].copy,
          'path': '/company-design/add-services',
          'status': progress && progress.additional_services_status,
          'image': ServicesImage,
        });
      }

      if (company && company.additional_services && company.additional_services.solicitor) {
        sectionsConfig.sections.map((section, i) => {
          if (section.id === 'solicitor') {
            sectionsConfig.sections.splice(i, 1);
          }
        });
      }

    }

    return (
      <Fragment>
        <Layout secure>
          <div className="process-tracker" role="fullscreen company-design">
            { company &&
              <>
                <h3 className="process-tracker--title">
                  {t('companyDesign.progressTracker.inProgressTitle', { count: sectionsConfig.sections.length })}
                </h3>
                <div className="process-tracker-sections">
                  {sectionsConfig.sections.map((section, idx) => (
                    <ProcessSection 
                      key={`${idx} + ${section.title}`} 
                      {...section} 
                    />)
                  )}
                </div>
              </>
            }
          </div>
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader,
  company: state.companies.find(company => company.id === state.activeCompany)
});

const actions = { showLoader, hideLoader };

ProcessTracker.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  company: PropTypes.object,
  isLoading: PropTypes.bool
};

export default connect(mapStateToProps, actions)(withTranslation()(ProcessTracker))
