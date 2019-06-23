import React from 'react'
import { shallow } from 'enzyme'

import { RawComponent as AcceptanceOfRoleModal,  ModalService } from './index'

describe('acceptance of role modal', () => {
  let wrapper
  let props
  ModalService.fetchModalContent = jest.fn('val').mockReturnValue(Promise.resolve({ data: { markdown_text: '<h1>HI</h1>' } }));
  beforeEach(() => {
    props = {
      content: 'being a director',
      t: jest.fn(),
      showLoader: jest.fn(),
      isShareholder: false
    }
    wrapper = shallow(<AcceptanceOfRoleModal {...props} />)
  })

  test('calls getModalContent when button clicked', () => {
    wrapper.find('[data-test="modal-button"]').simulate('click', {preventDefault() {}})
    expect(props.showLoader).toHaveBeenCalled()
  })
})
