import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { initialState as ReduxFormMock } from 'src/state/reducers/form';

import { RawComponent as CreateSignature, AccountService } from './index';
import Button from 'src/components/_buttons/Button/Button';
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup';

describe('create signature page', () => {
  let wrapper;
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    form: ReduxFormMock
  };

  beforeEach(() => {
    wrapper = setup(CreateSignature, defaultProps, {
      signatureOneImg: '',
      signatureTwoImg: '',
      signatureThreeImg: '',
      selectedSignature: '',
      savedSignature: ''
    });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-create-signature');
    expect(component.length).toBe(1);
  });

  test('splitSignature recieves the image blob for signature 1 and fires saveSignature', () => {
    wrapper = setup(CreateSignature, defaultProps, {
      selectedSignature: 'signature1',
      signatureOneImg: 'data:image/png;base64,someimagepath1'
    });
    wrapper.instance().saveSignature = jest.fn();
    wrapper.instance().splitSignature();

    expect(wrapper.instance().saveSignature).toHaveBeenCalled();
  });

  test('splitSignature recieves the image blob for signature 2 and fires saveSignature', () => {
    wrapper = setup(CreateSignature, defaultProps, {
      selectedSignature: 'signature2',
      signatureTwoImg: 'data:image/png;base64,someimagepath2'
    });
    wrapper.instance().saveSignature = jest.fn();
    wrapper.instance().splitSignature();

    expect(wrapper.instance().saveSignature).toHaveBeenCalled();
  });

  test('splitSignature recieves the image blob for signature 3 and fires saveSignature', () => {
    wrapper = setup(CreateSignature, defaultProps, {
      selectedSignature: 'signature3',
      signatureThreeImg: 'data:image/png;base64,someimagepath3'
    });
    wrapper.instance().saveSignature = jest.fn();
    wrapper.instance().splitSignature();

    expect(wrapper.instance().saveSignature).toHaveBeenCalled();
  });

  test('reset the saved signature on edit click', () => {
    const component = findByTestAttr(wrapper, 'container-create-signature');
    component.find(Button).at(0).props().onClick();

    expect(wrapper.state().savedSignature).toEqual('');
  });

  test('selected signature is set on radio group change', () => {
    const component = findByTestAttr(wrapper, 'container-create-signature');
    component.find(RadioGroup).props().onChange('signature1');

    expect(wrapper.state().selectedSignature).toEqual('signature1');
  });

  describe('saveSignature()', () => {

    test('save signature success', async () => {
      AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 201 }));

      await wrapper.instance().saveSignature('someblob', 'signatureimgpath');

      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapper.state().savedSignature).toEqual('signatureimgpath');
    });

    test('save signature failure', async () => {
      AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 400 }));
      const wrapper = setup(CreateSignature, defaultProps);

      await wrapper.instance().saveSignature();

      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(() => {
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
  });

});
