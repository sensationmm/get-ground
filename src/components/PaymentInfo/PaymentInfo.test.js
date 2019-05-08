import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import PaymentInfo from './PaymentInfo';

describe('<PaymentInfo />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(PaymentInfo, { 
      accountSetupLabel: 'Account setup',
      monthlySubscriptionLabel: 'Monthly subscription',
      vatLabel: 'VAT @ 20%',
      TotalLabel: 'Total',
      accountSetupValue: 500,
      monthlySubscriptionValue: 20,
      vatValue: 104,
      totalValue: 624
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-payment-info');
    expect(component.length).toBe(1);
  });
});
