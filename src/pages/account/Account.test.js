import { navigate } from 'gatsby';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';

import Button from 'src/components/_buttons/Button/Button';

import { RawComponent as Account, AccountService } from './index';
import { initialState as ReduxFormMock } from 'src/state/reducers/form';
import { initialState as UserMock } from 'src/state/reducers/user';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<Account />', () => {
  let wrapper;

  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const userUpdateMock = jest.fn();
  const tMock = jest.fn().mockImplementation(id => id);
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    userUpdate: userUpdateMock,
    form: ReduxFormMock,
    user: UserMock,
    documents: [
      { 'description': 'passport', filename: ''},
      { 'description': 'address', filename: ''},
      { 'description': 'signature', filename: ''}
    ]
  };
  jest.spyOn(formUtils, 'initFormState');

  global.LC_API = {
    open_chat_window: jest.fn(),
    set_custom_variables: jest.fn()
  }

  beforeEach(() => {
    wrapper = setup(Account, defaultProps);
    jest.spyOn(formUtils, 'clearFormState');
    jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
    jest.spyOn(formUtils, 'setFormError');
    jest.spyOn(wrapper.instance(), 'toggleEdit');
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-profile');
    expect(component.length).toBe(1);
  });

  test('form cleared on unmount', () => {
    jest.spyOn(formUtils, 'clearFormState');
    wrapper.unmount();
    expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
  });

  test('open live chat for passport', () => {
    wrapper = setup(Account, defaultProps);
    const component = findByTestAttr(wrapper, 'live-chat-passport');
    component.props().onClick()
    expect(global.LC_API.open_chat_window).toHaveBeenCalled()
    expect(global.LC_API.set_custom_variables).toHaveBeenCalledWith(
      [
        { name: 'Manage my account', value: 'Passport' },
      ]
    )
  })

  test('open live chat for address', () => {
    wrapper = setup(Account, defaultProps);
    const component = findByTestAttr(wrapper, 'live-chat-address');
    component.props().onClick()
    expect(global.LC_API.open_chat_window).toHaveBeenCalled()
    expect(global.LC_API.set_custom_variables).toHaveBeenCalledWith(
      [
        { name: 'Manage my account', value: 'Address' },
      ]
    )
  })

  describe('enterSubmit', () => {
    test('enter key', () => {
      jest.spyOn(wrapper.instance(), 'updateProfile').mockImplementation();
      wrapper.instance().enterSubmit({ key: 'Enter', target: { id: 'name' }});
      expect(wrapper.instance().updateProfile).toHaveBeenCalledWith('name');
    });

    test('other key', () => {
      jest.spyOn(wrapper.instance(), 'updateProfile').mockImplementation();
      wrapper.instance().enterSubmit({ key: 'Space', target: { id: 'name' }});
      expect(wrapper.instance().updateProfile).toHaveBeenCalledTimes(0);
    });
  });

  describe('updateProfile()', () => {
    test('updates profile', async () => {
      AccountService.updatePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));

      await wrapper.instance().updateProfile('name');

      expect(formUtils.validateForm).toHaveBeenCalledTimes(1);
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(userUpdateMock).toHaveBeenCalledWith('name', undefined);
      expect(wrapper.instance().toggleEdit).toHaveBeenCalledWith('name');
    });

    test('catches failure', async () => {
      AccountService.updatePersonalDetails = jest.fn().mockReturnValue(Promise.resolve({ status: 400 }));

      await wrapper.instance().updateProfile('name');

      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().toggleEdit).toHaveBeenCalledTimes(0);
      expect(formUtils.setFormError).toHaveBeenCalledWith('form.correctErrors');
    });

    test('form validation failure', async () => {
      jest.spyOn(formUtils, 'validateForm').mockReturnValue(false);
      await wrapper.instance().updateProfile('name');
      expect(formUtils.setFormError).toHaveBeenCalledWith('form.correctErrors');
    });
  });

  describe('edit buttons', () => {
    beforeEach(() => {
      jest.spyOn(wrapper.instance(), 'toggleEdit');
    });

    test('occupation', () => {
      const occupationSection = findByTestAttr(wrapper, 'section-occupation');
      occupationSection.find(Button).simulate('click');
      expect(wrapper.instance().toggleEdit).toHaveBeenCalledWith('occupation');
    });

    test('phone number', () => {
      const occupationSection = findByTestAttr(wrapper, 'section-phone');
      occupationSection.find(Button).simulate('click');
      expect(wrapper.instance().toggleEdit).toHaveBeenCalledWith('phone_number');
    });

    test('email', () => {
      const occupationSection = findByTestAttr(wrapper, 'section-email');
      occupationSection.find(Button).simulate('click');
      expect(wrapper.instance().toggleEdit).toHaveBeenCalledWith('email');
    });

    test('signature', () => {
      const occupationSection = findByTestAttr(wrapper, 'section-signature');
      occupationSection.find(Button).simulate('click');
      expect(navigate).toHaveBeenCalledWith('/account/signature-edit');
    });
  });

  describe('save buttons', () => {
    beforeEach(() => {
      wrapper = setup(Account, defaultProps, { edit_occupation: true, edit_phone_number: true, edit_email: true } );
      jest.spyOn(wrapper.instance(), 'updateProfile');
    });

    test('occupation', () => {
      const occupationSection = findByTestAttr(wrapper, 'section-occupation');
      occupationSection.find(Button).simulate('click');
      expect(wrapper.instance().updateProfile).toHaveBeenCalledWith('occupation');
      expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
    });

    test('phone number', () => {
      const occupationSection = findByTestAttr(wrapper, 'section-phone');
      occupationSection.find(Button).simulate('click');
      expect(wrapper.instance().updateProfile).toHaveBeenCalledWith('phone_number');
      expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
    });

    test('email', () => {
      const occupationSection = findByTestAttr(wrapper, 'section-email');
      occupationSection.find(Button).simulate('click');
      expect(wrapper.instance().updateProfile).toHaveBeenCalledWith('email');
      expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
    });

    test('toggleEdit() clears form on false', () => {
      wrapper.instance().toggleEdit('name');
      wrapper.instance().toggleEdit('name');
      expect(formUtils.clearFormState).toHaveBeenCalledTimes(2);
    });
  });

  test('content variations', () => {
    wrapper = setup(Account, {
      ...defaultProps,
      user: {
        ...defaultProps.user,
        previous_names: 'anon',
        street: 'some street'
      }
    });

    expect(wrapper.find('.company-overview-section').at(0).find('div').at(2).find('p').text()).toBe('anon');
    expect(wrapper.find('.company-overview-section').at(4).find('p').text()).toBe('some street');
  });

  test('translations', () => {
    expect(wrapper.find('h2').at(0).text()).toBe('profile.sections.name');
    expect(wrapper.find('h2').at(1).text()).toBe('profile.sections.previousNames');
    expect(wrapper.find('h2').at(2).text()).toBe('profile.sections.dob');
    expect(wrapper.find('h2').at(3).text()).toBe('profile.sections.birthCity');
    expect(wrapper.find('h2').at(4).text()).toBe('profile.sections.occupation');
    expect(wrapper.find('h2').at(5).text()).toBe('profile.sections.phone');
    expect(wrapper.find('h2').at(6).text()).toBe('profile.sections.email');
    expect(wrapper.find('h2').at(7).text()).toBe('profile.sections.homeAddress');
    expect(wrapper.find('h2').at(8).text()).toBe('profile.sections.passport');
    expect(wrapper.find('h2').at(9).text()).toBe('profile.sections.proofAddress');
    expect(wrapper.find('h2').at(10).text()).toBe('profile.sections.signature');
  });

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });
});
