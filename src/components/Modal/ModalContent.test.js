import React from 'react';
import { setupWithStore, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as ModalContent, ModalService } from './ModalContent';

describe('<ModalContent />', () => {
  let wrapper;
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const handleOnSignMock = jest.fn();
  ModalService.markdownToPDF = jest.fn().mockReturnValue(Promise.resolve({ status: 201 }));
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    signatureUrl: 'dummysignatureurl',
    handleOnSign: handleOnSignMock,
    content: 'some content',
    heading: 'heading',
    downloadButtonLabel: 'label'
  };

  global.URL = {
    createObjectURL: jest.fn()
  };

  beforeEach(() => {
    wrapper = setupWithStore(ModalContent, defaultProps, {
      signatureImageUrl: '',
      checkboxDisabled: true
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'modal-content');
    expect(component.length).toBe(1);
  });

  test('renders modal footer when theres a checkbox', () => {
    wrapper = setupWithStore(ModalContent, {
      t: tMock,
      showLoader: showLoaderMock,
      hideLoader: hideLoaderMock,
      hasCheckbox: true,
      checkboxLabel: 'checkbox',
      handleCheckboxChange: jest.fn(),
      htmlContent: <p>some modal content</p>
    });
    const modalFooter = wrapper.find('.modal--footer');
    expect(modalFooter.length).toBe(1);
  });

  test('renders modal signature content with a signed signature theres a signature', () => {
    wrapper = setupWithStore(ModalContent, {
      t: tMock,
      showLoader: showLoaderMock,
      hideLoader: hideLoaderMock,
      hasSignature: true,
      isDocumentSigned: true
    });
    const modalSignature = wrapper.find('.modal--signature-wrapper');
    expect(modalSignature.length).toBe(1);
  });

  test('renders modal signature content with an empty signature box', () => {
    wrapper = setupWithStore(ModalContent, {
      t: tMock,
      showLoader: showLoaderMock,
      hideLoader: hideLoaderMock,
      hasSignature: true
    });
    const modalSignature = wrapper.find('.modal--signature-wrapper');
    expect(modalSignature.length).toBe(1);
  });

  describe('getBlobForDownload()', () => {

    test('getBlobForDownload success', async () => {
      ModalService.markdownToPDF = jest.fn().mockReturnValue(Promise.resolve({ status: 201 }));
      const wrapperNew = setupWithStore(ModalContent, defaultProps);
      
      await wrapperNew.instance().getBlobForDownload();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
    });

    test('getBlobForDownload failure', async () => {
      ModalService.markdownToPDF = jest.fn().mockReturnValue(Promise.resolve({ status: 400 }));
      const wrapperNew = setupWithStore(ModalContent, defaultProps);
      
      await wrapperNew.instance().getBlobForDownload();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapperNew.state().modalError).toEqual(true);
    });

  });

  test('setSignature()', () => {
    wrapper.instance().setSignature();
    expect(handleOnSignMock).toHaveBeenCalled();
  });

  describe('handleScroll()', () => {

    test('checkbox is disabled when not scrolled to bottom', () => {
      wrapper.instance().handleScroll({
        target: {
          scrollHeight: 1898,
          scrollTop: 446,
          clientHeight: 695
        }
      });
      expect(wrapper.state().checkboxDisabled).toEqual(true);
    });

    test('checkbox is enabled when scrolled to bottom', () => {
      wrapper.instance().handleScroll({
        target: {
          scrollHeight: 700,
          scrollTop: 200,
          clientHeight: 500
        }
      });
      expect(wrapper.state().checkboxDisabled).toEqual(false);
    });

  })

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });

});
