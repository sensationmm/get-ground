import { setupWithStore, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as ModalContent } from './ModalContent';

describe('<ModalContent />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setupWithStore(ModalContent);
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'modal-content');
    expect(component.length).toBe(1);
  });

  // test('getBlobForDownload is fired when the download button is clicked', () => {
  //   const component = findByTestAttr(wrapper, 'modal-content');

  //   jest.spyOn(wrapper.instance(), 'getBlobForDownload');

  //   component.find(Button).props().onClick();

  //   expect(wrapper.instance().getBlobForDownload).toHaveBeenCalled();
  // });

});
