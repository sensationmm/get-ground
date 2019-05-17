import React from 'react'
import { shallow } from 'enzyme'

import { AdditionalServices } from './index'

describe('', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      setAdditionalServices: jest.fn(),
      t: jest.fn()
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
  })

  test('unmount calls action to send answers to redux state', () => {
    wrapper.setState({
      values: {
        find_mortgage: 'yes',
        find_property_insurance: 'no',
        find_property_management: 'yes'
      }
    })

    wrapper.unmount()

    expect(props.setAdditionalServices).toHaveBeenCalledWith({
      mortgage: true,
      insurance: false,
      management: true
    })
  })
})
