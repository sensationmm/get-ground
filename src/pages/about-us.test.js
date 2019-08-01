import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import AboutUs from './about-us'

describe('about us page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(AboutUs, { location: {} })
  })

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-aboutUs');
    expect(component.length).toBe(1);
  });
})
