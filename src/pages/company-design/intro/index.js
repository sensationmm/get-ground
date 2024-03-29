
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import Layout from 'src/components/Layout/Layout';
import TextImage from 'src/components/_layout/TextImage/TextImage'

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
    if (response.status === 200) {
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
        <div data-test="container-company-design-intro" className="intro" role="fullscreen form-page">

          <TextImage
            title={t('companyDesign.intro.title')}
            image={house}
            text={`<p>${t('companyDesign.intro.para1')}</p><p>${t('companyDesign.intro.para2')}</p><p>${t('companyDesign.intro.para3')}</p>`}
            buttonAction={() => this.handleCreateCompany('/company-design/add-services', true)}
            buttonLabel={t('companyDesign.intro.button1')}
            buttonSecondaryAction={() => this.handleCreateCompany('/company-design', false)}
            buttonSecondaryLabel={t('companyDesign.intro.button2')}
          />
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


