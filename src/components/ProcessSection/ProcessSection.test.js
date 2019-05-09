import React from 'react'
import { shallow } from 'enzyme'
import { ProcessSection } from './ProcessSection'

describe('ProcessSection', () => {
  let wrapper;
  const props = {
    title: 'test-title',
    imageAltText: 'test-alt-text',
    copy: 'test-copy',
    path: '/test-path'
  }

  beforeEach(() => {
    wrapper = shallow(<ProcessSection {...props}/>)
  })
  test('title', () => {
    expect(wrapper.find('h3').text()).toEqual(props.title)
  })

  test('copy', () => {
    expect(wrapper.find('.process-section-copy').text()).toEqual(props.copy)
  })

  test('img alt text', () => {
    expect(wrapper.find('img').props().alt).toEqual(props.imageAltText)
  })

  test('is-disabled', () => {
    wrapper = shallow(<ProcessSection {...props} isDisabled={true} />)
    expect(wrapper.find('.process-section').hasClass('is-disabled')).toEqual(true)
  })
})
