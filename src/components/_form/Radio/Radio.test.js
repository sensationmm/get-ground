import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import Radio from './Radio';

describe('<Radio />', () => {
  let wrapper;

  beforeEach(() => {
   wrapper = setup(Radio, {});
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-radio');
    expect(component.length).toBe(1);
  });

});
