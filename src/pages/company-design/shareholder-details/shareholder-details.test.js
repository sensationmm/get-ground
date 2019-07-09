import React from 'react'
import { shallow } from 'enzyme'

import ShareholderChoice from './fragments/ShareholderChoice';
import AddShareholder from './fragments/AddShareholder';
import ShareholderShares from './fragments/ShareholderShares';

import {RawComponent as ShareholderDetails} from './index'

describe('Shareholder details page', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      t: jest.fn(),
      form: {
        values: [
          {
            first_name: 'first-name',
            last_name: 'last-name',
            email: 'first-name1@email.co.uk'
          },
          {
            first_name: 'first-name',
            last_name: 'last-name',
            email: 'first-name2@email.co.uk'
          }
        ],
        errors: {},
        showErrorMessage: false
      },
      user: {
        first_name: 'first-name-test',
        last_name: 'last-name-test',
        email: 'creator@email.co.uk'
      },
      company: {
        shareholder_details: {
          collection: [
            {},
            {}
          ]
        }
      }
    }

    wrapper = shallow(<ShareholderDetails {...props} />)
  })

  test('renders ShareholderChoice', () => {
    expect(wrapper.length).toEqual(1)
    wrapper.setState({hasShareholders: false})
    expect(wrapper.find(ShareholderChoice).length).toEqual(1)
  })

  test('renders 2 AddShareholder components', () => {
    expect(wrapper.find(AddShareholder).length).toEqual(2)
  })

  test('renders 3 ShareholderShares components', () => {
    wrapper.setState({stage: 'confirm'})
    expect(wrapper.find(ShareholderShares).length).toEqual(3)
  })
})
