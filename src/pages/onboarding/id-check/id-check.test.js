import React from 'react'
import { shallow } from 'enzyme'
import IdCheck from './index'
import AddPassport from 'src/components/AddProof/Passport/AddPassport'

describe('id-check', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<IdCheck />);
  })
  test('renders id-check', () => {
    expect(wrapper.length).toEqual(1);
  })

  test('renders header', () => {
    expect(wrapper.find('.id-check-title').text()).toEqual('onBoarding.idCheck.title')
  })

  test('renders AddPassport', () => {
    expect(wrapper.find(AddPassport).length).toEqual(1)
  })
})
