import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import moment from 'moment';
import classNames from 'classnames';

import { getByValue } from 'src/utils/functions';
import { companyModel } from 'src/state/reducers/companies';

import Layout from 'src/components/Layout/Layout';

import '../company-overview.scss';

/**
 * BankAccount
 * @author Kevin Reynolds
 * @param {object} props - for JSDoc
 * @return {ReactComponent} BankAccount
 */
const BankAccount = (props) => {
  const [ t ] = useTranslation();
  const { companies, activeCompany } = props;

  const company = activeCompany !== null ? getByValue(companies, 'id', activeCompany) : companyModel;
  const { bank_account } = company;

  const groupedTransactions = bank_account.transactions.reduce((accum, { date, name, sum, balance }) => {
    if (!accum[date]) accum[date] = [];
    accum[date].push({ name, sum, balance });
    return accum;
  }, {});

  const transactionDates = Object.keys(groupedTransactions);

  return (
    <Layout secure companyID>
      <div className="company-overview" data-test="component-bank-account">
      <div className="company-header link" onClick={() => navigate('/dashboard/company')}>
          { company.address.premise }, { company.address.postcode }
        </div>

        <div className="bank-header" onClick={() => navigate('/dashboard/company/bank-account/details')}>
          <div className="bank-header-company">{ company.name }</div>
          <div className="bank-header-account">{ company.bank_account.sort_code } { company.bank_account.account_number }</div>
          
          <div className="bank-header-balance">
            <p>{ t('dashboard.company.bankAccount.available') }</p>
            { company.bank_account.balance }
          </div>
        </div>

        {
          transactionDates.map((date, count) => {
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
          })
        }
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  activeCompany: state.activeCompany,
  companies: state.companies
});

BankAccount.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  companies: PropTypes.array,
  activeCompany: PropTypes.string
};

export const RawComponent = BankAccount;

export default connect(mapStateToProps, null)(BankAccount);
