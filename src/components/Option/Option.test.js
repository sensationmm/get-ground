import { setup, findByTestAttr } from '../../test-utils/test-utils';

import Option from './Option';

describe('<Option />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(Option, { title: 'Title', text: 'Text goes here', value: 30 });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-option');
    expect(component.length).toBe(1);
  });
});
