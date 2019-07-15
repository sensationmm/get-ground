import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { navigate, Link } from 'gatsby';

import formUtils from 'src/utils/form';

import Layout from 'src/components/Layout/Layout'
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import PaymentInfo from 'src/components/PaymentInfo/PaymentInfo';
import Form from 'src/components/_layout/Form/Form';
import Stripe from 'src/components/Stripe/Stripe';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

import { stripeKey } from 'src/config/endpoints';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import paymentService from 'src/services/Payment';
const PaymentService = new paymentService();

/**
 * Payment
 * @param {object} valid - boolean to check if card details are complete (for JSdoc)
 * @return {JSXElement} Payment
 */
export class Payment extends Component {
  constructor(props) {
    super(props);

    this.baseSetupValue = 500;
    this.baseMonthlySubValue = 20;
    this.vatValue = this.baseSetupValue / 100 * 20;

    this.state = {
      stripe: null,
      isStripeValid: true,
      accountSetupValue: this.baseSetupValue,
      monthlySubscriptionValue: this.baseMonthlySubValue,
      vatValue: this.vatValue,
      totalValue: this.baseSetupValue + this.vatValue,
      stripeToken: '',
    };

    this.config = [];
  }

  componentDidMount() {
    formUtils.initFormState({
      numberOfCompanies: '1'
    });

    const { t, location: { search } } = this.props;

    this.setState({ stripe: window.Stripe(stripeKey) });

    if (search.indexOf('retakePayment=true')>=0) {
      this.setState({
        errors: {
          form: t('onBoarding.payment.form.retakePaymentError')
        },
        showErrorMessage: true,
        stripe: window.Stripe(stripeKey)
      });
    }
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  validateForm = () => {
    const { showLoader, hideLoader, t, form, company } = this.props;
    const { stripeToken, isStripeValid, } = this.state;
    const { values: { numberOfCompanies } } = form;

    /* istanbul ignore else */
    if (formUtils.validateForm(this.config) && isStripeValid) {
      showLoader();
      return PaymentService.makePayment(stripeToken, numberOfCompanies, company.id).then((response) => {
        hideLoader();
        if(response.status === 201) {
          navigate('/company-design');
        } else if(response.status === 400) {
          this.setState({
            ...this.state,
            errors: {
              form: t('onBoarding.payment.form.error'),
            },
            showErrorMessage: true
          });
        }
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
      vatValue = (this.baseSetupValue * input) / 100 * 20;
      totalValue = setupValue + vatValue;
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
    const { t, form } = this.props;
    const {
      isStripeValid,
      accountSetupValue,
      monthlySubscriptionValue,
      vatValue,
      totalValue,
    } = this.state;
    const { errors, showErrorMessage } = form;


    this.config = [
      {
        component: Stripe,
        isStripeValid: isStripeValid,
        setIsStripeValid: () => this.setState({ isStripeValid: false }),
        stripeError: t('onBoarding.payment.stripeError'),
        setStripeToken: token => this.setState({ stripeToken: token }),
        validateForm: () => this.validateForm(),
        cardFieldLabel: '',
        nextButtonLabel: t('onBoarding.createAccount.ctaPrimary'),
        backButtonLabel: t('onBoarding.createAccount.ctaSecondary'),
        handleChange: (e) => this.areCardDetailsValid(e.complete)
      },
    ];

    const headerActions = <Link to="/company-design"><ButtonHeader label={t('header.buttons.exit')} /></Link>;

    return (      
      <Layout headerActions={headerActions} secure>
        <div data-test="container-payment" className="payment" role="account form-page">
          <h1>{ t('onBoarding.payment.title') }</h1>

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

          <p>{t('onBoarding.payment.content.first')}</p>
          <p>{t('onBoarding.payment.content.second')}</p>
          <br />

          <h2>{ t('onBoarding.payment.subtitle') }</h2>

          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <Form desktopFullWidth>
                {formUtils.renderForm(this.config)}
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
  t: PropTypes.func.isRequired,
  location: PropTypes.object,
  form: PropTypes.object,
  company: PropTypes.object
};

const mapStateToProps = state => ({
  form: state.form,
  company: state.companies.find(company => company.id === state.activeCompany)
});

const actions = { showLoader, hideLoader };

export const RawComponent = Payment;

export default connect(mapStateToProps, actions)(withTranslation()(Payment));
