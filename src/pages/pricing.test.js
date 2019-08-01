import Pricing from './pricing'
import { setup, findByTestAttr } from 'src/test-utils/test-utils';

describe('Pricing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(Pricing, { location: {} })
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-pricing');
    expect(component.length).toBe(1);
  });
})
