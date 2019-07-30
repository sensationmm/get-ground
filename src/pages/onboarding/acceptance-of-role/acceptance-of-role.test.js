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
      data: {
        property_purchase: {
          property_address: {
            address: {
              premise: '666',
              street: 'test road',
              posttown: 'test town',
              city: 'test city',
              postcode: 'TW8 8NJ'
            }
          },
          purchase_details: {
            price: {
              amount_in_cents: 10000
            }
          },
          shareholder_details: {
            collection: [
              {
                first_name: 'lead',
                last_name: 'shareholder'
              }
            ],
          },
        },
        shareholder_detail: {
          is_director: true,
          is_existing_user: false,
          allocated_shares: 11
        },
      }
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
        town: 'test town',
        city: 'test city',
        postCode: 'TW8 8NJ'
    })

    expect(wrapper.state().propertyPrice).toEqual(10000)
    expect(wrapper.state().shares).toEqual(11)
    expect(wrapper.state().inviteeName).toEqual('lead shareholder')
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
        acceptRoleToken: '12345'
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
      isExistingUser: false,
      inviteeName: 'Tom Sawyer',
    })
    wrapper.instance().submitAnswers()

    expect(navigate).toHaveBeenCalledWith('/onboarding/acceptance-of-role/decline', {
      state: {
        inviteeName: 'Tom Sawyer'
      }
    })
  })

  describe('existing user', () => {
    beforeEach(() => {
      AccountService.retrieveInvestedUser = jest.fn().mockReturnValue(Promise.resolve({ status: 200,
        data: {
          property_purchase: {
            property_address: {
              address: {
                premise: '666',
                street: 'test road',
                posttown: 'test town',
                city: 'test city',
                postcode: 'TW8 8NJ'
              }
            },
            purchase_details: {
              price: {
                amount_in_cents: 10000
              }
            },
            shareholder_details: {
              collection: [
                {
                  first_name: 'lead',
                  last_name: 'shareholder'
                }
              ],
            },
          },
          shareholder_detail: {
            is_director: true,
            is_existing_user: true,
            allocated_shares: 11
          },
        }
      }));

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
        await wrapper.instance().submitAnswers()
        expect(props.showLoader).toHaveBeenCalled()
        expect(props.hideLoader).toHaveBeenCalled()
        expect(navigate).toHaveBeenCalledWith('/dashboard')
      })
    })
  })
})
