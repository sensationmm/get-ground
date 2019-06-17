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
      setAdditionalServices: jest.fn(),
      t: jest.fn(),
      form: ReduxFormMock
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

  test('unmount calls action to send answers to redux state', () => {
    const newProps = {
      ...props,
      form: {
        values: {
          hasUsedAdditionalServices: true,
          find_mortgage: 'yes',
          find_property_insurance: 'no',
          find_property_management: 'yes',
          find_solicitor: 'yes'
        }
      }
    };

    wrapper = shallow(<AdditionalServices {...newProps} />)

    wrapper.unmount()

    expect(props.setAdditionalServices).toHaveBeenCalledWith({
      hasUsedAdditionalServices: true,
      mortgage: true,
      insurance: false,
      management: true,
      solicitor: true
    })
  })

  afterEach(() => {
    jest.resetAllMocks();
  });
})
