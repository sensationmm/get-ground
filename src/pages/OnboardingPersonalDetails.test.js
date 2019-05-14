import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent } from './OnboardingPersonalDetails';
import Select from 'src/components/_form/Select/Select';
import Button from 'src/components/_buttons/Button/Button';
import Datepicker from 'src/components/Datepicker/Datepicker';

describe('<OnboardingPersonalDetailsContainer />', () => {
  let wrapper;
  const setCountryMock = jest.fn();

  global.addressNow = {
    setCountry: setCountryMock,
    listen: jest.fn()
  };

  beforeEach(() => {
    wrapper = setup(RawComponent, {
      t: jest.fn()
    }, {
      showErrorMessage: true,
      errors: {
        form: 'There has been an issue with some of the details'
      }
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-onboarding-details');
    expect(component.length).toBe(1);
  });

  test('expect handleCountryChange to be called on select change', () => {
    const component = findByTestAttr(wrapper, 'container-onboarding-details');
    
    jest.spyOn(wrapper.instance(), 'handleCountryChange');

    component.find(Select).last().props().callback('spain');

    expect(wrapper.instance().handleCountryChange).toHaveBeenCalledWith('spain');
  });

  test('expect state.showPreviousNames to equal true when add names button is clicked', () => {
    const component = findByTestAttr(wrapper, 'container-onboarding-details');

    component.find(Button).at(0).props().onClick('spain');

    expect(wrapper.state().showPreviousNames).toEqual(true);
  });

  test('expect closeDatePicker to be called when the Datepicker is closed', () => {
    const wrapper = setup(RawComponent, {
      t: jest.fn()
    }, {
      showErrorMessage: true
    });

    const component = findByTestAttr(wrapper, 'container-onboarding-details');

    jest.spyOn(wrapper.instance(), 'closeDatePicker');

    component.find(Datepicker).props().closeDatepicker();

    expect(wrapper.instance().closeDatePicker).toHaveBeenCalled();
    expect(wrapper.state().isDatepickerOpen).toEqual(false);
  });

  test('expect setDateofBirth to called when a date is selected in the Datepicker', () => {
    const component = findByTestAttr(wrapper, 'container-onboarding-details');

    jest.spyOn(wrapper.instance(), 'setDateOfBirth');

    component.find(Datepicker).props().setDateFieldValue();

    expect(wrapper.instance().setDateOfBirth).toHaveBeenCalled();
  });

  test('expect openDatePicker to be called when the Datepicker is opened', () => {
    const component = findByTestAttr(wrapper, 'container-onboarding-details');

    jest.spyOn(wrapper.instance(), 'openDatePicker');

    component.find('#datepicker-field').props().onFocus();

    expect(wrapper.state().isDatepickerOpen).toEqual(true);
  });
  
});
