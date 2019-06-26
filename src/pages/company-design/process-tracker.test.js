
import React from 'react'
import { shallow } from 'enzyme'
import { ProcessTracker } from './index'
import { setup } from 'src/test-utils/test-utils';

jest.mock('src/assets/images/property.svg', () => '');
jest.mock('src/assets/images/purchase.svg', () => '');
jest.mock('src/assets/images/solicitor.svg', () => '');
jest.mock('src/assets/images/shareholder.svg', () => '');
jest.mock('src/assets/images/services.svg', () => '');

describe('process-tracker', () => {
  let wrapper;
  let props;

  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();

  const mockSections = {
    step1: {
      title: 'Property Address',
      copy: 'Property your company will hold',
      imageAltText: 'Property'
    },
    step2: {
      title: 'Purchase details',
      copy: 'Property type and purchase info',
      imageAltText: 'Purchase'
    },
    step3: {
      title: 'Solicitor Details',
      copy: 'Add Solicitor',
      imageAltText: 'Solicitor Details'
    },
    step4: {
      title: 'Shareholder details',
      copy: 'Add additional shareholders',
      imageAltText: 'Shareholder details'
    },
    step5: {
      title: 'Add Services',
      copy: 'Additional services you will need',
      imageAltText: 'Services'
    },
    step6: {
      title: 'Tax Questions',
      copy: 'To better understand your needs',
      imageAltText: 'Tax Questions'
    },
    step7: {
      title: 'Payment',
      copy: 'Pay for service',
      imageAltText: 'Warning sign'
    }
  }

  beforeEach(() => {
    props = {
      t: jest.fn().mockReturnValue('test-string'),
      i18n: {
        t: jest.fn().mockReturnValue(mockSections),
      },
      company: {
        id: 1,
        additional_services_required: false
      },
      showLoader: showLoaderMock,
      hideLoader: hideLoaderMock,
    }
    wrapper = shallow(<ProcessTracker {...props}/>);
  })
  test('renders title', () => {
    expect(wrapper.find('h3').text()).toEqual('test-string');
  })

  test('renders ProcessSection', () => {
    expect(wrapper.find('ProcessSection')).toHaveLength(6);
  })

  test('there are 7 steps if add services has been used & the user did NOT want help finding a solicitor', () => {
    wrapper = setup(ProcessTracker, {
      ...props,
      company: {
        id: 1,
        additional_services_required: true,
        additional_services: {
          solicitor: false
        }
      }
    });

    expect(wrapper.find('ProcessSection')).toHaveLength(7);
  })

  test('there are 6 steps if add services has been used & the user DID want help finding a solicitor', () => {
    wrapper = setup(ProcessTracker, {
      ...props,
      additionalServices: {
        hasUsedAdditionalServices: true,
        solicitor: true
      }
    });

    expect(wrapper.find('ProcessSection')).toHaveLength(6);
  })

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });
})
