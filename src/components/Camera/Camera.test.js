import React from 'react'
import { shallow } from 'enzyme'

import { ProofCamera } from './Camera'

jest.mock('jslib-html5-camera-photo')

describe('<Camera />', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      section: 'passport',
      setImg: jest.fn(),
      active: 'passport',
      setRetake: jest.fn()
    }
  })

  it('take picture', () => {

    wrapper = shallow(<ProofCamera {...props}/>)

    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="camera"]').length).toEqual(1)
    wrapper.instance().onTakePhoto()
    expect(props.setImg).toHaveBeenCalled()
    expect(props.setRetake).toHaveBeenCalledWith('passport', true)
  })
})
