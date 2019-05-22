import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import QuizQ4 from './QuizQ4';

describe('<QuizQ4 />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(QuizQ4, { t: jest.fn().mockReturnValue('hi') });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-quizq4');
    expect(component.length).toBe(1);
  });
});
