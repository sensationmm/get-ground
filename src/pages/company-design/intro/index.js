
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import Button from 'src/components/_buttons/Button/Button';
import Layout from 'src/components/Layout/Layout';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import { addCompany, setActiveCompany } from 'src/state/actions/activeCompany';
import companyService from 'src/services/Company';
export const CompanyService = new companyService();

import house from 'src/assets/images/fullhousepure.svg';

import 'src/styles/pages/intro.scss';

/**
 * CompanyDesignIntroContainer
 * @param {object} props - for JSDoc
 * @return {ReactComponent} CompanyDesignIntroContainer
 */
class CompanyDesignIntroContainer extends Component {
  constructor(props) {
    super(props);
  }

/**
  * handleCreateCompany
  * @param {string} navigateUrl - url to navigate to 
  * @param {boolean} isAddServices - boolean for whether the user has chosen to add services or not
  * @return {void}
  */
  handleCreateCompany = (navigateUrl, isAddServices) => {
    const { showLoader } = this.props;
    showLoader();
    this.createCompany(navigateUrl, isAddServices);
  };

/**
  * handleCreateCompany
  * @param {string} navigateUrl - url to navigate to 
  * @param {boolean} isAddServices - boolean for whether the user has chosen to add services or not
  * @return {void}
  */
  createCompany = (navigateUrl, isAddServices) => {
    navigate(navigateUrl);
    CompanyService.addCompany(isAddServices).then(response => {
      this.handleCreateCompanyResponse(navigateUrl, response);
    });
  };

/**
  * handleCreateCompany
  * @param {boolean} navigateUrl - url to navigate to 
  * @param {object} response - response from CompanyService
  * @return {void}
  */
  handleCreateCompanyResponse = (navigateUrl, response) => {
    const { hideLoader, addCompany, setActiveCompany } = this.props;
    hideLoader();
    if (response.status === 201) {
      navigate(navigateUrl);
      addCompany(response.data);
      setActiveCompany(response.data.id);
    } else {
      // Do Something
    }
  }

  render() {
    const { t } = this.props;

    return (
      <Layout>
        <div data-test="container-company-design-intro" className="intro" role="brochure fullscreen">
          <img className="hero-image" src={house} />
          <h1>{t('companyDesign.intro.title')}</h1>
          <p className="wrap">{t('companyDesign.intro.para1')}</p>
          <p className="wrap">{t('companyDesign.intro.para2')}</p>
          <p className="wrap">{t('companyDesign.intro.para3')}</p>
          <div className="intro--buttons-container">
            <Button
              data-test="add-services-button"
              onClick={() => this.handleCreateCompany('/company-design/add-services', true)}
              fullWidth
              label={t('companyDesign.intro.button1')}
            />
            <Button
              data-test="skip-services-button"
              onClick={() => this.handleCreateCompany('/company-design', false)}
              opaque
              small
              label={t('companyDesign.intro.button2')}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

CompanyDesignIntroContainer.propTypes = {
  t: PropTypes.func,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  addCompany: PropTypes.func,
  setActiveCompany: PropTypes.func
};

const actions = {
  showLoader,
  hideLoader,
  addCompany,
  setActiveCompany
};

export const RawComponent = CompanyDesignIntroContainer;

export default connect(null, actions)(withTranslation()(CompanyDesignIntroContainer));


