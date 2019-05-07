import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import QuizQ5 from './QuizQ5';

describe('<QuizQ5 />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(QuizQ5, { t: jest.fn().mockReturnValue('hi'), selected: [] });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-quizq5');
    expect(component.length).toBe(1);
  });
});
