import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { getByValue } from 'src/utils/functions';
import { companyModel } from 'src/state/reducers/companies';

import Layout from 'src/components/Layout/Layout';

import '../company-overview.scss';

/**
 * Details
 * Bank account details screen
 * @author Kevin Reynolds
 * @param {object} props - for JSDoc
 * @return {ReactComponent} Details
 */
const Details = (props) => {
  const [ t ] = useTranslation();
  const { companies, activeCompany } = props;

  const company = activeCompany !== null ? getByValue(companies, 'id', activeCompany) : companyModel;

  return (
    <Layout secure companyID>
      <div className="company-overview" data-test="component-bank-details">
        <div className="back" onClick={() => navigate('/dashboard/company/bank-account')}>{ t('dashboard.company.bankAccount.back') }</div>

        <div className="company-header link" onClick={() => navigate('/dashboard/company')}>
          { company.address.premise }, { company.address.postcode }
        </div>

        <h1>{ company.bank_account.name }</h1>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.bankAccount.sortCode') }</h2>
          <p>{ company.bank_account.sort_code }</p>
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.bankAccount.accountNumber') }</h2>
          <p>{ company.bank_account.account_number }</p>
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.bankAccount.address') }</h2>
          <p>{ company.bank_account.address.branch }</p>
          <p>{ company.bank_account.address.street }</p>
          <p>{ company.bank_account.address.town } { company.bank_account.address.postcode }</p>
        </div>

        <div className="company-overview-section">
          <h2>{ t('dashboard.company.bankAccount.iban') }</h2>
          <p>{ company.bank_account.iban }</p>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  activeCompany: state.activeCompany,
  companies: state.companies
});

Details.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  companies: PropTypes.array,
  activeCompany: PropTypes.string
};

export const RawComponent = Details;

export default connect(mapStateToProps, null)(Details);
