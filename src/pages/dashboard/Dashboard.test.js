import { RawComponent as Dashboard } from './index';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { navigate } from 'gatsby';
import functions from 'src/utils/functions';

import { companyMock } from './company/CompanyOverview.test';
import { actionsMock } from 'src/components/ActionBox/ActionBox.test';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('Dashboard', () => {
  let wrapper;
  const getByValueSpy = jest.spyOn(functions, 'getByValue');
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id ),
    activeCompany: 1,
    companies: [companyMock],
    actions: []
  };

  beforeEach(() => {
    wrapper = setup(Dashboard, defaultProps);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-dashboard');
    expect(component.length).toBe(1);
  });

  test('profile button', () => {
    const button = findByTestAttr(wrapper, 'profile-button');
    button.simulate('click');

    expect(button.text()).toEqual('dashboard.main.profileLink');
    expect(navigate).toHaveBeenCalledWith('/account');
  });

  test('add company button', () => {
    const button = findByTestAttr(wrapper, 'add-company-button');
    button.simulate('click');

    expect(button.dive().text()).toEqual('dashboard.main.addCompanyButton');
    expect(navigate).toHaveBeenCalledWith('/company-design/intro');
  });

  test('no companies', () => {
    wrapper = setup(Dashboard, { ...defaultProps, companies: [] })
  });

  test('actions', () => {
    wrapper = setup(Dashboard, { ...defaultProps, actions: actionsMock });

    expect(getByValueSpy).toHaveBeenCalledWith(defaultProps.companies, 'id', 1)
  });

  test('translations', () => {
    // expect(wrapper.find('h2').at(0).text()).toBe('dashboard.company.overview.sections.company');
    // expect(wrapper.find('h2').at(1).text()).toBe('dashboard.company.overview.sections.address');
    // expect(wrapper.find('h2').at(2).text()).toBe('dashboard.company.overview.sections.shareholders');
    // expect(wrapper.find('h2').at(3).text()).toBe('dashboard.company.overview.sections.directors');
    // expect(wrapper.find('h2').at(4).text()).toBe('dashboard.company.overview.sections.documents');
    // expect(wrapper.find(Button).at(0).props().label).toBe('dashboard.company.overview.ctaPrimary');
    // expect(wrapper.find(Button).at(1).props().label).toBe('dashboard.company.overview.ctaSecondary');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
