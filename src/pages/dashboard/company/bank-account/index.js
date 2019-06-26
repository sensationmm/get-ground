import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import moment from 'moment';
import classNames from 'classnames';

import { getByValue } from 'src/utils/functions';

import Layout from 'src/components/Layout/Layout';

import '../company-overview.scss';

/**
 * BankAccount
 * @author Kevin Reynolds
 * @param {object} props - for JSDoc
 * @return {ReactComponent} BankAccount
 */
class BankAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      address: '',
      company: null,
      groupedTransactions: null,
      transactionDates: null,
      showInfo: false
    };
  }

  render() {
    const { companies, activeCompany, t } = this.props;
    const { 
      groupedTransactions, 
      transactionDates, 
      hasLoaded, 
      company, 
      address,
      showInfo
    } = this.state;

    if ( activeCompany && !hasLoaded ) {
      const companyData = getByValue(companies, 'id', activeCompany);
      const groupedTransactions = companyData.bank_account.transactions.reduce((accum, { date, name, sum, balance }) => {
        if (!accum[date]) accum[date] = [];
        accum[date].push({ name, sum, balance });
        return accum;
      }, {});

      this.setState({
        groupedTransactions: groupedTransactions,
        transactionDates: Object.keys(groupedTransactions),
        address: companyData.property_address.address,
        company: companyData,
        hasLoaded: true
      });
    }

    return (
      <Layout secure companyID>
        { hasLoaded &&
          <div className="company-overview" data-test="component-bank-account">
            <h1>{ t('dashboard.company.bankAccount.title') }</h1>

            <div className="company-header back" onClick={() => navigate('/dashboard/company')}>
              { t('dashboard.company.back') }
            </div>

            <div className="bank-header">
              <div className="bank-header-label">{ t('dashboard.company.address') }</div>
              { address.premise }

              <div className="bank-header-account">
                <div>
                  <div className="bank-header-label">{ t('dashboard.company.bankAccount.accountName') }</div>
                  {/* { company.name } */}
                </div>

                <div>
                  <div className="bank-header-label">{ t('dashboard.company.bankAccount.accountNumber') }</div>
                  { company.bank_account.account_number }
                </div>

                <div>
                  <div className="bank-header-label">{ t('dashboard.company.bankAccount.sortCode') }</div>
                  { company.bank_account.sort_code }
                </div>
              </div>
              
              <div className="bank-header-balance">
                <div className="bank-header-label">{ t('dashboard.company.bankAccount.available') }</div>
                { company.bank_account.balance }
              </div>

              {showInfo &&
                <div className="bank-header-info">
                  <div className="bank-header-label">{ t('dashboard.company.bankAccount.iban') }</div>
                  <p>{ company.bank_account.iban }</p>

                  <div className="bank-header-label">{ t('dashboard.company.bankAccount.branchAddress') }</div>
                  { company.bank_account.address.branch },
                  { company.bank_account.address.street },
                  { company.bank_account.address.town },
                  { company.bank_account.address.postcode }
                </div>
              }

              <div 
                className={classNames('bank-header-toggle', { open: showInfo })}
                onClick={() => this.setState({ showInfo: !showInfo })}
              >
                { showInfo ? t('dashboard.company.showLess') : t('dashboard.company.showMore') }
              </div>
            </div>

            <div className="bank-transactions">
            {transactionDates.map((date, count) => {
              return (
                <div key={`date-${count}`}>
                  <div className="transaction-header">{moment(date).format('Do MMMM YYYY')}</div>
                  {
                    groupedTransactions[date].map((transation, i) => {
                      return (
                        <div key={`transaction-${count}-${i}`} className="company-overview-section transaction">
                          <div className="transaction-name">{transation.name}</div>
                          <div className="transaction-value">
                            <div className={classNames('transaction-sum', { debit: transation.sum.substring(0,1) === '-'})}>
                              {transation.sum}
                            </div>
                            <div className="transaction-balance">{transation.balance}</div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })}
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

BankAccount.propTypes = {
  t: PropTypes.func,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  companies: PropTypes.array,
  activeCompany: PropTypes.number
};

export const RawComponent = BankAccount;

export default connect(mapStateToProps, null)(withTranslation()(BankAccount));
