import CompanyComplete from './index';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';

describe('<CompanyComplete />', () => {
  test('renders without error', () => {
    const wrapper = setup(CompanyComplete);
    const component = findByTestAttr(wrapper, 'container-company-complete');
    expect(component.length).toBe(1);
  });
});
