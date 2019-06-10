import React from 'react'
import { shallow } from 'enzyme'

import AboutUs from './about-us'

describe('about us page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AboutUs />)
  })

  test('render', () => {
    expect(wrapper.length).toEqual(1)
  })

  test('about us title', () => {
    expect(wrapper.find('.about-us-title').text()).toEqual('aboutUs.title.first')
  })

  test('about us title second', () => {
    expect(wrapper.find('.about-us-title-second').text()).toEqual('aboutUs.title.second')
  })

  test('about us first content', () => {
    expect(wrapper.find('[data-test="content-first"]').text()).toEqual('aboutUs.content.first')
  })

  test('about us second content', () => {
    expect(wrapper.find('[data-test="content-second"]').text()).toEqual('aboutUs.content.second')
  })

  test('about us third content', () => {
    expect(wrapper.find('[data-test="content-third"]').text()).toEqual('aboutUs.content.third')
  })

  test('about us fourth content', () => {
    expect(wrapper.find('[data-test="content-fourth"]').text()).toEqual('aboutUs.content.fourth')
  })

  test('about us fifth content', () => {
    expect(wrapper.find('[data-test="content-fifth"]').text()).toEqual('aboutUs.content.fifth')
  })

  test('about us sixth content', () => {
    expect(wrapper.find('[data-test="content-sixth"]').text()).toEqual('aboutUs.content.sixth')
  })

  test('meet-the-founders', () => {
    expect(wrapper.find('[data-test="meet-the-founders"]').length).toEqual(1)
  })
})
