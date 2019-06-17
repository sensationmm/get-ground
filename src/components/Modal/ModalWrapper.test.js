import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import ModalWrapper from './ModalWrapper';

describe('<ModalWrapper />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(ModalWrapper, { 
      transitionBool: false,
      transitionTime: 600,
      classes: 'modal'
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-modal-wrapper');
    expect(component.length).toBe(1);
  });
});
