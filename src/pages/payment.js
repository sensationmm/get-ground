import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { Elements, StripeProvider } from 'react-stripe-elements';

import formUtils from 'src/utils/form';

import Layout from 'src/components/Layout/Layout'
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import PaymentInfo from 'src/components/PaymentInfo/PaymentInfo';
import Form from 'src/components/_layout/Form/Form';
import InputNumber from 'src/components/_form/InputNumber/InputNumber';
import Stripe from 'src/components/Stripe/Stripe';

import { showLoader, hideLoader } from 'src/state/actions/loader';

/**
 * Payment
 * @param {object} valid - boolean to check if card details are complete (for JSdoc)
 * @return {JSXElement} Payment
 */
class Payment extends Component {
  constructor(props) {
    super(props);

    this.baseSetupValue = 500;
    this.baseMonthlySubValue = 20;
    this.vatValue = (this.baseSetupValue + this.baseMonthlySubValue) / 100 * 20; 

    this.state = {
      ...formUtils.initFormState({
        numberOfCompanies: '1'
      }),
      isStripeValid: true,
      accountSetupValue: this.baseSetupValue,
      monthlySubscriptionValue: this.baseMonthlySubValue,
      vatValue: this.vatValue,
      totalValue: this.baseSetupValue + this.baseMonthlySubValue + this.vatValue,
      stripeToken: '',
      showErrorMessage: false,
      errors: {}
    };

    this.config = [];
  }

  validateForm = () => {
    const requestUrl = 'https://staging-backend-236514.appspot.com/api/v1/users/1/payment';
    const { showLoader, hideLoader } = this.props;
    const { stripeToken, isStripeValid, values: { numberOfCompanies } } = this.state;

    /* istanbul ignore else */
    if (formUtils.validateForm(this) && isStripeValid) {
      showLoader();

      axios({
        method: 'post',
        url: requestUrl,
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjk1LCJSb2xlIjoiIiwiZXhwIjoxNTU2ODk0NDU3LCJuYmYiOjE1NTY4OTA4NTh9.x2Y3eYksHOmaxo7HF63tJXQIW7gQASUyRxDzwZtoCTw',
          'Content-Type': 'application/json',
        },
        data: {
          'stripe_token': stripeToken,
          'quantity': numberOfCompanies
        }
      }).then(response => {
        if (response.status === 201) {
          hideLoader();
          // this.props.history.push('/confirmation');
        }
      }).catch((e) => {
        hideLoader();

        this.setState({
          ...this.state,
          errors: {
            form: 'There was an issue with your payment'
          },
          showErrorMessage: true
        });
      });
    }
  }

  /**
    * @param {number} input - value to set
    * @return {void}
    */
  updatePaymentValues = (input) => {
    let setupValue = '--';
    let subValue = '--';
    let vatValue = '--';
    let totalValue = '--';

    /* istanbul ignore else */
    if(!isNaN(input) && input < 21 && input > 0) {
      setupValue = this.baseSetupValue * input;
      subValue = this.baseMonthlySubValue * input
      vatValue = ((this.baseSetupValue * input) + ( this.baseMonthlySubValue * input)) / 100 * 20;
      totalValue = setupValue + subValue + vatValue;
    }

    this.setState({
      accountSetupValue: setupValue,
      monthlySubscriptionValue: subValue,
      vatValue: vatValue,
      totalValue: totalValue
    });
  }

  areCardDetailsValid = valid => this.setState({ isStripeValid: valid });

  render() {
    const { t } = this.props;
    const { 
      values, 
      isStripeValid,
      accountSetupValue,
      monthlySubscriptionValue,
      vatValue,
      totalValue,
      errors,
      showErrorMessage
    } = this.state;
    
    this.config = [
      {
        stateKey: 'numberOfCompanies',
        component: InputNumber,
        label: t('onBoarding.payment.form.numberOfCompaniesLabel'),
        value: values.numberOfCompanies,
        validationFunction: 'validateNoOfCompanies',
        callback: (input) => this.updatePaymentValues(input),
        min: 1,
        max: 20
      },
      {
        component: Stripe,
        isStripeValid: isStripeValid,
        setIsStripeValid: () => this.setState({ isStripeValid: false }),
        stripeError: 'error',
        setStripeToken: token => this.setState({ stripeToken: token }),
        validateForm: () => this.validateForm(),
        cardFieldLabel: t('onBoarding.payment.form.cardLabel'),
        nextButtonLabel: t('createAccount.ctaPrimary'),
        backButtonLabel: t('createAccount.ctaSecondary'),
        handleChange: (e) => this.areCardDetailsValid(e.complete)
      },
    ];

    return (
      <Layout>
        <div data-test="container-payment" className="payment" role="account">
          <h1>{ t('onBoarding.payment.title') }</h1>

          <IntroBox>{ t('onBoarding.payment.intro') }</IntroBox>

          {showErrorMessage &&
            <ErrorBox>
            { errors.form
              ? errors.form
              : t('form.correctErrors')
            }
            </ErrorBox>
          }

          <PaymentInfo 
            accountSetupLabel={t('onBoarding.payment.paymentInfo.accountSetupLabel')}
            monthlySubscriptionLabel={t('onBoarding.payment.paymentInfo.monthlySubscriptionLabel')}
            vatLabel={t('onBoarding.payment.paymentInfo.vatLabel')}
            TotalLabel={t('onBoarding.payment.paymentInfo.TotalLabel')}
            accountSetupValue={accountSetupValue}
            monthlySubscriptionValue={monthlySubscriptionValue}
            vatValue={vatValue}
            totalValue={totalValue}
          />

          <StripeProvider apiKey="pk_test_IekVa77loZrt2oMKeUXuHek7">
            <Elements>
              <Form>
                {formUtils.renderForm(this)}
              </Form>
            </Elements>
          </StripeProvider>
        </div>
      </Layout>
    );
  }
}

Payment.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired
};

const actions = { showLoader, hideLoader };

export const RawComponent = Payment;

export default connect(null, actions)(withTranslation()(Payment));
