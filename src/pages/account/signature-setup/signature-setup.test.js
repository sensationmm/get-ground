import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as SignatureSetup } from './index';

describe('<SignatureSetup />', () => {
  let wrapper;
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const tMock = jest.fn().mockReturnValue('string');
  const defaultProps = {
    t: tMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock
  };

  beforeEach(() => {
    wrapper = setup(SignatureSetup, defaultProps);
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-signature-setup');
    expect(component.length).toBe(1);
  });

});