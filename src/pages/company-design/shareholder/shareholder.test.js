import React from 'react'
import Shareholder from './index'
import { shallow } from 'enzyme'
import Button from 'src/components/_buttons/Button/Button'

describe('Shareholder', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Shareholder />)
  })

  test('renders shareholder', () => {
    expect(wrapper.length).toEqual(1);
  })

  test('renders img with alt', () => {
    expect(wrapper.find('.shareholder-icon').props().alt).toEqual('100% ownership')
  })

  test('renders title', () => {
    expect(wrapper.find('.shareholder-title').text()).toEqual('companyDesign.shareholder.allOwnership')
  })

  test('renders question', () => {
    expect(wrapper.find('.shareholder-question').text()).toEqual('companyDesign.shareholder.addShareholdersContent')
  })

  test('renders two buttons', () => {
    expect(wrapper.find(Button).length).toEqual(2)
  })

  test('renders add shareholder button', () => {
    const addBtn = wrapper.find('[data-test="add-btn"]');
    expect(addBtn.props().classes).toEqual('primary shareholder-add-btn')
    expect(addBtn.props().label).toEqual('companyDesign.shareholder.button.yesAdd')
    expect(addBtn.props().fullWidth).toEqual(true)
    expect(addBtn.type()).toEqual(Button)
  })

  test('renders only one shareholder button', () => {
    const addBtn = wrapper.find('[data-test="only-one-btn"]');
    expect(addBtn.props().classes).toEqual('secondary shareholder-no-btn')
    expect(addBtn.props().label).toEqual('companyDesign.shareholder.button.no')
    expect(addBtn.props().fullWidth).toEqual(true)
    expect(addBtn.type()).toEqual(Button)
  })
})
