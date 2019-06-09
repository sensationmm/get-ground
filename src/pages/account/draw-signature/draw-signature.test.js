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
  AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    location: { search: null }
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

  test('splitSignature fires save signature', () => {
    wrapper.instance().saveSignature = jest.fn();
    wrapper.instance().splitSignature();

    expect(wrapper.instance().saveSignature).toHaveBeenCalled();
  });

  describe('saveSignature()', () => {

    test('save signature success', async () => {
      AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 201 }));
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
    });
  });

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });

});
