
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout';
import TextImage from 'src/components/_layout/TextImage/TextImage';
import successImg from 'src/assets/images/company-complete.svg';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import companyService from 'src/services/Company';
const CompanyService = new companyService();

/**
 * Dashboard
 * @param {object} props - for JSDoc
 * @return {ReactComponent} Dashboard
 */
class CompanyComplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkbox: false
    }
  }

  componentDidMount() {
    const { showLoader, hideLoader, company } = this.props;
    
    showLoader();
    if(company) {
      CompanyService.confirmCompany(company.id).then(() => {
        hideLoader();
      });
    }
  }

  render() {
    const { t } = this.props

    return (
      <Layout>
        <div data-test="container-company-complete" className="company-complete" role="fullscreen form-page hasCurve">
          <TextImage
            title={t('companyDesign.companyComplete.title')}
            image={successImg}
            text={`<p>${t('companyDesign.companyComplete.copy')}</p><p>${ t('companyDesign.companyComplete.info') }</p>`}
            buttonAction={() => navigate('/dashboard')}
            buttonLabel={t('companyDesign.companyComplete.button')}
          />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  company: state.companies.find(company => company.id === state.activeCompany)
});

const actions = { 
  showLoader,
  hideLoader
};

CompanyComplete.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  company: PropTypes.object,
};

export const RawComponent = CompanyComplete;

export default connect(mapStateToProps, actions)(withTranslation()(CompanyComplete));
