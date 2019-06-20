import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { getByValue } from 'src/utils/functions';

import Layout from 'src/components/Layout/Layout';
import Form from 'src/components/_layout/Form/Form';
import Button from 'src/components/_buttons/Button/Button';
import { companyModel } from 'src/state/reducers/companies';

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

  const company = activeCompany !== null ? getByValue(companies, 'id', activeCompany) : companyModel;

  return (
    <Layout secure companyID>
      <div className="company-overview my-property" data-test="component-company">
        <h1>{ t('dashboard.company.title') }</h1>

        <div className="company-header">{ company.address.premise }, { company.address.postcode }</div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.overview.sections.company') }</h2>
          <p>{ company.name }</p>
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.overview.sections.address') }</h2>
          <p>{ company.address.premise }<br />
          { company.address.street }<br />
          { company.address.posttown }<br />
          { company.address.postcode }</p>
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.overview.sections.shareholders') }</h2>
          {company.shareholders.map((shareholder, count) => {
            return <p key={`shareholder-${count}`}>{ shareholder }</p>
          })
          }
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.overview.sections.directors') }</h2>
          {company.directors.map((director, count) => {
            return <p key={`director-${count}`}>{ director }</p>
          })}
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.overview.sections.documents') }</h2>
          <ul>
          {company.documents.map((document, count) => {
            return <li key={`document-${count}`}>{ document.name }</li>
          })}
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
            classes="primary"
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
  activeCompany: PropTypes.string
};

export const RawComponent = Company;

export default connect(mapStateToProps, null)(Company);
