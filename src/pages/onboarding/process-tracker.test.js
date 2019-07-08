
import React from 'react'
import { navigate } from 'gatsby';
import { shallow } from 'enzyme'
import { RawComponent as ProcessTracker, AccountService } from './index'

import Checkbox from 'src/components/_form/Checkbox/Checkbox';

jest.mock('src/assets/images/person.svg', () => '');

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('process-tracker', () => {
  let wrapper;
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  AccountService.getUser = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
  AccountService.completeOnboarding = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));

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
    },
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    userID: 1,
    isLoading: true
  };

  beforeEach(() => {
    wrapper = shallow(<ProcessTracker {...props}/>);
    jest.spyOn(wrapper.instance(), 'getProgress');
  })

  test('renders title', () => {
    expect(wrapper.find('h1').text()).toEqual('test-string');
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

  test('refetch progress', () => {
    wrapper.setProps({ isLoading: false });

    expect(wrapper.instance().getProgress).toHaveBeenCalled();
  });

  test('refetch progress without user set', () => {
    const newProps = {
      ...props,
      userID: null
    }
    wrapper = shallow(<ProcessTracker {...newProps} />);

    expect(AccountService.getUser).toHaveBeenCalledTimes(1); // called once from beforeEach not this test
  });

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

      expect(AccountService.completeOnboarding).toHaveBeenCalled();
    });
  });

  test('redirect after completion', () => {
    const newProps = {
      ...props,
      last_page_visited: 'dashboard'
    }

    wrapper = shallow(<ProcessTracker {...newProps}/>);

    expect(navigate).toHaveBeenCalledWith('/dashboard');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
})
