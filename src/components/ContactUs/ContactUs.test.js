import React from 'react'
import { shallow } from 'enzyme'

import ContactUs from './ContactUs'

describe('<ContactUs />', () => {
  let wrapper;

  beforeEach(()=>{
   wrapper = shallow(<ContactUs />)
  })

  it('title', () => {
    expect(wrapper.find('[data-test="contact-title"]').text()).toEqual('contactUs.title')
  })

  it('phone-title', () => {
    expect(wrapper.find('[data-test="phone-title"]').text()).toEqual('contactUs.phone')
  })

  it('email-title', () => {
    expect(wrapper.find('[data-test="email-title"]').text()).toEqual('contactUs.email')
  })

  it('divider', () => {
    expect(wrapper.find('[data-test="contact-divider"]').length).toEqual(1)
  })

  it('live chat button', () => {
    expect(wrapper.find('[data-test="livechat-button"]').length).toEqual(1)
  })
})
