import { setup, findByTestAttr } from '../../test-utils/test-utils';

import Header from './Header';

describe('<Header />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(Header);
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-header');
    expect(component.length).toBe(1);
  });
});
