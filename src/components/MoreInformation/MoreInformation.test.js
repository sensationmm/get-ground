import React from 'react'
import { shallow } from 'enzyme'

import MoreInformation from './MoreInformation'

jest.mock('react-i18next', () => ({
  initReactI18next: jest.fn(),
  useTranslation: () => ([
    jest.fn(),
    {t: jest.fn().mockReturnValue({
      info1: {
        title: 'test'
      },
      info2: {
        title: 'test'
      },
      info3: {
        title: 'test'
      },
      info4: {
        title: 'test'
      },
      info5: {
        title: 'test'
      },
      info6: {
        title: 'test'
      },
      info7: {
        title: 'test'
      },
      info8: {
        title: 'test'
      }
    })},
  ])
}));

describe('<MoreInformation />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MoreInformation />)
  })

  test('expands and shows info', () => {
    expect(wrapper.find('[data-test="more-information-info"]').length).toEqual(0)
    expect(wrapper.find('[data-test="more-information-button"]').length).toEqual(1)
    wrapper.find('[data-test="more-information-button"]').props().onClick()
    expect(wrapper.find('[data-test="more-information-info"]').length).toEqual(8)
    expect(wrapper.find('[data-test="more-information-button"]').length).toEqual(0)
  })
})
