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
    form: ReduxFormMock,
    location: { search: null },
    user: {}
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

    test('save signature success with correct selectedSignature', async () => {
      AccountService.saveSignature = jest.fn().mockReturnValue(Promise.resolve({ status: 200 }));
        wrapper = setup(CreateSignature, defaultProps, {
          selectedSignature: 'signature3',
          signatureThreeImg: 'data:image/png;base64,someimagepath3'
        });
      await wrapper.instance().saveSignature();

      expect(showLoaderMock).toHaveBeenCalledTimes(1);
      expect(hideLoaderMock).toHaveBeenCalledTimes(1);
      expect(wrapper.state().savedSignature).toEqual('data:image/png;base64,someimagepath3');
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
