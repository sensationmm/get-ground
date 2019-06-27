
import React, { Component } from 'react';
import { Link } from 'gatsby';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'src/components/_buttons/Button/Button';
import Layout from 'src/components/Layout/Layout';
import successImg from 'src/assets/images/company-complete.svg';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import companyService from 'src/services/Company';
const CompanyService = new companyService();

import './company-complete.scss';

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
    CompanyService.confirmCompany(company.id).then(() => {
      hideLoader();
    });
  }

  render() {
    const { t } = this.props

    return (
      <Layout>
        <div data-test="container-company-complete" className="company-complete" role="fullscreen">
          <div className="intro--hero-image"><img className="company-complete--image" src={successImg} /></div>
          <h1 className="company-complete--heading">{t('companyDesign.companyComplete.title')}</h1>
          <p className="company-complete--copy">{t('companyDesign.companyComplete.copy')}</p>
          <p className="company-complete--copy">{ t('companyDesign.companyComplete.info') }</p>
          <Link to="/dashboard">
            <Button label={t('companyDesign.companyComplete.button')} classes="full" />
          </Link>
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
