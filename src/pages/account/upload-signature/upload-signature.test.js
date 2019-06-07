import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as UploadSignature, AccountService } from './index';
import signatureUtils from 'src/utils/signature';

/**
 * FileReader
 * mock FileReader
 *
 * @author Ravin Patel
 * @return {Class} FileReader
 */
class MockFileReader {
  onerror() {}
  onload() {}
  readAsDataURL() {
    this.result = 'result';
    this.onload = jest.fn();
  }
}

const mockBlock = new Blob([])

describe('upload signature page', () => {
  let wrapper;
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    location: { search: null }
  };
  const originalFileReader = FileReader;

  global.atob = jest.fn().mockReturnValue('just some string');

  beforeEach(() => {
    wrapper = setup(UploadSignature, defaultProps, {
      imageSrc: '',
      imageSaved: false
    });

    window.FileReader = MockFileReader;
  });

  afterEach(() => {
    window.FileReader = originalFileReader;
  })
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-upload-signature');
    expect(component.length).toBe(1);
  });

  test('splitSignature retrieves blob from utils and fires saveSignature', () => {
    const wrapper = setup(UploadSignature, defaultProps, {
      imageSaved: false
    });
    const spy = jest.spyOn(signatureUtils, 'splitSignatureData').mockReturnValue(mockBlock);

    wrapper.instance().saveSignature = jest.fn();
    wrapper.instance().splitSignature();

    expect(wrapper.instance().saveSignature).toHaveBeenCalledWith(mockBlock);
    expect(spy).toHaveBeenCalled();
  });

  it('dropzone', () => {
    const dropzone = wrapper.find('[data-test="dropzone"]')
    expect(dropzone.length).toEqual(1);

    jest.spyOn(wrapper.instance(), 'getDataUrl');

    dropzone.props().onDrop([
      {mockFile: 'mock-uploaded-file'}
    ])

    expect(wrapper.instance().getDataUrl).toHaveBeenCalledWith({ mockFile: 'mock-uploaded-file' })
  })

  describe('saveSignature()', () => {

    test('save signature success', async () => {
      AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 201 }));
      const wrapperNew = setup(UploadSignature, defaultProps);
      
      await wrapperNew.instance().saveSignature();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapperNew.state().imageSaved).toEqual(true);
    });

    test('save signature failure', async () => {
      AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 400 }));
      const wrapperNew = setup(UploadSignature, defaultProps);
      
      await wrapperNew.instance().saveSignature();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });

});
