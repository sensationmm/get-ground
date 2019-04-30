import { setup, findByTestAttr } from '../../../test-utils/test-utils';
import ImageMock from '../../../test-utils/fileMock';

import ImageFull from './ImageFull';

describe('<ImageFull />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(ImageFull, { src: ImageMock });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-image-full');
    expect(component.length).toBe(1);
  });
});
