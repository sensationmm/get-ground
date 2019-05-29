import React from 'react';
import ShareholderChoice from './ShareholderChoice'
import Button from 'src/components/_buttons/Button/Button'
import { shallow } from 'enzyme';

describe('ShareholderChoice', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ShareholderChoice />);
  })

  test('renders shareholder', () => {
    expect(wrapper.length).toEqual(1);
  })

  test('renders img with alt', () => {
    expect(wrapper.find('.shareholder-choice-icon').props().alt).toEqual('100% ownership');
  })

  test('renders title', () => {
    expect(wrapper.find('.shareholder-choice-title').text()).toEqual('companyDesign.shareholderDetails.choice.allOwnership');
  })

  test('renders question', () => {
    expect(wrapper.find('.shareholder-choice-question').text()).toEqual('companyDesign.shareholderDetails.choice.addShareholdersContent');
  })

  test('renders two buttons', () => {
    expect(wrapper.find(Button).length).toEqual(2);
  })

  test('renders add shareholder button', () => {
    const addBtn = wrapper.find('[data-test="add-btn"]');
    expect(addBtn.props().classes).toEqual('primary shareholder-choice-add-btn');
    expect(addBtn.props().label).toEqual('companyDesign.shareholderDetails.choice.button.yesAdd');
    expect(addBtn.props().fullWidth).toEqual(true);
    expect(addBtn.type()).toEqual(Button);
  })

  test('renders only one shareholder button', () => {
    const addBtn = wrapper.find('[data-test="only-one-btn"]');
    expect(addBtn.props().classes).toEqual('secondary shareholder-choice-no-btn')
    expect(addBtn.props().label).toEqual('companyDesign.shareholderDetails.choice.button.no')
    expect(addBtn.props().fullWidth).toEqual(true)
    expect(addBtn.type()).toEqual(Button)
  })
})
