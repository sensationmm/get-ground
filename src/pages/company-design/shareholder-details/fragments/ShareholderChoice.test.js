import React from 'react';
import ShareholderChoice from './ShareholderChoice'
import { shallow } from 'enzyme';

import TextImage from 'src/components/_layout/TextImage/TextImage';

describe('ShareholderChoice', () => {
  let wrapper, component;

  beforeEach(() => {
    wrapper = shallow(<ShareholderChoice />);

    component = wrapper.find(TextImage);
  })

  test('renders shareholder', () => {
    expect(wrapper.length).toEqual(1);
  })

  test('renders title', () => {
    expect(component.props().title).toEqual('companyDesign.shareholderDetails.choice.allOwnership');
  })

  test('renders question', () => {
    expect(component.props().text).toEqual('<p className="shareholder-choice-question">companyDesign.shareholderDetails.choice.addShareholdersContent</p>');
  })

  test('renders add shareholder button', () => {
    expect(component.props().buttonLabel).toEqual('companyDesign.shareholderDetails.choice.button.yesAdd');
  })

  test('renders only one shareholder button', () => {
    expect(component.props().buttonSecondaryLabel).toEqual('companyDesign.shareholderDetails.choice.button.no');
  })
})
