import { RawComponent as CompanyComplete } from './index';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';

describe('<CompanyComplete />', () => {
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();

  test('renders without error', () => {
    const wrapper = setup(CompanyComplete, {
      t: jest.fn().mockImplementation((id) => id ),
      showLoader: showLoaderMock,
      hideLoader: hideLoaderMock,
      company: {
        id: 1
      }
    });
    const component = findByTestAttr(wrapper, 'container-company-complete');
    expect(component.length).toBe(1);
  });
});
