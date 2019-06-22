import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { initialState as companies } from 'src/state/reducers/companies';

import ToDo from './ToDo';

describe('<ToDo />', () => {
  let wrapper, component;

  const setActiveCompanyMock = jest.fn();

  beforeEach(() => {
    wrapper = setup(
      ToDo,
      {
        company: companies[0],
        setActiveCompany: setActiveCompanyMock,
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
