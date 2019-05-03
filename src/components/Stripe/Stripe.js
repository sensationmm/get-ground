import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from 'src/components/_buttons/Button/Button';

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
      validateForm();
    })
  }

  render() {
    const { 
      isStripeValid, 
      stripeError, 
      nextButtonLabel, 
      backButtonLabel,
      handleChange,
      cardFieldLabel
    } = this.props;
    return (
      <div 
        className={classNames('stripe-wrapper', [
          {'error': !isStripeValid }
        ])}
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

        <Button
          data-test="create-account-button"
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
  setIsStripeValid: PropTypes.func,
  setStripeToken: PropTypes.func,
  validateForm: PropTypes.func
};

export default injectStripe(Stripe);
