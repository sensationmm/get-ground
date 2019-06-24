import React from 'react';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';
import { navigate } from 'gatsby';

import { RawComponent as PurchaseDetails, CompanyService } from './index';
import Button from 'src/components/_buttons/Button/Button';
import Datepicker from 'src/components/Datepicker/Datepicker';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import { initialState as ReduxFormMock } from 'src/state/reducers/form';

jest.mock('gatsby', () => ({
  navigate: jest.fn(),
  Link: 'link'
}));

describe('purchase details', () => {
  let wrapper;
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  CompanyService.updateCompany = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
  const mockEvent = {
    target: {
      id: 'completionDate'
    }
  };
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    form: ReduxFormMock,
    company: {
      purchase_details:{
        price:{
          amount_in_cents:50000000,
          currency:'GBP'
        },
        is_new_build:null,
        completion_date:'2020-09-08T00:00:00Z',
        expected_exchange_date:'2020-10-12T00:00:00Z',
        payment_schedule:[
           {
              type:'deposit',
              due_date:'2019-09-06T00:00:00Z',
              amount:{
                amount_in_cents:10000000,
                currency:'GBP'
              }
           },
           {
            type:'first_installment',
            due_date:'2019-09-06T00:00:00Z',
            amount:{
               amount_in_cents:10000000,
               currency:'GBP'
            }
          },
          {
            type:'second_installment',
            due_date:'2019-09-06T00:00:00Z',
            amount:{
               amount_in_cents:10000000,
               currency:'GBP'
            }
          }
        ]
      },
      additional_services:{
        solicitor: false
      }
    }
  }
  jest.spyOn(formUtils, 'initFormState');
  jest.spyOn(formUtils, 'clearFormState');

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
    expect(formUtils.initFormState).toHaveBeenCalledTimes(1);
  });

  test('form cleared on unmount', () => {
    jest.spyOn(formUtils, 'clearFormState');
    wrapper.unmount();
    expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
  });

  test('renders error message if errors present', () => {
    wrapper = setup(PurchaseDetails, {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        showErrorMessage: true
      }
    });
    expect(wrapper.contains(<ErrorBox>string</ErrorBox>)).toBe(true);
  });

  test('expect checkElementHidden to return true if is_new_build is equal to null', () => {
    const wrapper = setup(PurchaseDetails, {
      ...defaultProps, 
      form: {
        ...defaultProps.form,
        values: {
          ...defaultProps.form.values,
          is_new_build: null
        }
      }
    });
    const hidden = wrapper.instance().checkElementHidden();

    expect(hidden).toEqual(true);
  });

  test('expect checkElementHidden to return true if is_new_build is equal to false', () => {
    const wrapper = setup(PurchaseDetails, {
      ...defaultProps, 
      form: {
        ...defaultProps.form,
        values: {
          ...defaultProps.form.values,
          is_new_build: false
        }
      }
    });
    const hidden = wrapper.instance().checkElementHidden();

    expect(hidden).toEqual(true);
  });

  describe('is_new_build', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup(PurchaseDetails, {
        ...defaultProps, 
        form: {
          ...defaultProps.form,
          values: {
            ...defaultProps.form.values,
            is_new_build: true
          }
        }
      });
    })

    test('expect checkElementHidden to return false if is_new_build is equal to true', () => {
      const hidden = wrapper.instance().checkElementHidden();

      expect(hidden).toEqual(false);
    });

    test('expect showNextInstallment to be called when button is clicked', () => {
      const component = findByTestAttr(wrapper, 'container-company-design-purchase-details');
      wrapper.instance().showNextInstallment = jest.fn();

      component.find(Button).at(0).props().onClick();

      expect(wrapper.instance().showNextInstallment).toHaveBeenCalled();
    });

    test('expect closeDatePicker to be called when the Datepicker is closed', () => {
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
  });

  test('expect setDateFieldValue to called when a date is selected in the Datepicker', () => {
    const component = findByTestAttr(wrapper, 'container-company-design-purchase-details');

    jest.spyOn(wrapper.instance(), 'setDateFieldValue');

    component.find(Datepicker).props().setDateFieldValue();

    expect(wrapper.instance().setDateFieldValue).toHaveBeenCalled();
  });

  test(`expect navigate to go to /company-design/shareholder-details when solicitor 
    has been selected on additional services (when skip button is clicked)`, () => {
    wrapper = setup(PurchaseDetails, { ...defaultProps,
      company: {
        purchase_details:{
          price:{
            amount_in_cents:50000000,
            currency:'GBP'
          },
          is_new_build:false,
          completion_date:'2020-09-08T00:00:00Z',
          expected_exchange_date:'2020-10-12T00:00:00Z',
          payment_schedule:[
             {
                type:'deposit',
                due_date:'2019-09-06T00:00:00Z',
                amount:{
                  amount_in_cents:10000000,
                  currency:'GBP'
                }
             },
             {
              type:'first_installment',
              due_date:'2019-09-06T00:00:00Z',
              amount:{
                 amount_in_cents:10000000,
                 currency:'GBP'
              }
            },
            {
              type:'second_installment',
              due_date:'2019-09-06T00:00:00Z',
              amount:{
                 amount_in_cents:10000000,
                 currency:'GBP'
              }
            }
          ]
        },
        additional_services:{
          solicitor: true
        }
      }
    });
    const button = findByTestAttr(wrapper, 'skip-button');

    button.props().onClick();
    expect(navigate).toHaveBeenCalledWith('/company-design/shareholder-details');
  });

  test(`expect navigate to go to /company-design/solicitor-details when solicitor 
    has NOT been selected on additional services (when skip button is clicked)`, () => {
    const button = findByTestAttr(wrapper, 'skip-button');

    button.props().onClick();
    expect(navigate).toHaveBeenCalledWith('/company-design/solicitor-details');
  });

  describe('createAccount()', () => {
    let spy;

    test('submit purchase details success and solicitor was selected on additional services', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      CompanyService.updateCompany = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
      const wrapperNew = setup(PurchaseDetails, { ...defaultProps,
        company: {
          purchase_details:{
            price:{
              amount_in_cents:50000000,
              currency:'GBP'
            },
            is_new_build:false,
            completion_date:'2020-09-08T00:00:00Z',
            expected_exchange_date:'2020-10-12T00:00:00Z',
            payment_schedule:[
               {
                  type:'deposit',
                  due_date:'2019-09-06T00:00:00Z',
                  amount:{
                    amount_in_cents:10000000,
                    currency:'GBP'
                  }
               },
               {
                type:'first_installment',
                due_date:'2019-09-06T00:00:00Z',
                amount:{
                   amount_in_cents:10000000,
                   currency:'GBP'
                }
              },
              {
                type:'second_installment',
                due_date:'2019-09-06T00:00:00Z',
                amount:{
                   amount_in_cents:10000000,
                   currency:'GBP'
                }
              }
            ]
          },
          additional_services:{
            solicitor: true
          }
        }
      });
      
      await wrapperNew.instance().submitPurchaseDetails();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('/company-design/shareholder-details');
      expect(spy).toHaveBeenCalled();
    });

    test('submit purchase details success and solicitor was NOT selected on additional services', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      CompanyService.updateCompany = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
      const wrapperNew = setup(PurchaseDetails, { ...defaultProps });
      
      await wrapperNew.instance().submitPurchaseDetails();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('/company-design/solicitor-details');
      expect(spy).toHaveBeenCalled();
    });

    test('submit purchase details failure', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      const errorSpy = jest.spyOn(formUtils, 'setFormError');
      CompanyService.updateCompany = jest.fn().mockReturnValue(Promise.resolve({ status: 400 }));
      const wrapperNew = setup(PurchaseDetails, defaultProps);
      
      await wrapperNew.instance().submitPurchaseDetails();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith('string');
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
