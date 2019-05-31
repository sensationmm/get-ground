import React from 'react'
import { shallow } from 'enzyme'

import { RawComponent as Partnerships, PartnerService } from './partnerships'
import { initialState as ReduxFormMock } from 'src/state/reducers/form';

import formUtils from 'src/utils/form';

describe('Partnerships' ,() => {
  let wrapper;
  let props;

  beforeEach(() => {
    PartnerService.sendEmail = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
    jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);

    props = {
      t: jest.fn(),
      showLoader: jest.fn(),
      hideLoader: jest.fn(),
      form: ReduxFormMock,
      location: {
        search: ''
      }
    }
    wrapper = shallow(<Partnerships {...props} />);
  })

  test('yeah', () => {
    expect(wrapper.length).toEqual(1)
  })

  test('makes call to set password', async () => {
    wrapper.setProps({
      form: {
        ...props.form,
        values: {
          email: 'test.email@gmail.com'
        }
      }
    })
    const form = wrapper.find('[data-test="partnership-form"]')
    const button = wrapper.find('[data-test="enter-email-button"]')
    await button.props().onClick()
    expect(form.length).toEqual(2);
    expect(props.showLoader).toHaveBeenCalled();
    expect(props.hideLoader).toHaveBeenCalled();
  })

  test('error state', async () => {
    wrapper.setProps({
      form: {
        ...props.form,
        showErrorMessage: true,
        errors: {
          form: 'Test error'
        }
      }
    })

    PartnerService.sendEmail = jest.fn().mockReturnValue(Promise.resolve({ status: 501 }));
    const button = wrapper.find('[data-test="enter-email-button"]')
    const error = wrapper.find('[data-test="create-error-box"]')
    await button.props().onClick()

    expect(error.length).toEqual(1)
    expect(error.props().children).toBe('Test error');
  })
})
