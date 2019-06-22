import { navigate } from 'gatsby';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { initialState as companies } from 'src/state/reducers/companies';

import CompanyLink from './CompanyLink';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<CompanyLink />', () => {
  let wrapper, component;

  const setActiveCompanyMock = jest.fn();

  beforeEach(() => {
    wrapper = setup(
      CompanyLink,
      {
        company: companies[0],
        setActiveCompany: setActiveCompanyMock,
      }
    );
    component = findByTestAttr(wrapper, 'component-company-link');
  });
  
  test('renders without error', () => {
    expect(component.length).toBe(1);
  });

  test('onClick()', () => {
    component.simulate('click');

    expect(setActiveCompanyMock).toHaveBeenCalledWith(1);
    expect(navigate).toHaveBeenCalledWith('/dashboard/company');
  });
});
