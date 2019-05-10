import React from 'react';
import { navigate } from 'gatsby';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';

import { RawComponent as CreateAccount, AccountService } from './create-account';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<CreateAccount />', () => {
  let wrapper;

  AccountService.createAccount = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock
  };

  beforeEach(() => {
    wrapper = setup(CreateAccount, defaultProps);
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-create-account');
    expect(component.length).toBe(1);
  });

  test('renders error message if errors present', () => {
    wrapper = setup(CreateAccount, defaultProps, { showErrorMessage: true });
    expect(wrapper.contains(<ErrorBox>string</ErrorBox>)).toBe(true);
  });

  test('renders custom error message if set', () => {
    wrapper = setup(CreateAccount, 
      { t: jest.fn().mockReturnValue('string') }, 
      { showErrorMessage: true, errors: { form: 'Test error' } }
    );
    expect(wrapper.contains(<ErrorBox>Test error</ErrorBox>)).toBe(true);
  });

  describe('createAccount()', () => {
    let spy;
    test('called on click', () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockImplementation(() => {});
      const button = findByTestAttr(wrapper, 'create-account-button');
      button.simulate('click');
      
      expect(spy).toHaveBeenCalled();
    });
    
    test('creates account', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      AccountService.createAccount = jest.fn().mockReturnValue(Promise.resolve({ status: 201 }));
      const wrapperNew = setup(CreateAccount, defaultProps);
      
      await wrapperNew.instance().createAccount();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('/account-pending');
    });

    test('duplicate email failure', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      AccountService.createAccount = jest.fn().mockReturnValue(Promise.resolve({ status: 500 }));
      const wrapperNew = setup(CreateAccount, defaultProps);
      
      await wrapperNew.instance().createAccount();

      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapperNew.state().errors.form).toEqual('string');
    });

    test('other failure', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      AccountService.createAccount = jest.fn().mockReturnValue(Promise.resolve({ status: 501 }));
      const wrapperNew = setup(CreateAccount, defaultProps);
      
      await wrapperNew.instance().createAccount();

      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
      spy.mockClear();
    });
  });

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });
});
