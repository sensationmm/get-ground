import React from 'react';
import { navigate } from 'gatsby';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';

import { RawComponent as SolicitorDetails, ModalService, CompanyService } from './solicitor-details';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('<SolicitorDetails />', () => {
  let wrapper;

  ModalService.fetchModalContent = jest.fn('val').mockReturnValue(Promise.resolve({ data: { markdown_text: '<h1>HI</h1>' } }));
  CompanyService.saveSolicitor = jest.fn('val').mockReturnValue(Promise.resolve({ status: 201 }));
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const showModalMock = jest.fn();
  const hideModalMock = jest.fn();
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    hideModal: hideModalMock,
    showModal: showModalMock
  };

  beforeEach(() => {
    wrapper = setup(SolicitorDetails, defaultProps, { values: { need_solicitor: 'no', have_solicitor: 'no' }});
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-solicitor-details');
    expect(component.length).toBe(1);
  });

  test('renders error message if errors present', () => {
    wrapper = setup(SolicitorDetails, defaultProps, { showErrorMessage: true });
    expect(wrapper.contains(<ErrorBox>string</ErrorBox>)).toBe(true);
  });

  test('renders custom error message if set', () => {
    wrapper = setup(SolicitorDetails, 
      { t: jest.fn().mockReturnValue('string') }, 
      { showErrorMessage: true, errors: { form: 'Test error' } }
    );
    expect(wrapper.contains(<ErrorBox>Test error</ErrorBox>)).toBe(true);
  });

  describe('getModalContent()', () => {
    test('gets content and shows modal', async () => {
      await wrapper.instance().getModalContent({ preventDefault: jest.fn() });
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapper.state().termsMarkdown).toEqual('<h1>HI</h1>');
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('saveDetails()', () => {
    let spy;
    test('called on click', () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(false);
      const button = findByTestAttr(wrapper, 'save-details-button');
      button.simulate('click');
      
      expect(spy).toHaveBeenCalled();
      expect(showLoaderMock).toHaveBeenCalledTimes(0);
    });

    test('saves details', () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      const button = findByTestAttr(wrapper, 'save-details-button');
      button.simulate('click');
      
      expect(spy).toHaveBeenCalled();
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
    });

    test('clears conflicting responses -> have & need', async () => {
      const wrapperNew = setup(SolicitorDetails, defaultProps, {
        values: {
          have_solicitor: 'yes',
          need_solicitor: 'yes',
          first_name: 'Spongebob',
          last_name: 'Squarepants'
        }
      });

      await wrapperNew.instance().saveDetails();

      expect(CompanyService.saveSolicitor).toHaveBeenCalledWith(
        expect.objectContaining({
          need_solicitor: null
        })
      );
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('/company-design/shareholder-details');
    });

    test('clears conflicting responses -> dont have but given', async () => {
      const wrapperNew = setup(SolicitorDetails, defaultProps, {
        values: {
          have_solicitor: 'no',
          need_solicitor: 'yes',
          first_name: 'Spongebob',
          last_name: 'Squarepants'
        }
      });

      await wrapperNew.instance().saveDetails();

      expect(CompanyService.saveSolicitor).toHaveBeenCalledWith(
        expect.objectContaining({
          first_name: '',
          last_name: ''
        })
      );
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('/company-design/shareholder-details');
    });

    afterEach(() => {
      spy.mockClear();
    });
  });

  test('shows done when adequate info', () => {
    const wrapperNew = setup(SolicitorDetails, defaultProps, {
      values: {
        have_solicitor: 'no',
        need_solicitor: 'no'
      }
    });

    const button = findByTestAttr(wrapperNew, 'save-details-button');
    expect(button.length).toBe(1);
  });

  test('shows done when adequate info', () => {
    const wrapperNew = setup(SolicitorDetails, defaultProps, {
      values: {
        have_solicitor: 'no',
        need_solicitor: 'yes'
      }
    });

    const button = findByTestAttr(wrapperNew, 'save-details-button');
    expect(button.length).toBe(1);
  });

  test('shows done when adequate info', () => {
    const wrapperNew = setup(SolicitorDetails, defaultProps, {
      values: {
        have_solicitor: 'yes',
        need_solicitor: null,
        first_name: 'qwe',
        last_name: 'qwe',
        email: 'qwe',
        phone: '123',
        authority: true
      }
    });

    const button = findByTestAttr(wrapperNew, 'save-details-button');
    expect(button.length).toBe(1);
  });

  test('skip step', () => {
    const button = findByTestAttr(wrapper, 'button-skip-step');
    button.simulate('click');
    
    expect(navigate).toHaveBeenCalledWith('/company-design/shareholder-details');
  });

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });
});
