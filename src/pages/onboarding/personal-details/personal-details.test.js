import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';
import { navigate } from 'gatsby';

import { RawComponent as PersonalDetails, AccountService } from './index';
import Select from 'src/components/_form/Select/Select';
import Button from 'src/components/_buttons/Button/Button';
import Datepicker from 'src/components/Datepicker/Datepicker';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<OnboardingPersonalDetailsContainer />', () => {
  let wrapper;
  const setCountryMock = jest.fn();
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  AccountService.savePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock
  };

  global.addressNow = {
    setCountry: setCountryMock,
    listen: jest.fn()
  };

  beforeEach(() => {
    wrapper = setup(PersonalDetails, defaultProps, {
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
    const wrapper = setup(PersonalDetails, defaultProps, {
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

  describe('initFormValidation()', () => {
    let spy;

    test('savePersonalDetails details success', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      AccountService.savePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
      const wrapperNew = setup(PersonalDetails, defaultProps);
      
      await wrapperNew.instance().initFormValidation();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('/onboarding/id-check');
      expect(spy).toHaveBeenCalled();
    });

    test('savePersonalDetails details failure', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      AccountService.savePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 400 }));
      const wrapperNew = setup(PersonalDetails, defaultProps);
      
      await wrapperNew.instance().initFormValidation();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapperNew.state().errors.form).toEqual('string');
      expect(spy).toHaveBeenCalled();
    });

    afterEach(() => {
      spy.mockClear();
    });

  });

  test('toggleManualAddress sets isManualAddress to false if it is true', () => {
    const wrapper = setup(PersonalDetails, defaultProps, {
      isManualAddress: true
    });

    wrapper.instance().toggleManualAddress();

    expect(wrapper.state().isManualAddress).toEqual(false);
  });

  test('toggleManualAddress sets isManualAddress to true if it is false', () => {
    const wrapper = setup(PersonalDetails, defaultProps, {
      isManualAddress: false
    });

    wrapper.instance().toggleManualAddress();

    expect(wrapper.state().isManualAddress).toEqual(true);
  });

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });
  
});
