import { setup, findByTestAttr } from '../../test-utils/test-utils';

import Loader from './Loader';

describe('<Loader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(Loader);
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-loader');
    expect(component.length).toBe(1);
  });
});
