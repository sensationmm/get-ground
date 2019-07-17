import React from 'react'
import { shallow } from 'enzyme'

import MeetTheFounders from './MeetTheFounders'

jest.mock(window.assign)
describe('MeetTheFounders', () => {
  let wrapper;

  beforeEach(() => {
    window.location.assign = jest.fn();
    wrapper = shallow(<MeetTheFounders />);
  })

  afterEach(() => {
    window.location.assign.mockRestore();
  })

  test('expand', () => {
    expect(wrapper.find('[data-test="meet-the-founders-expanded"]').length).toEqual(0)
    wrapper.find('[data-test="read-more-button"]').props().onClick()
    expect(wrapper.find('[data-test="meet-the-founders-expanded"]').length).toEqual(1)
  })

  test('join us', () => {
    expect(wrapper.find('[data-test="join-us-button"]').length).toEqual(1)
    wrapper.find('[data-test="join-us-button"]').props().onClick()
    expect(window.location.assign).toHaveBeenCalledWith('mailto:info@getground.com?subject=Join Us');
  })
})
