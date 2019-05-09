import React from 'react';
import PropTypes from 'prop-types';

import './payment-info.scss';

/**
 * PaymentInfo
 * @param {object} props - props below (for JSdoc)
 * @param {string} accountSetupLabel - label for account set up
 * @param {string} monthlySubscriptionLabel - label for monthly sub
 * @param {string} vatLabel - label for VAT
 * @param {string} TotalLabel - label for the total amount
 * @param {any} accountSetupValue - value for account set up
 * @param {any} monthlySubscriptionValue - value for monthly sub
 * @param {any} vatValue - value for VAT
 * @param {any} totalValue - value for total amount
 * @return {JSXElement} PaymentInfo
 */
const PaymentInfo = props => {
  const {
    accountSetupLabel,
    monthlySubscriptionLabel,
    vatLabel,
    TotalLabel,
    accountSetupValue,
    monthlySubscriptionValue,
    vatValue,
    totalValue
  } = props;

  return (
    <div className="payment-info" data-test="component-payment-info">
      <div className="payment-info--row">
        <span>{accountSetupLabel}</span><span className="payment-info--value">£{accountSetupValue}</span>
      </div>
      <div className="payment-info--row">
        <span>{monthlySubscriptionLabel}</span><span className="payment-info--value">£{monthlySubscriptionValue}</span>
      </div>
      <div className="payment-info--row">
        <span>{vatLabel}</span><span className="payment-info--value">£{vatValue}</span>
      </div>
      <div className="payment-info--row payment-info--total">
        <span>{TotalLabel}</span><span className="payment-info--value">£{totalValue}</span>
      </div>
    </div>
  );
}

PaymentInfo.propTypes = {
  accountSetupLabel: PropTypes.string,
  monthlySubscriptionLabel: PropTypes.string,
  vatLabel: PropTypes.string,
  TotalLabel: PropTypes.string,
  accountSetupValue: PropTypes.any,
  monthlySubscriptionValue: PropTypes.any,
  vatValue: PropTypes.any,
  totalValue: PropTypes.any,
};

export default PaymentInfo;
