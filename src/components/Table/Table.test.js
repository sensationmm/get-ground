import React from 'react'
import { shallow } from 'enzyme'

import Table from './Table'

describe('Table', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      sections: [
        {
          copy: 'test-copy',
          img: 'test-img'
        }
      ],
      header: 'test-header',
      small: false
    }
  })

  test('initial', () => {
    wrapper = shallow(<Table {...props}/>)
    expect(wrapper.find('.table-section-img').props().src).toEqual('test-img')
    expect(wrapper.find('.table-section-copy').text()).toEqual('test-copy')
    expect(wrapper.find('.table-section-line').length).toEqual(1)
    expect(wrapper.find('.table-header').text()).toEqual('test-header')
  })

  test('images prop is true', () => {
    const customProps = {
      ...props,
      sections: [
        {
          copy: '',
          img: 'test-img'
        }
      ],
      images: true
    }
    wrapper = shallow(<Table {...customProps}/>)
    expect(wrapper.find('.table-section-img').props().src).toEqual('test-img')
    expect(wrapper.find('.table-section-copy').length).toEqual(0)
    expect(wrapper.find('.table-section-line').length).toEqual(1)
  })

  test('copy without image', () => {
    const customProps = {
      ...props,
      sections: [
        {
          copy: 'only-copy-test',
          img: ''
        }
      ],
    }
    wrapper = shallow(<Table {...customProps}/>)
    expect(wrapper.find('.table-section-img').length).toEqual(0)
    expect(wrapper.find('.table-section-copy').length).toEqual(1)
    expect(wrapper.find('.table-section-copy').text()).toEqual('only-copy-test')
    expect(wrapper.find('.table-section-line').length).toEqual(1)
  })

  test('multiple items in sections', () => {
    const customProps = {
      ...props,
      sections: [
        {
          copy: 'copy-test',
          img: 'test-img'
        },
        {
          copy: 'copy-test',
          img: 'test-img'
        },
        {
          copy: 'copy-test',
          img: 'test-img'
        }
      ],
    }
    wrapper = shallow(<Table {...customProps}/>)
    expect(wrapper.find('.table-section-copy').length).toEqual(3)
    expect(wrapper.find('.table-section-img').length).toEqual(3)
  })
})
