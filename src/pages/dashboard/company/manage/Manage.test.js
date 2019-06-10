import { RawComponent as Manage } from './index';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import { navigate } from 'gatsby';

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
    activeCompany: '1',
    companies: [ companyMock ]
  };

  global.LC_API = {
    open_chat_window: jest.fn(),
    set_custom_variables: jest.fn()
  }

  beforeEach(() => {
    wrapper = setup(Manage, defaultProps);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-manage-company');
    expect(component.length).toBe(1);
  });

  test('renders without error when activeCompany not set', () => {
    wrapper = setup(Manage, { ...defaultProps, activeCompany: null });
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
      ]
    );
  });

  test('translations', () => {
    expect(wrapper.find('h1').text()).toBe('dashboard.company.manage.title');
    expect(wrapper.find('p').at(0).text()).toBe('dashboard.company.manage.text');
    expect(wrapper.find('p').at(1).text()).toBe('dashboard.company.manage.select');
    expect(wrapper.find(OptionSelect).props().options[0].title).toBe('dashboard.company.manage.options.buyShares');
    expect(wrapper.find(OptionSelect).props().options[1].title).toBe('dashboard.company.manage.options.lendMoney');
    expect(wrapper.find(OptionSelect).props().options[2].title).toBe('dashboard.company.manage.options.withdrawDividend');
    expect(wrapper.find(OptionSelect).props().options[3].title).toBe('dashboard.company.manage.options.loanRepayment');
    expect(wrapper.find(OptionSelect).props().options[4].title).toBe('dashboard.company.manage.options.allotShares');
    expect(wrapper.find(OptionSelect).props().options[5].title).toBe('dashboard.company.manage.options.appointDirector');
    expect(wrapper.find(OptionSelect).props().options[6].title).toBe('dashboard.company.manage.options.removeDirector');
    expect(wrapper.find(OptionSelect).props().options[7].title).toBe('dashboard.company.manage.options.delist');
    expect(wrapper.find(OptionSelect).props().options[8].title).toBe('dashboard.company.manage.options.dissolveCompany');
    expect(wrapper.find(Button).props().label).toBe('liveChat.button');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
