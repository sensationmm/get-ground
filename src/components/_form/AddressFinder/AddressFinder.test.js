import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import AddressFinder from './AddressFinder';
import Button from 'src/components/_buttons/Button/Button';
import InputText from '../InputText/InputText';

describe('<AddressFinder />', () => {
  let wrapper;
  const toggleManualAddressMock = jest.fn();

  beforeEach(() => {
    wrapper = setup(AddressFinder, {
      toggleManualAddress: toggleManualAddressMock,
      isManualAddress: false,
    }, {
      search: '',
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-address-finder');
    expect(component.length).toBe(1);
  });

  test('call toggleManualAddress when the manual address Button is clicked', () => {
    const wrapper = setup(AddressFinder, { toggleManualAddress: toggleManualAddressMock, isManualAddress: true }, { search: '' });
    const component = findByTestAttr(wrapper, 'component-address-finder');

    component.find(Button).simulate('click');

    expect(toggleManualAddressMock).toHaveBeenCalledTimes(1);
  });

  test('expect resetSearchValue to be fired on edit icon click', () => {
    const component = findByTestAttr(wrapper, 'component-address-finder');
    jest.spyOn(wrapper.instance(), 'resetSearchValue');

    component.find('.edit-icon').props().onClick();

    expect(wrapper.instance().resetSearchValue).toHaveBeenCalled();
  });

  test('expect `handleInputChange` to be called on InputText type', () => {
    const component = findByTestAttr(wrapper, 'component-address-finder');
    jest.spyOn(wrapper.instance(), 'handleInputChange');

    component.find(InputText).props().onChange('test value');

    expect(wrapper.instance().handleInputChange).toHaveBeenCalledWith('test value');
    expect(wrapper.state().search).toEqual('test value');
    expect(wrapper.state().value).toEqual('test value');
  });

});
