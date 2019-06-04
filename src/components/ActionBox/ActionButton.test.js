import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as ActionButton } from './ActionButton';

describe('<ActionButton />', () => {
  let wrapper;

  const setActiveCompanyMock = jest.fn();
  const defaultProps = {
    t: jest.fn().mockImplementation(id => id),
    alert: { type: 'documents_ready', companyID: '1' },
    setActiveCompany: setActiveCompanyMock
  }

  beforeEach(() => {
    wrapper = setup(ActionButton, defaultProps);
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-action-button');
    expect(component.length).toBe(1);
  });
});
