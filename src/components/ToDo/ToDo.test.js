import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { companiesMock } from 'src/components/CompanyLink/CompanyLink.test';

import ToDo from './ToDo';

describe('<ToDo />', () => {
  let wrapper, component;

  const setActiveCompanyMock = jest.fn();

  beforeEach(() => {
    wrapper = setup(
      ToDo,
      {
        company: companiesMock[0],
        setActiveCompany: setActiveCompanyMock
      }
    );
    component = findByTestAttr(wrapper, 'component-todo');
  });
  
  test('renders without error', () => {
    expect(component.length).toBe(1);
  });

  test('onClick()', () => {
    component.simulate('click');

    expect(setActiveCompanyMock).toHaveBeenCalledWith(1);
  });
});
