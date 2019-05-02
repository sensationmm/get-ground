import { setupWithStore, findByTestAttr } from 'src/test-utils/test-utils';

import TermsModalContent from './TermsModalContent';

describe('<TermsModalContent />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setupWithStore(TermsModalContent, {
      termsMarkdown: '',
      markdownContainerHeight: ''
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'terms-modal');
    expect(component.length).toBe(1);
  });

  // test('getBlobForDownload is fired when the download button is clicked', () => {
  //   const component = findByTestAttr(wrapper, 'terms-modal');

  //   jest.spyOn(wrapper.instance(), 'getBlobForDownload');

  //   component.find(Button).props().onClick();

  //   expect(wrapper.instance().getBlobForDownload).toHaveBeenCalled();
  // });

});
