import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import QuizQ2 from './QuizQ2';

describe('<QuizQ2 />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(QuizQ2, { t: jest.fn().mockReturnValue('hi'), selected: [] });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-quizq2');
    expect(component.length).toBe(1);
  });
});
