import React from 'react';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';

import { RawComponent as CreateAccount } from './create-account';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';

describe('<CreateAccount />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(CreateAccount, { t: jest.fn().mockReturnValue('string') });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-create-account');
    expect(component.length).toBe(1);
  });

  test('renders error message if errors present', () => {
    wrapper = setup(CreateAccount, { t: jest.fn().mockReturnValue('string') }, { showErrorMessage: true });
    expect(wrapper.contains(<ErrorBox>string</ErrorBox>)).toBe(true);
  });

  test('renders custom error message if set', () => {
    wrapper = setup(CreateAccount, 
      { t: jest.fn().mockReturnValue('string') }, 
      { showErrorMessage: true, errors: { form: 'Test error' } }
    );
    expect(wrapper.contains(<ErrorBox>Test error</ErrorBox>)).toBe(true);
  });

  test('createAccount called on click', () => {
    const spy = jest.spyOn(formUtils, 'validateForm').mockImplementation(() => {});
    const button = findByTestAttr(wrapper, 'create-account-button');
    button.simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
