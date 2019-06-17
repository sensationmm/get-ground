import React from 'react'
import { shallow } from 'enzyme'

import Decline from './index'

describe('acceptance-of-role decline', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      location: {
        state: {
          inviteeName: 'Tom Sawyer'
        }
      }
    }
    wrapper = shallow(<Decline {...props} />)
  })

  test('intro copy with name' , () => {
    expect(wrapper.find('.acceptance-of-role--copy-intro').text()).toEqual('acceptanceOfRole.decline.content.firstIntro Tom Sawyer acceptanceOfRole.decline.content.firstContinue')
  })

  test('correct copy' , () => {
    expect(wrapper.find('.acceptance-of-role--copy').text()).toEqual('acceptanceOfRole.decline.content.second')
  })

  test('has one image' , () => {
    expect(wrapper.find('.acceptance-of-role--img').length).toEqual(1)
  })
})
