import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import functions from 'src/utils/functions';

import Layout from 'src/components/Layout/Layout';
import Form from 'src/components/_layout/Form/Form';
import Button from 'src/components/_buttons/Button/Button';

import './company-overview.scss';

/**
 * Company
 * @author Kevin Reynolds
 * @param {object} props - for JSDoc
 * @return {ReactComponent} Company
 */
class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      address: '',
      company: null
    };
  }

  render() {
    const { companies, activeCompany, t } = this.props;
    const { hasLoaded, address, company } = this.state;

    if ( activeCompany && !hasLoaded ) {
      const companyData = functions.getByValue(companies, 'id', activeCompany);

      this.setState({
        ...this.state,
        company: companyData,
        address: companyData.property_address.address,
        hasLoaded: true
      });
    }

    return (
      <Layout secure>
        { hasLoaded &&
          <div className="company-overview my-property" data-test="component-company">
            <h1>{ t('dashboard.company.title') }</h1>

            <div className="company-header">{ address.premise } { address.street }, { address.postcode }</div>

            <div className="company-overview-section">
              <h2>{ t('dashboard.company.overview.sections.company') }</h2>
              { company.name }
            </div>

            <div className="company-overview-section">
              <h2>{ t('dashboard.company.overview.sections.address') }</h2>
              <p>{ address.premise } { address.street }<br />
              { address.posttown }<br />
              { address.postcode }</p>
            </div>

            <div className="company-overview-section">
              <h2>{ t('dashboard.company.overview.sections.directors') }</h2>
              <ul>
              {company.shareholder_details.collection.map((shareholder, count) => {
                if (shareholder.is_director) {
                  return <li key={`director-${count}`}>{`${shareholder.first_name} ${shareholder.last_name}`}</li>
                }
              })}
              </ul>
            </div>

            <div className="company-overview-section">
              <h2>{ t('dashboard.company.overview.sections.shareholders') }</h2>
              <ul>
              {company.shareholder_details.collection.map((shareholder, count) => {
                if (!shareholder.is_director) {
                  return <li key={`shareholder-${count}`}>{`${shareholder.first_name} ${shareholder.last_name}`}</li>
                }
              })}
              </ul>
            </div>

            {/* <div className="company-overview-section">
              <h2>{ t('dashboard.company.overview.sections.documents') }</h2>
              <ul>
              {
                company.documents.map((document, count) => {
                  return <li key={`document-${count}`}>{ document.name }</li>
                })
              }
              </ul>
            </div> */}
            
            <Form>
              <Button
                data-test="manage-company-button"
                classes="primary"
                label={ t('dashboard.company.overview.ctaPrimary') }
                fullWidth
                onClick={() => navigate('/dashboard/company/manage')}
              />

              <Button
                data-test="bank-account-button"
                classes="primary"
                label={ t('dashboard.company.overview.ctaSecondary') }
                fullWidth
                onClick={() => navigate('/dashboard/company/bank-account')}
              />
            </Form>
          </div> 
        }
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  activeCompany: state.testing.activeCompany,
  companies: state.testing.companies
});

Company.propTypes = {
  t: PropTypes.func.isRequired,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  companies: PropTypes.array,
  activeCompany: PropTypes.number
};

export const RawComponent = Company;

export default connect(mapStateToProps, null)(withTranslation()(Company));
