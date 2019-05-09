import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent } from './Stripe';

describe('<Stripe />', () => {
  let wrapper;
  const mockSetIsStripeValid = jest.fn();
  const mockValidateForm = jest.fn();
  const mockHandleChange = jest.fn();
  const mockStripe = {
    createToken: () => Promise.resolve({ json: () => [] })
  }

  beforeEach(() => {
    wrapper = setup(RawComponent, {
      stripe: mockStripe,
      setIsStripeValid: true,
      setStripeToken: mockSetIsStripeValid,
      validateForm: mockValidateForm,
      isStripeValid: true,
      stripeError: 'Error',
      nextButtonLabel: 'next',
      backButtonLabel: 'back',
      handleChange: mockHandleChange,
      cardFieldLabel: 'Card details'
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-stripe');
    expect(component.length).toBe(1);
  });

  test('renders with the stripe error showing', () => {
    wrapper = setup(RawComponent, {
      isStripeValid: false
    });

    const errorElement = findByTestAttr(wrapper, 'stripe-error');

    expect(errorElement.length).toBe(1);
  });

});
