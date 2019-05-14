import React from 'react';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';
import { navigate } from 'gatsby';

import { RawComponent as PurchaseDetails, PropertyService } from './index';
import Button from 'src/components/_buttons/Button/Button';
import Datepicker from 'src/components/Datepicker/Datepicker';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<OnboardingPersonalDetailsContainer />', () => {
  let wrapper;
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  PropertyService.SavePurchaseDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
  const mockEvent = {
    target: {
      id: 'completionDate'
    }
  };
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock
  };

  beforeEach(() => {
    wrapper = setup(PurchaseDetails, defaultProps, {
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

  test('renders error message if errors present', () => {
    wrapper = setup(PurchaseDetails, defaultProps, { showErrorMessage: true });
    expect(wrapper.contains(<ErrorBox>string</ErrorBox>)).toBe(true);
  });

  test('expect checkElementHidden to return true if newBuild is equal to an empty string', () => {
    const wrapper = setup(PurchaseDetails, defaultProps, {
      values: {
        newBuild: ''
      }
    });
    wrapper.instance().checkElementHidden();

    expect(wrapper.instance().checkElementHidden()).toEqual(true);
  });

  test('expect checkElementHidden to return true if newBuild is equal to yes & completionDate is an empty string', () => {
    const wrapper = setup(PurchaseDetails, defaultProps, {
      values: {
        newBuild: 'yes',
        completionDate: ''
      }
    });
    wrapper.instance().checkElementHidden();

    expect(wrapper.instance().checkElementHidden()).toEqual(true);
  });

  test('expect checkElementHidden to return false if newBuild is equal to no', () => {
    const wrapper = setup(PurchaseDetails, defaultProps, {
      values: {
        newBuild: 'no',
      }
    });
    wrapper.instance().checkElementHidden();

    expect(wrapper.instance().checkElementHidden()).toEqual(false);
  });

  test('expect showNextInstallment to be called when button is clicked', () => {
    const wrapper = setup(PurchaseDetails, defaultProps, {
      values: {
        newBuild: 'yes',
      }
    });
    const component = findByTestAttr(wrapper, 'container-company-design-purchase-details');
    wrapper.instance().showNextInstallment = jest.fn();

    component.find(Button).at(0).props().onClick();

    expect(wrapper.instance().showNextInstallment).toHaveBeenCalled();
  });

  test('expect closeDatePicker to be called when the Datepicker is closed', () => {
    const wrapper = setup(PurchaseDetails, defaultProps, {
      showErrorMessage: true
    });

    const component = findByTestAttr(wrapper, 'container-company-design-purchase-details');

    jest.spyOn(wrapper.instance(), 'closeDatePicker');

    component.find(Datepicker).props().closeDatepicker();

    expect(wrapper.instance().closeDatePicker).toHaveBeenCalled();
    expect(wrapper.state().isDatepickerOpen).toEqual(false);
  });

  test('expect openDatePicker to be called when the Datepicker is opened', () => {
    const wrapper = setup(PurchaseDetails, defaultProps, {
      values: {
        newBuild: 'yes',
      }
    });
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

  describe('createAccount()', () => {
    let spy;

    test('submit purchase details success', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      PropertyService.SavePurchaseDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 201 }));
      const wrapperNew = setup(PurchaseDetails, defaultProps);
      
      await wrapperNew.instance().submitPurchaseDetails();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('/company-details/solicitor-details');
      expect(spy).toHaveBeenCalled();
    });

    test('submit purchase details failure', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      PropertyService.SavePurchaseDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 400 }));
      const wrapperNew = setup(PurchaseDetails, defaultProps);
      
      await wrapperNew.instance().submitPurchaseDetails();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapperNew.state().errors.form).toEqual('string');
      expect(spy).toHaveBeenCalled();
    });

    afterEach(() => {
      spy.mockClear();
    });

  });

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });

});
