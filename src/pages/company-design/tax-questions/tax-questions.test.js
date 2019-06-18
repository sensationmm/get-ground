import React from 'react'
import { shallow } from 'enzyme'

import { TaxQuestions } from './index'
import { initialState as ReduxFormMock } from 'src/state/reducers/form';
import formUtils from 'src/utils/form';


describe('Tax Questions page', () => {
  let wrapper;
  let props;
  jest.spyOn(formUtils, 'initFormState');
  jest.spyOn(formUtils, 'clearFormState');

  beforeEach(() => {
    props = {
      t: jest.fn(),
      form: ReduxFormMock,
    }
    wrapper = shallow(<TaxQuestions {...props} />)
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders', () => {
    expect(wrapper.length).toEqual(1)
  })

  test('renders questions', () => {
    expect(props.t).toHaveBeenCalledWith('taxQuestions.ownership');
    expect(props.t).toHaveBeenCalledWith('taxQuestions.employ');
    expect(props.t).toHaveBeenCalledWith('taxQuestions.assets');
    expect(props.t).toHaveBeenCalledWith('taxQuestions.turnover');
  })

  test('renders form', () => {
    expect(wrapper.find('.tax-questions-form').length).toEqual(1)
    expect(formUtils.initFormState).toHaveBeenCalledTimes(1);
  });

  test('renders error', () => {
    const customProps = {
      ...props,
      form: {
        ...ReduxFormMock,
        showErrorMessage: true
      }
    }
    wrapper = shallow(<TaxQuestions {...customProps} />)

    expect(wrapper.find('[data-test="error-box"]').length).toEqual(1)
  });

  test('form cleared on unmount', () => {
    wrapper.unmount();
    expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
  });
})
