import React from 'react'
import { shallow } from 'enzyme'

import TrustAndPrivacy from './TrustAndPrivacy'

jest.mock('react-i18next', () => ({
  useTranslation: () => ([
    jest.fn(),
    {t: jest.fn().mockReturnValue({
      info0: {
        title: 'test',
        copy: 'copy'
      },
      info1: {
        title: 'test',
        copy: 'copy'
      },
      info2: {
        title: 'test',
        copy: 'copy'
      },
      info3: {
        title: 'test',
        copy: 'copy'
      },
      info4: {
        title: 'test',
        copy: 'copy'
      },
      info5: {
        title: 'test',
        copy: 'copy'
      },
      info6: {
        title: 'test',
        copy: 'copy'
      },
      info7: {
        title: 'test',
        copy: 'copy'
      }
    })},
  ])
}));

describe('', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TrustAndPrivacy />)
  })

  test('intial state', () => {
    const button = wrapper.find('[data-test="read-more-button"]')
    const info = wrapper.find('[data-test="trustAndPrivacy-info"]')
    expect(button.length).toEqual(1)
    expect(info.length).toEqual(0)
    expect(wrapper.find('.trustAndPrivacy-title').length).toEqual(1)
    expect(wrapper.find('.trustAndPrivacy-subTitle').length).toEqual(1)
    expect(wrapper.find('.trustAndPrivacy-logos').length).toEqual(1)
    expect(wrapper.find('.trustAndPrivacy-logos').children().length).toEqual(4)
  })

  test('clicks read more button shows info', () => {
    const button = wrapper.find('[data-test="read-more-button"]')
    const info = wrapper.find('[data-test="trustAndPrivacy-info"]')
    expect(button.length).toEqual(1)
    expect(info.length).toEqual(0)
    expect(wrapper.find('.trustAndPrivacy-info-title').length).toEqual(0)
    button.props().onClick()
    expect(wrapper.find('.trustAndPrivacy-info-title').length).toEqual(8)
  })
})
