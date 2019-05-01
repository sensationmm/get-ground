import { setup, findByTestAttr } from '../../../test-utils/test-utils';
import '../../../i18n';

import ManualAddressFields from './ManualAddressFields';
import InputText from '../InputText/InputText';

describe('<ManualAddressFields />', () => {
  let wrapper;
  const changeMock = jest.fn();

  beforeEach(() => {
    wrapper = setup(ManualAddressFields, { 
      onInputChange: changeMock, 
      unitNumber: '',
      street: '',
      city: '',
      postcode: ''
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-manual-address-fields');
    expect(component.length).toBe(1);
  });

  test('when textInput field value is changed', () => {
    const component = findByTestAttr(wrapper, 'component-manual-address-fields');

    component.find(InputText).forEach((field) => {
      field.simulate('change', {
        preventDefault() {},
        target: { value: 'test', id: 'something' }
      });
    });

    expect(changeMock).toHaveBeenCalled();
  });
});
