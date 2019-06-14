import React from 'react'
import { shallow } from 'enzyme'

import { initialState as ReduxFormMock } from 'src/state/reducers/form';
import formUtils from 'src/utils/form';
import { navigate } from 'gatsby';

import { AcceptanceOfRole, AuthService, AccountService } from './index'

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('acceptance-of-role', () => {
  let wrapper;
  let props;
  jest.spyOn(formUtils, 'initFormState');
  jest.spyOn(formUtils, 'clearFormState');

  beforeEach(() => {
    AccountService.retrieveInvestedUser = jest.fn().mockReturnValue(Promise.resolve({ status: 200,
    property: {
      first_line_of_address: '666 test road',
      town: 'london town',
      city: 'london city',
      post_code: 'TW8 8NJ'
    },
    price_of_property: {
      amount_in_cents: 14000001
    },
    num_shares: 33,
    invitee_name: 'J Cole',
    is_director: true,
    is_existing_user: false
    }));

    AuthService.acceptRoleLogin = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));

    props = {
      form: ReduxFormMock,
      t: jest.fn(),
      location: {
        search: '?token=12345'
      },
      showLoader: jest.fn(),
      hideLoader: jest.fn()
    }
    wrapper = shallow(<AcceptanceOfRole {...props}/>)
  })

  test('onmount calls retrieveInvestedUser and sets correct state', () => {
    expect(props.showLoader).toHaveBeenCalled()
    expect(props.hideLoader).toHaveBeenCalled()
    expect(wrapper.state().companyAddress).toEqual({
        lineOfAddress: '666 test road',
        town: 'london town',
        city: 'london city',
        postCode: 'TW8 8NJ'
    })

    expect(wrapper.state().propertyPrice).toEqual(14000001)
    expect(wrapper.state().shares).toEqual(33)
    expect(wrapper.state().inviteeName).toEqual('J Cole')
    expect(wrapper.state().isDirector).toEqual(true)
    expect(wrapper.state().isExistingUser).toEqual(false)
  })

  test('call submitAnswers should navigate to forget password answers yes but not a user', () => {
    const customProps = {
      ...props,
      form: {
        ...ReduxFormMock,
        values: {
          shareholder: 'yes',
          director: 'yes'
        }
      }
    }
    wrapper = shallow(<AcceptanceOfRole {...customProps}/>)
    wrapper.setState({
      isExistingUser: false
    })
    wrapper.instance().submitAnswers()
    expect(navigate).toHaveBeenCalledWith('/forgot-password/reset', {
      state: {
        acceptRoleToken: '?token=12345'
      }
    })
  })

  test('call submitAnswers should navigate to decline page if user answers no to any question', () => {
    const customProps = {
      ...props,
      form: {
        ...ReduxFormMock,
        values: {
          shareholder: 'no',
          director: 'yes'
        }
      }
    }
    wrapper = shallow(<AcceptanceOfRole {...customProps}/>)
    wrapper.setState({
      isExistingUser: false
    })
    wrapper.instance().submitAnswers()

    expect(navigate).toHaveBeenCalledWith('/onboarding/acceptance-of-role/decline')
  })

  test('call submitAnswers should call login if user exists and answers yes then redirect to dashboard', async () => {
    const customProps = {
      ...props,
      form: {
        ...ReduxFormMock,
        values: {
          shareholder: 'yes',
          director: 'yes'
        }
      }
    }
    wrapper = shallow(<AcceptanceOfRole {...customProps}/>)
    wrapper.setState({
      isExistingUser: true
    })
    await wrapper.instance().submitAnswers()
    expect(props.showLoader).toHaveBeenCalled()
    expect(props.hideLoader).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/dashboard')
  })
})
