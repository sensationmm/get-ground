import { RawComponent as Manage } from './index';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { navigate } from 'gatsby';

import functions from 'src/utils/functions';

import { companyMock } from '../CompanyOverview.test';
import OptionSelect from 'src/components/OptionSelect/OptionSelect';
import Button from 'src/components/_buttons/Button/Button';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('Manage', () => {
  let wrapper;
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id ),
    activeCompany: 1,
    companies: [ companyMock ]
  };

  jest.spyOn(functions, 'getByValue').mockReturnValue(companyMock);

  global.LC_API = {
    open_chat_window: jest.fn(),
    set_custom_variables: jest.fn()
  }

  beforeEach(() => {
    wrapper = setup(Manage, defaultProps, { hasLoaded: true });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-manage-company');
    expect(component.length).toBe(1);
  });

  test('setTopic', () => {
    wrapper.instance().setTopic('boo');
    expect(wrapper.state().liveChatTopic).toBe('boo');
  });

  test('company link', () => {
    const button = wrapper.find('.company-header');
    button.simulate('click');

    expect(navigate).toHaveBeenCalledWith('/dashboard/company');
  });

  test('live chat button', () => {
    wrapper.instance().setTopic('boo');
    const button = findByTestAttr(wrapper, 'live-chat-button');
    button.simulate('click');

    expect(global.LC_API.open_chat_window).toHaveBeenCalled();
    expect(global.LC_API.set_custom_variables).toHaveBeenCalledWith(
      [
        { name: 'manage my company topic', value: 'boo' },
        { name: 'company ID', value: 1 },
      ]
    );
  });

  test('translations', () => {
    expect(wrapper.find('h1').text()).toBe('dashboard.company.manage.title');
    expect(wrapper.find('p').at(0).text()).toBe('dashboard.company.manage.text');
    expect(wrapper.find('p').at(1).text()).toBe('dashboard.company.manage.select');
    expect(wrapper.find(OptionSelect).props().options[0].title).toBe('dashboard.company.manage.options.withdrawMoney');
    expect(wrapper.find(OptionSelect).props().options[1].title).toBe('dashboard.company.manage.options.sendMoney');
    expect(wrapper.find(OptionSelect).props().options[2].title).toBe('dashboard.company.manage.options.manageDirector');
    expect(wrapper.find(OptionSelect).props().options[3].title).toBe('dashboard.company.manage.options.manageShares');
    expect(wrapper.find(OptionSelect).props().options[4].title).toBe('dashboard.company.manage.options.delist');
    expect(wrapper.find(OptionSelect).props().options[5].title).toBe('dashboard.company.manage.options.reportIssue');
    expect(wrapper.find(Button).props().label).toBe('dashboard.company.manage.chatButton');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
