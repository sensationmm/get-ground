import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as Terms, ModalService } from './terms-and-conditions';

describe('<Terms />', () => {
  let wrapper, component;
  
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();

  jest.spyOn(ModalService, 'fetchModalContent').mockReturnValue(Promise.resolve({ status: 200, data: { markdown_text: '<h1>Hi</h1>' }}));

  const props = {
    t: jest.fn().mockImplementation(id => id),
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock
  };

  global.URL = {
    createObjectURL: jest.fn()
  };

  beforeEach(() => {
    wrapper = setup(Terms, props);
    jest.spyOn(wrapper.instance(), 'getBlobForDownload');
    component = findByTestAttr(wrapper, 'container-terms');
  });

  test('renders without error', () => {
    expect(component.length).toBe(1);
  });

  test('fetches content', () => {
    expect(showLoaderMock).toHaveBeenCalled();
    expect(ModalService.fetchModalContent).toHaveBeenCalledWith('getGround Terms and Conditions');

    expect(wrapper.state().modalMarkdown).toEqual('<h1>Hi</h1>');
    expect(hideLoaderMock).toHaveBeenCalled();
  });

  test('download button', () => {
    const button = findByTestAttr(wrapper, 'download-button');
    button.simulate('click');
    expect(wrapper.instance().getBlobForDownload).toHaveBeenCalled();
  });

  describe('getBlobForDownload()', () => {
    test('getBlobForDownload success', async () => {
      ModalService.markdownToPDF = jest.fn().mockReturnValue(Promise.resolve({ status: 201 }));
      
      await wrapper.instance().getBlobForDownload();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(2); // called on mount and here
      expect(hideLoaderMock).toHaveBeenCalledTimes(2);
    });

    test('getBlobForDownload failure', async () => {
      ModalService.markdownToPDF = jest.fn().mockReturnValue(Promise.resolve({ status: 400 }));
      
      await wrapper.instance().getBlobForDownload();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(2);
      expect(hideLoaderMock).toHaveBeenCalledTimes(2);
      expect(wrapper.state().modalError).toEqual(true);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

  });

  afterEach(() => {
    jest.clearAllMocks();
  });
})
