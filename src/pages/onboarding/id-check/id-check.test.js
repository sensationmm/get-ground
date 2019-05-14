import React from 'react'
import { shallow } from 'enzyme'
import { IdCheck } from './index'
import AddProof from 'src/components/AddProof/AddProof'

import kycService from 'src/services/KYC'

jest.mock('src/services/KYC', () => {
  return jest.fn().mockImplementation(() => {
    return {
      makeCheck: jest.fn()
    };
  });
});

describe('id-check', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      t: jest.fn(),
      i18n: {
        t: jest.fn().mockReturnValue('mock-string'),
      }
    }

    wrapper = shallow(<IdCheck {...props} />);
  })
  test('renders id-check', () => {
    expect(wrapper.length).toEqual(1);
  })

  test('renders header', () => {
    expect(wrapper.find('.id-check-title').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.title')
  })

  test('renders AddPassport', () => {
    expect(wrapper.find(AddProof).length).toEqual(3)
  })

  test('onUnmount calls KYC service', () => {
    wrapper.unmount()
    expect(kycService).toHaveBeenCalled();
  })
})
