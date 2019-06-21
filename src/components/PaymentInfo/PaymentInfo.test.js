import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import PaymentInfo from './PaymentInfo';

describe('<PaymentInfo />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(PaymentInfo, {
      accountSetupLabel: 'Account setup',
      vatLabel: 'VAT @ 20%',
      TotalLabel: 'Total',
      accountSetupValue: 500,
      vatValue: 104,
      totalValue: 624
    });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-payment-info');
    expect(component.length).toBe(1);
  });

  test('correct labels and values from props', () => {
    expect(wrapper.find('[data-test="total-label"]').text()).toEqual('Total')
    expect(wrapper.find('[data-test="total-value"]').text()).toEqual('£624')
    expect(wrapper.find('[data-test="vat-label"]').text()).toEqual('VAT @ 20%')
    expect(wrapper.find('[data-test="vat-value"]').text()).toEqual('£104')
    expect(wrapper.find('[data-test="account-label"]').text()).toEqual('Account setup')
    expect(wrapper.find('[data-test="account-value"]').text()).toEqual('£500')
  });
});
