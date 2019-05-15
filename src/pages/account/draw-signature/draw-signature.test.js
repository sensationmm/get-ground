import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as DrawSignature, AccountService } from './index';
import SignaturePad from 'react-signature-pad';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('draw signature page', () => {
  let wrapper;
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const signatureDataMock = 'data:image/png;base64,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'; 
  AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock
  };

  global.atob = jest.fn().mockReturnValue('just some string');

  beforeEach(() => {
    wrapper = setup(DrawSignature, defaultProps, {
      savedSignature: '',
      isSignature: false
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-draw-signature');
    expect(component.length).toBe(1);
  });

  test('SignaturePad sets state onEnd', () => {
    const component = findByTestAttr(wrapper, 'container-draw-signature');

    component.find(SignaturePad).props().onEnd();
    expect(wrapper.state().isSignature).toEqual(true);
  });

  test('on redo button click set state isSignature to false', () => {
    const redoButton = findByTestAttr(wrapper, 'button-redo');

    redoButton.props().onClick();
    expect(wrapper.state().isSignature).toEqual(false);
  });

  test('convertFileToBlob is called and calls saveSignature', () => {
    jest.spyOn(wrapper.instance(), 'convertFileToBlob');
    jest.spyOn(wrapper.instance(), 'saveSignature');
    wrapper.instance().convertFileToBlob(signatureDataMock, 'content type');

    expect(wrapper.instance().convertFileToBlob).toHaveBeenCalledWith(signatureDataMock, 'content type');
    expect(wrapper.instance().saveSignature).toHaveBeenCalled();
  });

  describe('createAccount()', () => {

    test('save signature success', async () => {
      AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
      const wrapperNew = setup(DrawSignature, defaultProps);
      
      await wrapperNew.instance().saveSignature();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapperNew.state().savedSignature).toEqual('');
    });

    test('save signature failure', async () => {
      AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 400 }));
      const wrapperNew = setup(DrawSignature, defaultProps);
      
      await wrapperNew.instance().saveSignature();
      
      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapperNew.state().errors.form).toEqual('string');
    });
  });

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });

});
