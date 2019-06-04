import React from 'react'
import { shallow } from 'enzyme'

import MeetTheFounders from './MeetTheFounders'

describe('MeetTheFounders', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MeetTheFounders />);
  })

  test('click', () => {
    expect(wrapper.find('[data-test="meet-the-founders-expanded"]').length).toEqual(0)
    wrapper.find('[data-test="read-more-button"]').props().onClick()
    expect(wrapper.find('[data-test="meet-the-founders-expanded"]').length).toEqual(1)
  })
})
