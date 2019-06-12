import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import Button from 'src/components/_buttons/Button/Button';
import Checkbox from 'src/components/_form/Checkbox/Checkbox';
import Form from 'src/components/_layout/Form/Form';
import formUtils from 'src/utils/form';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';

import './stripe.scss';

/**
 * Stripe
 * @param {object} stripe - stripe object for payment functionality
 * @param {function} setIsStripeValid - function to set state on whether stripe field is valid or not
 * @param {function} setStripeToken - function to set the stripe token
 * @param {function} validateForm - function to validate the rest of the form
 * @param {bool} isStripeValid - boolean for checking if stripe field is valid
 * @param {string} stripeError - stripe error text
 * @param {string} nextButtonLabel - next button label
 * @param {string} backButtonLabel - back button label
 * @param {function} handleChange - function to fire on stripe field change
 * @param {string} cardFieldLabel - stripe card field label
 * @return {JSXElement} Stripe
 */
class Stripe extends Component {
  constructor(props) {
    super(props);
  }

  validateStripe = () => {
    const {
      stripe,
      setIsStripeValid,
      setStripeToken,
      validateForm
    } = this.props;

    stripe.createToken().then((result) => {
      result.error ? setIsStripeValid(false) : setStripeToken(result.token.id);
      formUtils.validateForm(this.config)
      validateForm();
    })
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  render() {
    const {
      isStripeValid,
      stripeError,
      nextButtonLabel,
      backButtonLabel,
      handleChange,
      cardFieldLabel,
      form,
      t
    } = this.props;

    const { values } = form;

    this.config = [
      {
        stateKey: 'authSubscription',
        component: Checkbox,
        label: t('onBoarding.payment.stripeCheckbox'),
        checked: values.authSubscription,
        validationFunction: 'validateRequired'
      }
    ];


    return (
      <div
        className={classNames('stripe-wrapper', [
          {'error': !isStripeValid }
        ])}
        data-test="component-stripe"
      >

        {!isStripeValid &&
          <div data-test="stripe-error" className="stripe-required">{stripeError}</div>
        }

        <label>
          {cardFieldLabel}
          <CardElement
            onChange={handleChange}
          />
        </label>
        <IntroBox>
          {t('onBoarding.payment.box')}
        </IntroBox>
        <Form>
          {formUtils.renderForm(this.config)}
        </Form>

        <p className="reminder">
          {t('onBoarding.payment.directorReminder')}
        </p>

        <Button
          data-test="payment-button"
          classes="primary"
          label={nextButtonLabel}
          fullWidth
          onClick={this.validateStripe}
        />

        <Button classes="secondary" label={backButtonLabel} fullWidth />
      </div>
    )
  }
}

Stripe.propTypes = {
  isStripeValid: PropTypes.bool,
  stripeError: PropTypes.string,
  nextButtonLabel: PropTypes.string,
  backButtonLabel: PropTypes.string,
  handleChange: PropTypes.func,
  cardFieldLabel: PropTypes.string,
  stripe: PropTypes.object,
  setIsStripeValid: PropTypes.any,
  setStripeToken: PropTypes.func,
  validateForm: PropTypes.func,
  form: PropTypes.object,
  t: PropTypes.func.isRequired
};

export const RawComponent = Stripe
// export default injectStripe(Stripe);
const mapStateToProps = state => ({
  form: state.form
});

const connectedComponent = connect(mapStateToProps, null)(RawComponent)
export default (withTranslation()(injectStripe(connectedComponent)));
