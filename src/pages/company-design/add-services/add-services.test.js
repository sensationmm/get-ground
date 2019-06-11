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

  global.LC_API = {
    open_chat_window: jest.fn(),
    set_custom_variables: jest.fn()
  }

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
          find_mortgage: 'yes',
          find_property_insurance: 'no',
          find_property_management: 'yes'
        }
      }
    };

    wrapper = shallow(<AdditionalServices {...newProps} />)

    wrapper.unmount()

    expect(props.setAdditionalServices).toHaveBeenCalledWith({
      mortgage: true,
      insurance: false,
      management: true
    })
  })

  test('talk to us opens live chat with correct variables', () => {
    const newProps = {
      ...props,
      form: {
        values: {
          find_mortgage: 'yes',
          find_property_insurance: 'no',
          find_property_management: 'yes'
        }
      }
    };

    wrapper = shallow(<AdditionalServices {...newProps} />)

    wrapper.instance().handleLiveChat()
    expect(global.LC_API.open_chat_window).toHaveBeenCalled();
    expect(global.LC_API.set_custom_variables).toHaveBeenCalledWith(
      [
      { name: 'add services mortgage', value: 'yes' },
      { name: 'add services insurance', value: 'no' },
      { name: 'add services property management', value: 'yes' },
      ]
    );
  })

  afterEach(() => {
    jest.resetAllMocks();
  });
})
