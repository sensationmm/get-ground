import { setup, findByTestAttr } from '../../test-utils/test-utils';
import moment from 'moment';

import Datepicker from './Datepicker';
import MobileDatePicker from 'react-mobile-datepicker';

describe('<Datepicker />', () => {
  let wrapper;
  const setDateFunctionMock = jest.fn();
  const closeFunctionMock = jest.fn();

  beforeEach(() => {
    wrapper = setup(Datepicker, {
      setDateOfBirth: setDateFunctionMock,
      closeDatepicker: closeFunctionMock
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'datepicker');
    expect(component.length).toBe(1);
  });

  test('expect `closeDatePicker` to be called when MobileDatePicker fires `onCancel`', () => {
    const component = findByTestAttr(wrapper, 'datepicker');
    component.find(MobileDatePicker).props().onCancel();

    expect(closeFunctionMock).toHaveBeenCalled();
  });

  test('expect `setDateOfBirth` to be called when MobileDatePicker fires `onSelect`', () => {
    const component = findByTestAttr(wrapper, 'datepicker');
    component.find(MobileDatePicker).props().onSelect();

    expect(setDateFunctionMock).toHaveBeenCalledWith(moment(new Date()).format('Do MMMM YYYY'));
  });
});
