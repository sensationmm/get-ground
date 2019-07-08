import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';
import { navigate } from 'gatsby';

import { RawComponent as PersonalDetails, AccountService } from './index';
import Select from 'src/components/_form/Select/Select';
import Button from 'src/components/_buttons/Button/Button';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import Datepicker from 'src/components/Datepicker/Datepicker';
import { initialState as ReduxFormMock } from 'src/state/reducers/form';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<OnboardingPersonalDetailsContainer />', () => {
  let wrapper;
  const setCountryMock = jest.fn();
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  AccountService.savePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
  const tMock = jest.fn().mockImplementation(id => id);
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    form: ReduxFormMock
  };
  jest.spyOn(formUtils, 'initFormState');
  jest.spyOn(formUtils, 'clearFormState');
  jest.spyOn(formUtils, 'updateValue');

  global.addressNow = {
    setCountry: setCountryMock,
    listen: jest.fn()
  };

  beforeEach(() => {
    wrapper = setup(PersonalDetails, defaultProps);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-onboarding-details');
    expect(component.length).toBe(1);
    expect(formUtils.initFormState).toHaveBeenCalledTimes(1);
  });

  describe('error message', () => {
    test('default message', () => {
      wrapper = setup(PersonalDetails, {
        ...defaultProps,
        form: {
          ...defaultProps.form,
          showErrorMessage: true
        }
      });
      expect(wrapper.find(ErrorBox).dive().text()).toEqual('form.correctErrors');
    });

    test('custom message', () => {
      wrapper = setup(PersonalDetails, {
        ...defaultProps,
        form: {
          ...defaultProps.form,
          errors: {
            form: 'custom error',
          },
          showErrorMessage: true
        }
      });

      expect(wrapper.find(ErrorBox).dive().text()).toEqual('custom error');
    })
  });

  test('form cleared on unmount', () => {
    wrapper.unmount();
    expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
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
    const wrapper = setup(PersonalDetails, {
      ...defaultProps,
      form: {
      ...defaultProps.form,
      showErrorMessage: true
      }
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
      const errorsSpy = jest.spyOn(formUtils, 'setFormError');
      AccountService.savePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 400 }));
      const wrapperNew = setup(PersonalDetails, defaultProps);

      await wrapperNew.instance().initFormValidation();

      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(errorsSpy).toHaveBeenCalledWith('form.correctErrors');
      expect(spy).toHaveBeenCalled();
    });

    test('country variants', async () => {
      wrapper = setup(PersonalDetails, {
        ...defaultProps,
        form: {
          values: {
            first_name: 'Sponge',
            middle_name: 'Bob',
            last_name: 'Squarepants',
            country: '[GB] United Kindgom',
            nationality: '[GB] British'
          },
          errors: {
            middle_name: 'No'
          }
        }
      });

      AccountService.savePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
      await wrapper.instance().initFormValidation();
      expect(navigate).toHaveBeenCalledWith('/onboarding/id-check');
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

  describe('saveAndExit()', () => {
    let wrapperPartial;

    beforeEach(() => {
      wrapperPartial = setup(PersonalDetails, {
        ...defaultProps,
        form: {
          values: {
            first_name: 'Sponge',
            middle_name: 'Bob',
            last_name: 'Squarepants'
          },
          errors: {
            middle_name: 'No'
          }
        }
      });
    });

    test('success', async () => {
      AccountService.savePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
      await wrapperPartial.instance().saveAndExit();
      
      expect(formUtils.updateValue).toHaveBeenCalledTimes(1);
      expect(formUtils.updateValue).toHaveBeenCalledWith('middle_name', '');
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('/onboarding');

    });

    test('failure', async () => {
      AccountService.savePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 404 }));
      await wrapperPartial.instance().saveAndExit();
      
      expect(formUtils.updateValue).toHaveBeenCalledTimes(1);
      expect(formUtils.updateValue).toHaveBeenCalledWith('middle_name', '');
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledTimes(0);
    });

    test('country variants', async () => {
      wrapper = setup(PersonalDetails, {
        ...defaultProps,
        form: {
          values: {
            first_name: 'Sponge',
            middle_name: 'Bob',
            last_name: 'Squarepants',
            country: '[GB] United Kindgom',
            nationality: '[GB] British'
          },
          errors: {
            middle_name: 'No'
          }
        }
      });

      AccountService.savePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
      await wrapper.instance().saveAndExit();
      expect(navigate).toHaveBeenCalledWith('/onboarding');
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
});
