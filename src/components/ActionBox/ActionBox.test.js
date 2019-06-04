import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import store from 'src/state/store';

import { navigate } from 'gatsby';

import { RawComponent as ActionBox } from './ActionBox';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

export const actionsMock = [ 
  { type: 'add_company', companyID: '1' },
  { type: 'documents_ready', companyID: '1' },
  { type: 'directors_insurance', companyID: '1' },
  { type: 'prompt_shareholders', companyID: '1' }
];

describe('<ActionBox />', () => {
  let wrapper, spy;

  const setActiveCompanyMock = jest.spyOn(store, 'dispatch');

  const defaultProps = {
    t: jest.fn().mockImplementation(id => id),
    actions: actionsMock,
    setActiveCompany: setActiveCompanyMock
  };

  beforeEach(() => {
    spy = jest.spyOn(ActionBox.prototype, 'dismissAction');
    wrapper = setup(ActionBox, defaultProps);
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-action-box');
    expect(component.length).toBe(1);

    expect(wrapper.find('h1').at(0).text()).toBe('actionBox.title');
    
    const buttonDismiss = wrapper.find(ButtonHeader).at(0);
    expect(buttonDismiss.props().label).toEqual('actionBox.dismiss');
    buttonDismiss.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  test('dismissAction()', () => {
    wrapper.instance().dismissAction();
    wrapper.instance().dismissAction();

    expect(wrapper.state().currentAction).toBe(2);
  });

  describe('renderAction()', () => {
    const wrapper2 = setup(ActionBox, defaultProps);
    let buttonAction;

    beforeEach(() => {
      buttonAction = wrapper2.find(ButtonHeader).at(1);
    });

    test('add_company', () => {
      expect(buttonAction.props().label).toEqual('actionBox.actions.add_company.cta');
      buttonAction.simulate('click');
      expect(setActiveCompanyMock).toHaveBeenCalledTimes(0);
      expect(navigate).toHaveBeenCalledWith('/company-design');
    });

    test('documents_ready', () => {
      expect(buttonAction.props().label).toEqual('actionBox.actions.documents_ready.cta');
      buttonAction.simulate('click');
      expect(setActiveCompanyMock).toHaveBeenCalledWith(expect.objectContaining({ companyID: '1' }));
      expect(navigate).toHaveBeenCalledWith('/documents');
    });

    test('directors_insurance', () => {
      expect(buttonAction.props().label).toEqual('actionBox.actions.directors_insurance.cta');
      buttonAction.simulate('click');
      expect(setActiveCompanyMock).toHaveBeenCalledWith(expect.objectContaining({ companyID: '1' }));
      expect(navigate).toHaveBeenCalledWith('/onboarding/payment');
    });

    test('prompt_shareholders', () => {
      expect(buttonAction.props().label).toEqual('actionBox.actions.prompt_shareholders.cta');
      buttonAction.simulate('click');
      expect(setActiveCompanyMock).toHaveBeenCalledWith(expect.objectContaining({ companyID: '1' }));
      expect(navigate).toHaveBeenCalledWith('/documents/prompt');
    });

    afterEach(() => {
      wrapper2.instance().dismissAction();
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
