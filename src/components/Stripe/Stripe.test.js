import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { initialState as ReduxFormMock } from 'src/state/reducers/form';

import { RawComponent, ModalService } from './Stripe';

describe('<Stripe />', () => {
  let wrapper;
  const mockSetIsStripeValid = jest.fn();
  const mockValidateForm = jest.fn();
  const mockHandleChange = jest.fn();
  const mockStripe = {
    createToken: () => Promise.resolve({ json: () => [] })
  }

  const mockShowLoader = jest.fn()
  const mockHideLoader = jest.fn()
  const mockShowModal = jest.fn()
  ModalService.fetchModalContent = jest.fn('val').mockReturnValue(Promise.resolve({ data: { markdown_text: '<h1>HI</h1>' } }));

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
      cardFieldLabel: 'Card details',
      form: ReduxFormMock,
      t: jest.fn(),
      showLoader: mockShowLoader,
      hideLoader: mockHideLoader,
      showModal: mockShowModal
    });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-stripe');
    expect(component.length).toBe(1);
  });

  test('renders with the stripe error showing', () => {
    wrapper = setup(RawComponent, {
      isStripeValid: false,
      form: ReduxFormMock,
      t: jest.fn(),
    });

    const errorElement = findByTestAttr(wrapper, 'stripe-error');

    expect(errorElement.length).toBe(1);
  });
});
