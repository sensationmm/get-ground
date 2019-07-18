import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby';

import TextImage from 'src/components/_layout/TextImage/TextImage'

import DocumentsConfirmation from './index'

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('DocumentsConfirmation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DocumentsConfirmation />)
  })

  test('confirmation--copy', () => {

    expect(wrapper.find(TextImage).props().text).toEqual('myDocuments.confirmation.copy')
  })

  test('button', () => {
    wrapper.find(TextImage).props().buttonAction();
    expect(navigate).toHaveBeenCalledWith('/dashboard')
  })
})
