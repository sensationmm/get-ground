import React from 'react';
import { navigate } from 'gatsby';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';

import { RawComponent as SolicitorDetails, ModalService, CompanyService } from './index';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import { initialState as ReduxFormMock } from 'src/state/reducers/form';

jest.mock('gatsby', () => ({
  navigate: jest.fn(),
  Link: 'link'
}));

  ModalService.fetchModalContent = jest.fn().mockReturnValue(Promise.resolve({ data: { markdown_text: '<h1>HI</h1>' } }));
  CompanyService.saveSolicitor = jest.fn().mockReturnValue(Promise.resolve({ status: 201 }));
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const showModalMock = jest.fn();
  const hideModalMock = jest.fn();
  const tMock = jest.fn().mockImplementation(id => id);
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    hideModal: hideModalMock,
    showModal: showModalMock,
    form: {
      ...ReduxFormMock,
      values: {
        have_solicitor: 'no'
      }
    },
    companies: [],
    activeCompany: 0
  };
  jest.spyOn(formUtils, 'initFormState');
  jest.spyOn(formUtils, 'clearFormState');

describe('<SolicitorDetails />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(SolicitorDetails, {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        values: {
          have_solicitor: 'no'
        }}
    });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-solicitor-details');
    expect(component.length).toBe(1);
    expect(formUtils.initFormState).toHaveBeenCalledTimes(1);
  });

  test('renders error message if errors present', () => {
    const wrapperNew = setup(SolicitorDetails, {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        showErrorMessage: true
      }
    });
    expect(wrapperNew.contains(<ErrorBox>form.correctErrors</ErrorBox>)).toBe(true);
  });

  test('renders error message if custom error present', () => {
    const wrapperNew = setup(SolicitorDetails, {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        showErrorMessage: true,
        errors: {
          form: 'string'
        }
      }
    });
    expect(wrapperNew.contains(<ErrorBox>string</ErrorBox>)).toBe(true);
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
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      const wrapperNew = setup(SolicitorDetails, {
        ...defaultProps,
        form: {
          ...defaultProps.form,
          values: {
            have_solicitor: 'no',
            first_name: 'Spongebob',
            last_name: 'Squarepants'
          }
        }
      });

      await wrapperNew.instance().saveDetails();

      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(CompanyService.saveSolicitor).toHaveBeenCalledWith(
        expect.objectContaining({
          have_solicitor: 'no'
        })
      );
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('/company-design/shareholder-details');
    });

    test('clears conflicting responses -> dont have but given', async () => {
      spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);
      const wrapperNew = setup(SolicitorDetails, {
        ...defaultProps,
        form: {
          ...defaultProps.form,
          values: {
            have_solicitor: 'no',
            first_name: 'Spongebob',
            last_name: 'Squarepants'
          }
        }
      });

      await wrapperNew.instance().saveDetails();

      // expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(CompanyService.saveSolicitor).toHaveBeenCalledWith(
        expect.objectContaining({
          first_name: '',
          last_name: ''
        })
      );
      expect(navigate).toHaveBeenCalledWith('/company-design/shareholder-details');
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
      spy.mockReset();
    });
  });

  describe('shows done when adequate info', () => {
    test('no solicitor yet', () => {
      const wrapperNew = setup(SolicitorDetails, defaultProps, {
        values: {
          have_solicitor: 'no'
        }
      });

      const button = findByTestAttr(wrapperNew, 'save-details-button');
      expect(button.length).toBe(1);
    });

    test('solicitor needed', () => {
      const wrapperNew = setup(SolicitorDetails, defaultProps, {
        values: {
          have_solicitor: 'no'
        }
      });

      const button = findByTestAttr(wrapperNew, 'save-details-button');
      expect(button.length).toBe(1);
    });

    test('solicitor given', () => {
      const wrapperNew = setup(SolicitorDetails, defaultProps, {
        values: {
          have_solicitor: 'yes',
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
  });

  test('skip step', () => {
    const button = findByTestAttr(wrapper, 'button-skip-step');
    button.simulate('click');

    expect(navigate).toHaveBeenCalledWith('/company-design/shareholder-details');
  });

  test('form cleared on unmount', () => {
    wrapper.unmount();
    expect(formUtils.clearFormState).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    showLoaderMock.mockReset();
    hideLoaderMock.mockReset();
    navigate.mockReset();
  });
});
