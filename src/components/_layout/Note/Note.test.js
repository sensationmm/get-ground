import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import Note from './Note';

describe('<Note />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(Note, { children: 'Note goes here' });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-note');
    expect(component.length).toBe(1);
  });
});
