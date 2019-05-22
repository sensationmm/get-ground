import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import QuizQ3 from './QuizQ3';

describe('<QuizQ3 />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(QuizQ3, { t: jest.fn().mockReturnValue('hi'), selected: false });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-quizq3');
    expect(component.length).toBe(1);
  });
});
