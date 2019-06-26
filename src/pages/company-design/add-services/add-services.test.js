import React from 'react'
import { shallow } from 'enzyme'

import { AdditionalServices } from './index'
import { initialState as ReduxFormMock } from 'src/state/reducers/form';
import formUtils from 'src/utils/form';

describe('', () => {
  let wrapper;
  let props;
  jest.spyOn(formUtils, 'initFormState');
  jest.spyOn(formUtils, 'clearFormState');

  beforeEach(() => {
    props = {
      t: jest.fn(),
      form: ReduxFormMock,
      companyUpdate: jest.fn(),
      company: {
        additional_services:{
          mortgage: null,
          insurance: null,
          management: null,
          solicitor: null
        },
      }
    }
    wrapper = shallow(<AdditionalServices {...props} />)
  })

  test('renders questions', () => {
    expect(props.t).toHaveBeenCalledWith('additionalServices.mortgageOptionsQuestion');
    expect(props.t).toHaveBeenCalledWith('additionalServices.propertyInsuranceQuestion');
    expect(props.t).toHaveBeenCalledWith('additionalServices.property_managementQuestion');
  })

  test('renders form', () => {
    expect(wrapper.find('.add-services-form').length).toEqual(1)
    expect(formUtils.initFormState).toHaveBeenCalledTimes(1);
  });

  test('form cleared on unmount', () => {
    wrapper.unmount();
    expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
})
