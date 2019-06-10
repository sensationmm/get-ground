import React from 'react'
import { shallow } from 'enzyme'

import TableSlider from './TableSlider'

describe('TableSlider', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      leftHandFeed: [
        {
          copy: 'left-feed-copy',
          img: ''
        }
      ],
      smallFeed1: [
        {
          copy: 'small-feed1-copy',
          img: 'small-feed1-img'
        }
      ],
      smallFeed2: [
        {
          copy: 'small-feed2-copy',
          img: 'small-feed2-img'
        }
      ],
      feed1: [
        {
          copy: 'feed1-copy',
          img: 'feed1-img'
        }
      ],
      feed2: [
        {
          copy: 'feed2-copy',
          img: 'feed2-img'
        }
      ],
      tableName: 'tax'
    }
  })
  test('initial', () => {
    wrapper = shallow(<TableSlider {...props}/>)
    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="left-table"]').length).toEqual(1)
    expect(wrapper.find('[data-test="small-table"]').length).toEqual(2)
  })

  test('bullet points nav', () => {
    wrapper = shallow(<TableSlider {...props}/>)
    expect(wrapper.find('[data-test="left-table"]').length).toEqual(1)
    expect(wrapper.find('[data-test="small-table"]').length).toEqual(2)
    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('.table-slider-bullet').children().length).toEqual(3)
    wrapper.find('[data-test="bullet-point2"]').props().onClick()
    expect(wrapper.find('[data-test="small-table"]').length).toEqual(0)
    expect(wrapper.find('[data-test="personal-table"]').length).toEqual(1)
    expect(wrapper.find('[data-test="bullet-point2"]').props().className).toEqual('active')
    wrapper.find('[data-test="bullet-point3"]').props().onClick()
    expect(wrapper.find('[data-test="personal-table"]').length).toEqual(0)
    expect(wrapper.find('[data-test="company-table"]').length).toEqual(1)
  })
})
