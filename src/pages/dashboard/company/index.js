import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

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
const Company = (props) => {
  const [ t ] = useTranslation();
  const { companies, activeCompany } = props;

  const company = companies[activeCompany];

  return (
    <Layout secure>
      <div className="company-overview" data-test="component-company">
        <div className="company-header">{ company.address.premise }, { company.address.postcode }</div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.overview.sections.company') }</h2>
          <p>{ company.name }</p>
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.overview.sections.address') }</h2>
          <p>{ company.address.premise }</p>
          <p>{ company.address.street }</p>
          <p>{ company.address.posttown }</p>
          <p>{ company.address.postcode }</p>
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.overview.sections.shareholders') }</h2>
          {
            company.shareholders.map((shareholder, count) => {
              return <p key={`shareholder-${count}`}>{ shareholder }</p>
            })
          }
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.overview.sections.directors') }</h2>
          {
            company.directors.map((director, count) => {
              return <p key={`director-${count}`}>{ director }</p>
            })
          }
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.overview.sections.documents') }</h2>
          <ul>
          {
            company.documents.map((document, count) => {
              return <li key={`document-${count}`}>{ document.name }</li>
            })
          }
          </ul>
        </div>
        
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
            classes="account"
            label={ t('dashboard.company.overview.ctaSecondary') }
            fullWidth
            onClick={() => navigate('/dashboard/company/bank-account')}
          />
        </Form>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  activeCompany: state.activeCompany,
  companies: state.companies
});

Company.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  companies: PropTypes.array,
  activeCompany: PropTypes.number
};

export const RawComponent = Company;

export default connect(mapStateToProps, null)(Company);
