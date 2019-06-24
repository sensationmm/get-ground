import React from 'react'
import { shallow } from 'enzyme'

import { RawComponent as Advantages } from './advantages'

jest.mock('react-i18next', () => ({
  initReactI18next: jest.fn(),
  withTranslation: () => Component => props => <Component t={k => k} {...props} />,
  useTranslation: () => ([
    jest.fn(),
    {t: jest.fn().mockReturnValue({
      tax: {},
      company: {},
      table: {
        left: {
          info1: 'test'
        },
        right: {
          large: {
            feed1: {
              info1: 'test'
            },
            feed2: {
              info1: 'test'
            }
          }
        }
      }
    })},
  ])
}));

describe('', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Advantages isMobile={true} />)
  })

  test('tax', () => {
    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="tax-table-slider"]').length).toEqual(0)
    expect(wrapper.find('.advantages-uk-tax-info').length).toEqual(5)
    wrapper.find('[data-test="tax-more-button"]').simulate('click')
    expect(wrapper.find('[data-test="tax-more-button"]').length).toEqual(0)
    expect(wrapper.find('[data-test="tax-table-slider"]').length).toEqual(1)
    expect(wrapper.find('.advantages-uk-tax-more-expanded-info').length).toEqual(1)
  })

  test('company', () => {
    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="company-table-slider"]').length).toEqual(0)
    expect(wrapper.find('.advantages-company-info').length).toEqual(3)
    wrapper.find('[data-test="company-more-button"]').simulate('click')
    expect(wrapper.find('[data-test="company-more-button"]').length).toEqual(0)
    expect(wrapper.find('[data-test="company-table-slider"]').length).toEqual(1)
    expect(wrapper.find('.advantages-company-more-expanded-info').length).toEqual(1)
  })
})
