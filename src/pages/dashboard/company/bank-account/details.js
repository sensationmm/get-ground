import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import functions from 'src/utils/functions';

import Layout from 'src/components/Layout/Layout';

import '../company-overview.scss';

/**
 * Details
 * Bank account details screen
 * @author Kevin Reynolds
 * @param {object} props - for JSDoc
 * @return {ReactComponent} Details
 */
class Details extends Component {
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
    const { company, address, hasLoaded } = this.state

    if ( activeCompany && !hasLoaded ) {
      const companyData = functions.getByValue(companies, 'id', activeCompany);

      this.setState({
        ...this.state,
        company: companyData,
        address: companyData.property_address.address,
        hasLoaded: true
      })

    }

    return (
      <Layout secure companyID>
        { hasLoaded &&
          <div className="company-overview" data-test="component-bank-details">
            <div className="back" onClick={() => navigate('/dashboard/company/bank-account')}>{ t('dashboard.company.bankAccount.back') }</div>

            <div className="company-header link" onClick={() => navigate('/dashboard/company')}>
              { address.premise }, { address.postcode }
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
        }
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  activeCompany: state.activeCompany,
  companies: state.companies
});

Details.propTypes = {
  t: PropTypes.func.isRequired,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  companies: PropTypes.array,
  activeCompany: PropTypes.number
};

export const RawComponent = Details;

export default connect(mapStateToProps, null)(withTranslation()(Details));
