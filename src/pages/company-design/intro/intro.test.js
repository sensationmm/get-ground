import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as OnboardingIntroContainer } from './index';
import { navigate } from 'gatsby';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

const showLoaderMock = jest.fn();
const hideLoaderMock = jest.fn();
const addCompanyMock = jest.fn();
const setActiveCompanyMock = jest.fn();
const tMock = jest.fn().mockImplementation(id => id);
const defaultProps = {
  t: tMock,
  showLoader: showLoaderMock,
  hideLoader: hideLoaderMock,
  addCompany: addCompanyMock,
  setActiveCompany: setActiveCompanyMock
};

describe('<OnboardingIntroContainer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(OnboardingIntroContainer, defaultProps);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-company-design-intro');
    expect(component.length).toBe(1);
  });

  test('fire handleCreateCompany on button click with props `/company-design/add-services`, true', () => {
    const button = findByTestAttr(wrapper, 'add-services-button');

    jest.spyOn(wrapper.instance(), 'handleCreateCompany');

    button.props().onClick()
    expect(wrapper.instance().handleCreateCompany).toHaveBeenCalledWith('/company-design/add-services', true);
  });

  test('fire handleCreateCompany on button click with props `/company-design`, false', () => {
    const button = findByTestAttr(wrapper, 'skip-services-button');

    jest.spyOn(wrapper.instance(), 'handleCreateCompany');

    button.props().onClick()
    expect(wrapper.instance().handleCreateCompany).toHaveBeenCalledWith('/company-design', false);
  });

  test('handleCreateCompany calls showLoader and createCompany', () => {
    wrapper.instance().createCompany = jest.fn();
    wrapper.instance().handleCreateCompany('someUrl', true);

    expect(showLoaderMock).toHaveBeenCalled();
    expect(wrapper.instance().createCompany).toHaveBeenCalledWith('someUrl', true);
  });

  test('handleCreateCompanyResponse calls navigate and addCompany', () => {
    wrapper.instance().handleCreateCompanyResponse('someUrl', { status: 201, data: { id: 1 } });

    expect(hideLoaderMock).toHaveBeenCalled();
    expect(addCompanyMock).toHaveBeenCalledWith({ id: 1 });
    expect(navigate).toHaveBeenCalledWith('someUrl');
    expect(setActiveCompanyMock).toHaveBeenCalledWith(1);
  });

  test('handleCreateCompanyResponse calls navigate and addCompany', () => {
    wrapper.instance().handleCreateCompanyResponse('someUrl', { status: 500 });

    expect(hideLoaderMock).toHaveBeenCalled();
  });
});
