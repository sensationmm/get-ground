import React from 'react'
import { shallow } from 'enzyme'

import { Camera } from './Camera'

jest.mock('jslib-html5-camera-photo')

describe('<Camera />', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      section: 'passport',
      t: jest.fn(),
      setImg: jest.fn(),
      active: 'passport',
      setRetake: jest.fn()
    }
  })

  it('take picture', () => {

    wrapper = shallow(<Camera {...props}/>)

    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.image.capture')

    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="camera"]').length).toEqual(1)
    expect(wrapper.find('[data-test="capture-button"]').length).toEqual(1)
    wrapper.find('[data-test="capture-button"]').simulate('click')
    expect(props.setImg).toHaveBeenCalled()
    expect(props.setRetake).toHaveBeenCalled()
  })
})
