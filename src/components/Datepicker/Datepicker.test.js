import { setup, findByTestAttr } from '../../test-utils/test-utils';

import Datepicker from './Datepicker';
import MobileDatePicker from 'react-mobile-datepicker';

describe('<Datepicker />', () => {
  let wrapper;
  const setDateFunctionMock = jest.fn();
  const closeFunctionMock = jest.fn();

  // mocked to 2028-01-01T00:00:00.000Z
  const DATE_TO_USE = new Date('2100');
  const _Date = Date;
  global.Date = jest.fn(() => DATE_TO_USE);
  global.Date.UTC = _Date.UTC;
  global.Date.parse = _Date.parse;
  global.Date.now = _Date.now;

  beforeEach(() => {
    wrapper = setup(Datepicker, {
      setDateFieldValue: setDateFunctionMock,
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

  test('expect `setDateFieldValue` to be called when MobileDatePicker fires `onSelect`', () => {
    const component = findByTestAttr(wrapper, 'datepicker');
    component.find(MobileDatePicker).props().onSelect();

    expect(setDateFunctionMock).toHaveBeenCalled();
  });

  test('max date', () => {
    wrapper.setProps({
      birthDate: true
    })

    const component = findByTestAttr(wrapper, 'datepicker');
    const date = JSON.stringify(component.find(MobileDatePicker).props().max)
    expect(date).toEqual(JSON.stringify('2010-01-01T00:00:00.000Z'));
  });
});
