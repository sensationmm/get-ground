import React from 'react'
import { shallow } from 'enzyme'
import TextImage from 'src/components/_layout/TextImage/TextImage'

import OnboardingConfirmation from './index'

describe('OnboardingConfirmation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<OnboardingConfirmation />)
  })

  test('renders TextImage with correct props', () => {
    expect(wrapper.find(TextImage).length).toEqual(1)
    expect(wrapper.find(TextImage).props().title).toEqual('onBoarding.confirmation.heading')
    expect(wrapper.find(TextImage).props().image).toEqual({})
    expect(wrapper.find(TextImage).props().text).toEqual('onBoarding.confirmation.copy')
    expect(wrapper.find(TextImage).props().buttonLabel).toEqual('onBoarding.confirmation.buttonText')
  })
})
