import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import HowItWorks from './how-it-works'

describe('<HowItWorks />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(HowItWorks)
  })

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-how-it-works');
    expect(component.length).toBe(1);
  });
})
