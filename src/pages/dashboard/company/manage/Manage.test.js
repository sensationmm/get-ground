import Manage from './index';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';

describe('Manage', () => {
  let wrapper;
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id ),
  };

  beforeEach(() => {
    wrapper = setup(Manage, defaultProps);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-manage-company');
    expect(component.length).toBe(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
