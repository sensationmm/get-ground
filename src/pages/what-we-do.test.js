import WhatWeDo from './what-we-do'
import { setup, findByTestAttr } from 'src/test-utils/test-utils';

describe('what-we-do page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(WhatWeDo)
  })

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-whatWeDo');
    expect(component.length).toBe(1);
  });
})
