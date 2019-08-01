import React from 'react'
import { shallow } from 'enzyme'

import Footer from './Footer'

jest.mock('react-i18next', () => ({
  useTranslation: () => ([
    jest.fn(),
    {t: jest.fn().mockReturnValue({
      link0: {
        title: 'test'
      },
      link1: {
        title: 'test'
      },
      link2: {
        title: 'test'
      },
      link3: {
        title: 'test'
      },
      link4: {
        title: 'test'
      },
      link5: {
        title: 'test'
      },
      link6: {
        title: 'test'
      },
      link7: {
        title: 'test'
      },
      link8: {
        title: 'test'
      },
      link9: {
        title: 'test'
      },
    })},
  ])
}));

describe('', () => {
  let wrapper;
  const props = {
    location: ''
  };

  beforeEach(() => {
    wrapper = shallow(<Footer {...props}/>)
  })

  test('renders footer', () => {
    expect(wrapper.find('[data-test="component-footer"]').length).toEqual(1)
  })

  test('footer logo', () => {
    expect(wrapper.find('[data-test="component-footer-img"]').length).toEqual(1)
  })

  test('footer links', () => {
    expect(wrapper.find('[data-test="component-footer-navigation"]').children().length).toEqual(9)
  })

  test('footer location', () => {
    expect(wrapper.find('[data-test="component-footer-location"]').length).toEqual(1)
  })

  test('footer legal', () => {
    expect(wrapper.find('[data-test="component-footer-legal"]').length).toEqual(1)
  })
})
