import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { RawComponent } from './index';
import Stripe from 'src/components/Stripe/Stripe';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import { initialState as ReduxFormMock } from 'src/state/reducers/form';
import formUtils from 'src/utils/form';

describe('Payment page', () => {
  let wrapper;

  global.Stripe = jest.fn();
  jest.spyOn(formUtils, 'initFormState');
  jest.spyOn(formUtils, 'clearFormState');


  beforeEach(() => {
    wrapper = setup(RawComponent, {
      t: jest.fn(),
      showLoader: jest.fn(),
      hideLoader: jest.fn(),
      location: {
        search: '?retakePayment=true'
      },
      form: ReduxFormMock,
      company: {
        id: 1
      }
    });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-payment');
    expect(component.length).toBe(1);
    expect(formUtils.initFormState).toHaveBeenCalledTimes(1);
  });

  test('form cleared on unmount', () => {
    jest.spyOn(formUtils, 'clearFormState');
    wrapper.unmount();
    expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
  });

  test('stripe card details are invalid on stripe field type', () => {
    const component = findByTestAttr(wrapper, 'container-payment');

    jest.spyOn(wrapper.instance(), 'areCardDetailsValid');

    component.find(Stripe).props().handleChange({ complete: false });

    expect(wrapper.instance().areCardDetailsValid).toHaveBeenCalledWith(false);
    expect(wrapper.state().isStripeValid).toBe(false);
  });

  test('stripe card details are valid on stripe field type', () => {
    const component = findByTestAttr(wrapper, 'container-payment');

    jest.spyOn(wrapper.instance(), 'areCardDetailsValid');

    component.find(Stripe).props().handleChange({ complete: true });

    expect(wrapper.instance().areCardDetailsValid).toHaveBeenCalledWith(true);
    expect(wrapper.state().isStripeValid).toBe(true);
  });

  test('stripeToken to be set', () => {
    const component = findByTestAttr(wrapper, 'container-payment');

    component.find(Stripe).props().setStripeToken('t35tt0k3n');

    expect(wrapper.state().stripeToken).toEqual('t35tt0k3n');
  });

  test('stripe token response is invalid', () => {
    const component = findByTestAttr(wrapper, 'container-payment');

    component.find(Stripe).props().setIsStripeValid(false);

    expect(wrapper.state().isStripeValid).toBe(false);
  });

  test('error box has rendered', () => {
    wrapper = setup(RawComponent, {
      t: jest.fn(),
      location: {
        search: '?retakePayment=true'
      },
      form: {
        ...ReduxFormMock,
        showErrorMessage: true,
        errors: {
          form: 'There was an issue with your payment'
        }
      },
      company: {
        id: 1
      }
    });

    const component = findByTestAttr(wrapper, 'container-payment');
    expect(component.find(ErrorBox).length).toBe(1);
  });

  test('validateForm has been called from within Stripe', () => {
    const component = findByTestAttr(wrapper, 'container-payment');

    jest.spyOn(wrapper.instance(), 'validateForm');

    component.find(Stripe).props().validateForm();

    expect(wrapper.instance().validateForm).toHaveBeenCalled();
  });

});
