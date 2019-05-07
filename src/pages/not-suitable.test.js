import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import NotSuitable from './not-suitable';

describe('<NotSuitable />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(NotSuitable);
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-not-suitable');
    expect(component.length).toBe(1);
  });
});
