import React from 'react'
import { shallow } from 'enzyme'

import HowItWorks from './how-it-works'

jest.mock('react-i18next', () => ({
  initReactI18next: jest.fn(),
  useTranslation: () => ([
    jest.fn(),
    {t: jest.fn().mockReturnValue({
      step1: {
        title: 'test',
        copy: 'copy'
      },
      step2: {
        title: 'test',
        copy: 'copy'
      },
      step3: {
        title: 'test',
        copy: 'copy'
      },
      step4: {
        title: 'test',
        copy: 'copy'
      },
      step5: {
        title: 'test',
        copy: 'copy'
      }
    })},
  ])
}));

jest.mock('react-use/lib/useWindowScroll', () => () => ({
  y: 100
}))

describe('How it works page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HowItWorks />)
  })

  test('info rendered', () => {
    expect(wrapper.find('.how-it-works-step').length).toEqual(5)
  })

  test('contact us', () => {
    expect(wrapper.find('[data-test="how-it-works-contact-us"]').length).toEqual(1)
  })

  test('info rendered', () => {
    expect(wrapper.find('[data-test="how-it-works-more-information"]').length).toEqual(1)
  })

  test('vertical line', () => {
    expect(wrapper.find('[data-test="how-it-works-vertical-line"]').length).toEqual(1)
    expect(wrapper.find('[data-test="how-it-works-vertical-line"]').props().style).toEqual({height: '13%'})
  })
})
