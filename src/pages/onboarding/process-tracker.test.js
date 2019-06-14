
import React from 'react'
import { navigate } from 'gatsby';
import { shallow } from 'enzyme'
import { ProcessTracker } from './index'

import Checkbox from 'src/components/_form/Checkbox/Checkbox';

jest.mock('src/assets/images/person.svg', () => '');

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('process-tracker', () => {
  let wrapper;

  const mockSections = {
    step1: {
      'title': 'Account Details',
      'copy': 'Create your account',
      'imageAltText': 'Person'
    },
    step2: {
      'title': 'Personal Details',
      'copy': 'Details to create your profile',
      'imageAltText': 'Person'
    },
    step3: {
      title: 'ID Check',
      copy: 'Tax and regulatory details',
      'imageAltText': 'ID card'
    },
  }
  const props = {
    t: jest.fn().mockReturnValue('test-string'),
    i18n: {
      t: jest.fn().mockReturnValue(mockSections),
    }
  };

  beforeEach(() => {
    wrapper = shallow(<ProcessTracker {...props}/>);
  })

  test('renders title', () => {
    expect(wrapper.find('h3').text()).toEqual('test-string');
  })

  test('renders ProcessSection', () => {
    expect(wrapper.find('ProcessSection')).toHaveLength(3);
  })

  test('hides Checkbox until sections complete', () => {
    expect(wrapper.find('Checkbox')).toHaveLength(0);
  })

  test('hides Button until sections complete', () => {
    expect(wrapper.find('Button')).toHaveLength(0);
  })

  describe('onboarding complete', () => {
    const newProps = {
      ...props,
      progress: {
        account_details_status: 'COMPLETE',
        personal_details_status: 'COMPLETE',
        id_check_status: 'COMPLETE'
      }
    }
    beforeEach(() => {
      wrapper = shallow(<ProcessTracker {...newProps}/>);
    });

    test('renders Checkbox', () => {
      const checkbox = wrapper.find(Checkbox);
      expect(checkbox).toHaveLength(1);
      checkbox.dive().find('.checkbox-layout').simulate('click');

      expect(wrapper.state().checkbox).toBe(true);
    });
  
    test('renders Button', () => {
      const button = wrapper.find('Button');
      expect(button).toHaveLength(1);
      button.simulate('click');

      expect(navigate).toHaveBeenCalledWith('/onboarding/confirmation');
    });
  });

})
