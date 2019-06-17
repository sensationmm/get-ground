
import React from 'react'
import { shallow } from 'enzyme'
import { ProcessTracker } from './index'

jest.mock('src/assets/images/person.svg', () => '');

describe('process-tracker', () => {
  let wrapper;
  let props;

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
    }
  }

  beforeEach(() => {
    props = {
      t: jest.fn().mockReturnValue('test-string'),
      i18n: {
        t: jest.fn().mockReturnValue(mockSections),
      }
    }
    wrapper = shallow(<ProcessTracker {...props}/>);
  })
  test('renders title', () => {
    expect(wrapper.find('h3').text()).toEqual('test-string');
  })

  test('renders ProcessSection', () => {
    expect(wrapper.find('ProcessSection')).toHaveLength(3);
  })

  test('renders Checkbox', () => {
    expect(wrapper.find('Checkbox')).toHaveLength(1);
  })

  test('renders Button', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  })

})
