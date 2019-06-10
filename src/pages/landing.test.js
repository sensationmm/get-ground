import React from 'react'
import { shallow } from 'enzyme'
import ImageFull from 'src/components/ImageFull/ImageFull'

import Landing from './index'

describe('<Landing />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Landing />)
  })

  test('landing title', () => {
    expect(wrapper.find('[data-test="landing-title"]').text()).toEqual('landing.title')
  })

  test('landing secondary title', () => {
    expect(wrapper.find('[data-test="landing-secondary-title"]').text()).toEqual('landing.secondaryTitle')
  })

  test('landing image', () => {
    expect(wrapper.find('[data-test="landing-img"]').type()).toEqual(ImageFull)
  })

  test('landing content first paragraph', () => {
    expect(wrapper.find('[data-test="landing-content-first"]').text()).toEqual('landing.firstParagraph')
  })

  test('landing content second paragraph', () => {
    expect(wrapper.find('[data-test="landing-content-second"]').text()).toEqual('landing.secondParagraph')
  })

  test('landing content third paragraph', () => {
    expect(wrapper.find('[data-test="landing-content-third"]').text()).toEqual('landing.thirdParagraph')
  })

})
