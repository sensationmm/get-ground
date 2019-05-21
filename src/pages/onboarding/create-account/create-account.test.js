import { navigate } from 'gatsby';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';

import { RawComponent as CreateAccount, AccountService, ModalService } from './index';
import { initialState as ReduxFormMock } from 'src/state/reducers/form';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<CreateAccount />', () => {
  let wrapper;

  AccountService.createAccount = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
  ModalService.fetchModalContent = jest.fn('val').mockReturnValue(Promise.resolve({ data: { markdown_text: '<h1>HI</h1>' } }));
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    form: ReduxFormMock
  };
  jest.spyOn(formUtils, 'initFormState');

  beforeEach(() => {
    wrapper = setup(CreateAccount, defaultProps);
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-create-account');
    expect(component.length).toBe(1);
    expect(formUtils.initFormState).toHaveBeenCalledTimes(1);
  });

  test('form cleared on unmount', () => {
    jest.spyOn(formUtils, 'clearFormState');
    wrapper.unmount();
    expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
  });

  test('renders error message if errors present', () => {
    wrapper = setup(CreateAccount, {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        showErrorMessage: true
      }
    });
    const component = findByTestAttr(wrapper, 'create-error-box');
    expect(component.length).toBe(1);
  });

  test('renders custom error message if set', () => {
    wrapper = setup(CreateAccount, {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        showErrorMessage: true,
        errors: {
          form: 'Test error'
        }
      }
    });
    const component = findByTestAttr(wrapper, 'create-error-box');
    expect(component.length).toBe(1);
    expect(component.props().children).toBe('Test error');
  });

  describe('getModalContent()', () => {
    test('gets content and shows modal', async () => {
      await wrapper.instance().getModalContent({ preventDefault: jest.fn() });
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapper.state().termsMarkdown).toEqual('<h1>HI</h1>');
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
    });
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
      expect(navigate).toHaveBeenCalledWith('/onboarding/account-pending');
    });

    test('duplicate email failure', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      AccountService.createAccount = jest.fn().mockReturnValue(Promise.resolve({ status: 500 }));
      const wrapperNew = setup(CreateAccount, defaultProps);
      
      await wrapperNew.instance().createAccount();

      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      // expect(store.form.errors.form).toEqual('string');
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
