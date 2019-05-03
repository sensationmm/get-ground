
import React from 'react'
import { shallow } from 'enzyme'
import { ProcessTracker } from './index'

jest.mock('src/assets/images/person.svg', () => '');

describe('process-tracker', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      t: jest.fn().mockReturnValue('test-string'),
      i18n: {
        t: jest.fn().mockReturnValue('string'),
      }
    }
    wrapper = shallow(<ProcessTracker {...props}/>);
  })
  test('renders title', () => {
    expect(wrapper.find('h3').text()).toEqual('test-string');
  })

  test('renders ProcessSection', () => {
    expect(wrapper.find('ProcessSection')).toHaveLength(5);
  })

  test('renders Checkbox', () => {
    expect(wrapper.find('Checkbox')).toHaveLength(1);
  })

  test('renders Button', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  })

})
