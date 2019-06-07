import React from 'react';

import WhatWeDo from './what-we-do'
import TrustAndPrivacy from 'src/components/TrustAndPrivacy/TrustAndPrivacy'

import { shallow } from 'enzyme'

describe('what-we-do page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<WhatWeDo />)
  })

  test('img', () => {
    expect(wrapper.find('[data-test="whatWeDo-img"]').length).toEqual(1)
  })

  test('title', () => {
    expect(wrapper.find('[data-test="whatWeDo-title"]').text()).toEqual('whatWeDo.title')
  })

  test('first content paragrpah', () => {
    expect(wrapper.find('[data-test="whatWeDo-content-first"]').text()).toEqual('whatWeDo.content.first')
  })

  test('second content paragrpah', () => {
    expect(wrapper.find('[data-test="whatWeDo-content-second"]').text()).toEqual('whatWeDo.content.second')
  })

  test('third content paragrpah', () => {
    expect(wrapper.find('[data-test="whatWeDo-content-third"]').text()).toEqual('whatWeDo.content.third')
  })

  test('fourth content paragrpah', () => {
    expect(wrapper.find('[data-test="whatWeDo-content-fourth"]').text()).toEqual('whatWeDo.content.fourth')
  })

  test('fifth content paragrpah', () => {
    expect(wrapper.find('[data-test="whatWeDo-content-fifth"]').text()).toEqual('whatWeDo.content.fifth')
  })

  test('TrustAndPrivacy', () => {
    expect(wrapper.find(TrustAndPrivacy).length).toEqual(1)
  })
})
