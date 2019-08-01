import TrustAndPrivacy from './trust-and-privacy'
import { setup, findByTestAttr } from 'src/test-utils/test-utils';

describe('trust and privacy page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(TrustAndPrivacy, { location: {} })
  })

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-trustAndPrivacy');
    expect(component.length).toBe(1);
  });
})
