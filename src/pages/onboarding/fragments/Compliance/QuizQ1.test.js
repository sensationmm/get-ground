import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import QuizQ1 from './QuizQ1';

describe('<QuizQ1 />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(QuizQ1, { t: jest.fn().mockReturnValue('hi') });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-quiz1');
    expect(component.length).toBe(1);
  });
});
