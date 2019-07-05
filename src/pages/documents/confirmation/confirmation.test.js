import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby';

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
    expect(wrapper.find('.confirmation--copy').props().dangerouslySetInnerHTML).toEqual({ __html: 'myDocuments.confirmation.copy' })
  })

  test('button', () => {
    expect(wrapper.find('[data-test="button"]').length).toEqual(1)
    wrapper.find('[data-test="button"]').props().onClick()
    expect(navigate).toHaveBeenCalledWith('/dashboard')
  })
})
