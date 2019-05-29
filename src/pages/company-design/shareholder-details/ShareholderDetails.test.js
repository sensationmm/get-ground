import { navigate } from 'gatsby';
import { RawComponent as ShareholderDetails, shareholder, CompanyService } from './index';
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';
import AddShareholder from './fragments/AddShareholder';
import ShareholderShares from './fragments/ShareholderShares';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';

import IntroBox from 'src/components/_layout/IntroBox/IntroBox';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<ShareholderDetails />', () => {
  let wrapper;

  CompanyService.saveShareholders = jest.fn().mockReturnValue(Promise.resolve({ status: 404 }));
  formUtils.setFormError = jest.fn();
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id),
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    form: {
      values: [{
        ...shareholder
      },{
        ...shareholder
      }],
      errors: [],
      showErrorMessage: false
    }
  };

  describe('functions', () => {
    beforeEach(() => {
      wrapper = setup(ShareholderDetails, defaultProps);
    });

    test('saveShareholders()', async () => {
      await wrapper.instance().saveShareholders();
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('/company-design/company-complete');

      showLoaderMock.mockClear();
      hideLoaderMock.mockClear();
      navigate.mockClear();

      CompanyService.saveShareholders = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
      await wrapper.instance().saveShareholders();
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledTimes(0);
    });

    test('renderShareholderShares()', () => {
      const renderShareholderShares = wrapper.instance().renderShareholderShares(2);
      expect(renderShareholderShares.length).toBe(2);
      expect(renderShareholderShares[0].type).toBe(ShareholderShares);
      expect(renderShareholderShares[1].type).toBe(ShareholderShares);
    });

    test('renderShareholders()', () => {
      const renderShareholders = wrapper.instance().renderShareholders(2);
      expect(renderShareholders.length).toBe(2);
      expect(renderShareholders[0].type).toBe(AddShareholder);
      expect(renderShareholders[1].type).toBe(AddShareholder);
    });

    test('addDetailsBack()', () => {
      wrapper.instance().addDetailsBack();
      expect(wrapper.state().stage).toBe('add');

      wrapper.instance().validateShareholderShares = jest.fn().mockReturnValue(false);
      wrapper.instance().addDetailsBack();
      expect(formUtils.setFormError).toHaveBeenCalledWith('companyDesign.shareholderDetails.shares.error');
      wrapper.instance().validateShareholderShares.mockRestore();
    });

    test('addShareholder()', () => {
      wrapper.instance().validateShareholders = jest.fn().mockReturnValue(false);
      wrapper.instance().addShareholder();
      expect(wrapper.state().shareholders).toBe(1);

      wrapper.instance().validateShareholders = jest.fn().mockReturnValue(true);
      wrapper.instance().addShareholder();
      expect(wrapper.state().shareholders).toBe(2);
    });

    test('confirmShares()', () => {
      wrapper.instance().confirmShares();
      expect(wrapper.state().stage).toBe('confirm');

      wrapper.instance().validateShareholderShares = jest.fn().mockReturnValue(false);
      wrapper.instance().confirmShares();
      expect(formUtils.setFormError).toHaveBeenCalledWith('companyDesign.shareholderDetails.shares.error');
      wrapper.instance().validateShareholderShares.mockRestore();
    });

    test('addDetails()', () => {
      wrapper.instance().validateShareholders = jest.fn().mockReturnValue(false);
      wrapper.instance().addDetails();
      expect(wrapper.state().stage).toBe('add');

      wrapper.instance().validateShareholders = jest.fn().mockReturnValue(true);
      wrapper.instance().addDetails();
      expect(wrapper.state().stage).toBe('details');
    });

    test('updateShareholder()', () => {
      wrapper.instance().validateShareholderShares = jest.fn();
      wrapper.instance().updateShareholder(1, 'shares', '15');
      expect(wrapper.instance().validateShareholderShares).toHaveBeenCalled();
      expect(wrapper.state().totalShares).toBe(15);

      const updateValueSpy = jest.spyOn(formUtils, 'updateValue');
      wrapper.instance().updateShareholder(1, 'first_name', 'Spongebob');

      expect(updateValueSpy).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ first_name: 'Spongebob'}),
        expect.any(Function),
        true
      );
    });

    test('validateShareholderShares()', () => {
      
    })

    test('componentWillUnmount()', () => {
      formUtils.clearFormState = jest.fn();
      wrapper.unmount();

      expect(formUtils.clearFormState).toHaveBeenCalled();
    });
  });

  describe('default / shareholder choice step', () => {
    beforeEach(() => {
      wrapper = setup(ShareholderDetails, defaultProps);
    });
  
    test('renders without error', () => {
      const component = findByTestAttr(wrapper, 'container-shareholder-details');
      expect(component.length).toBe(1);
    });
    
    test('addShareholder()', () => {
      expect(wrapper.state().shareholders).toBe(1);
  
      wrapper.instance().addShareholder();
  
      expect(wrapper.state().shareholders).toBe(2);
    });

    test('setShareholders()', () => {
      wrapper.instance().toggleShareholders();
      expect(wrapper.state().hasShareholders).toBe(true);
    });

    test('setNoShareholders()', () => {
      wrapper.instance().setNoShareholders();
      expect(navigate).toHaveBeenCalledWith('/company-design');
    });
  });

  describe('add shareholders step', () => {
    beforeEach(() => {
      wrapper = setup(ShareholderDetails, defaultProps, { hasShareholders: true, stage: 'add' });
    });
    
    test('translations', () => {
      expect(wrapper.find('h1').text()).toEqual('companyDesign.shareholderDetails.add.title');
      expect(wrapper.find(IntroBox).dive().text()).toEqual('companyDesign.shareholderDetails.add.text');
    });
  });

  describe('add details step', () => {
    beforeEach(() => {
      wrapper = setup(ShareholderDetails, defaultProps, { hasShareholders: true, stage: 'details' });
    });
    
    test('translations', () => {
      expect(wrapper.find('h1').text()).toEqual('companyDesign.shareholderDetails.shares.title');
      expect(wrapper.find(IntroBox).dive().text()).toEqual('companyDesign.shareholderDetails.shares.text');
    });
  });

  describe('set shares step', () => {
    beforeEach(() => {
      wrapper = setup(ShareholderDetails, defaultProps, { hasShareholders: true, stage: 'confirm' });
    });

    test('translations', () => {
      expect(wrapper.find('h1').text()).toEqual('companyDesign.shareholderDetails.confirm.title');
      expect(wrapper.find(IntroBox).dive().text()).toEqual('companyDesign.shareholderDetails.confirm.text');
    });
  });

  describe('error state', () => {
    test('details', () => {
      wrapper = setup(ShareholderDetails, 
        { ...defaultProps, form: { ...defaultProps.form, showErrorMessage: true } },
        { hasShareholders: true, stage: 'details' }
      );
      expect(wrapper.find(ErrorBox).dive().text()).toBe('form.correctErrors');
    });

    test('details bespoke', () => {
      wrapper = setup(ShareholderDetails, 
        { ...defaultProps, form: { ...defaultProps.form, showErrorMessage: true, errors: { form: 'test' } } },
        { hasShareholders: true, stage: 'details' }
      );
      expect(wrapper.find(ErrorBox).dive().text()).toBe('test');
    });

    test('add', () => {
      wrapper = setup(ShareholderDetails, 
        { ...defaultProps, form: { ...defaultProps.form, showErrorMessage: true } },
        { hasShareholders: true, stage: 'add' }
      );
      expect(wrapper.find(ErrorBox).dive().text()).toBe('form.correctErrors');
    });

    test('add bespoke', () => {
      wrapper = setup(ShareholderDetails, 
        { ...defaultProps, form: { ...defaultProps.form, showErrorMessage: true, errors: { form: 'test' } } },
        { hasShareholders: true, stage: 'add' }
      );
      expect(wrapper.find(ErrorBox).dive().text()).toBe('test');
    });

    test('total shares', () => {
      wrapper = setup(ShareholderDetails, 
        { ...defaultProps, form: { ...defaultProps.form, showErrorMessage: true } },
        { hasShareholders: true, stage: 'add', totalShares: 101 }
      );
      expect(wrapper.find(ErrorBox).dive().text()).toBe('form.correctErrors');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
