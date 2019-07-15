import React from 'react'
import { shallow } from 'enzyme'

import { RawComponent as PropertyAddress } from './index'

describe('PropertyAddress', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      company: {
        property_address: {
          address: {
            is_confirmed: true
          },
          is_confirmed: true
        }
      },
      form: {
        values: {},
        errors: {},
        showErrorMessage: false
      },
      t: jest.fn()
    }
    wrapper = shallow(<PropertyAddress {...props} />)
  })

  test('intro box', () => {
    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('companyDesign.propertyAddress.intro')
  })

  test('buttons', () => {
    expect(wrapper.find('[data-test="button"]').length).toEqual(2)
  })
})
