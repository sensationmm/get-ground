import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent } from './index';
import Button from 'src/components/_buttons/Button/Button';
import Datepicker from 'src/components/Datepicker/Datepicker';

describe('<OnboardingPersonalDetailsContainer />', () => {
  let wrapper;
  const mockEvent = {
    target: {
      id: 'completionDate'
    }
  };

  beforeEach(() => {
    wrapper = setup(RawComponent, {
      t: jest.fn()
    }, {
      showErrorMessage: true,
      errors: {
        form: 'There has been an issue with some of the details'
      },
      extraInstallmentFieldsShowing: 1
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-company-design-purchase-details');
    expect(component.length).toBe(1);
  });

  test('expect checkElementHidden to return true if newBuild is equal to an empty string', () => {
    const wrapper = setup(RawComponent, {
      t: jest.fn()
    }, {
      values: {
        newBuild: ''
      }
    });
    wrapper.instance().checkElementHidden();

    expect(wrapper.instance().checkElementHidden()).toEqual(true);
  });

  test('expect checkElementHidden to return true if newBuild is equal to yes & completionDate is an empty string', () => {
    const wrapper = setup(RawComponent, {
      t: jest.fn()
    }, {
      values: {
        newBuild: 'yes',
        completionDate: ''
      }
    });
    wrapper.instance().checkElementHidden();

    expect(wrapper.instance().checkElementHidden()).toEqual(true);
  });

  test('expect checkElementHidden to return false if newBuild is equal to no', () => {
    const wrapper = setup(RawComponent, {
      t: jest.fn()
    }, {
      values: {
        newBuild: 'no',
      }
    });
    wrapper.instance().checkElementHidden();

    expect(wrapper.instance().checkElementHidden()).toEqual(false);
  });

  test('expect showNextInstallment to be called when button is clicked', () => {
    const component = findByTestAttr(wrapper, 'container-company-design-purchase-details');
    wrapper.instance().showNextInstallment = jest.fn();

    component.find(Button).at(0).props().onClick();

    expect(wrapper.instance().showNextInstallment).toHaveBeenCalled();
  });

  test('expect closeDatePicker to be called when the Datepicker is closed', () => {
    const wrapper = setup(RawComponent, {
      t: jest.fn()
    }, {
      showErrorMessage: true
    });

    const component = findByTestAttr(wrapper, 'container-company-design-purchase-details');

    jest.spyOn(wrapper.instance(), 'closeDatePicker');

    component.find(Datepicker).props().closeDatepicker();

    expect(wrapper.instance().closeDatePicker).toHaveBeenCalled();
    expect(wrapper.state().isDatepickerOpen).toEqual(false);
  });

  test('expect openDatePicker to be called when the Datepicker is opened', () => {
    const component = findByTestAttr(wrapper, 'container-company-design-purchase-details');

    jest.spyOn(wrapper.instance(), 'openDatePicker');

    component.find('#depositDueDate').props().onFocus(mockEvent);

    expect(wrapper.state().isDatepickerOpen).toEqual(true);
  });

  test('expect setDateFieldValue to called when a date is selected in the Datepicker', () => {
    const component = findByTestAttr(wrapper, 'container-company-design-purchase-details');

    jest.spyOn(wrapper.instance(), 'setDateFieldValue');

    component.find(Datepicker).props().setDateFieldValue();

    expect(wrapper.instance().setDateFieldValue).toHaveBeenCalled();
  });

});
