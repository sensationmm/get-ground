import { setupRTL } from '../../../test-utils/test-utils'
import { fireEvent } from 'react-testing-library'

import Button from './Button'

describe('<Button />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      onClick: jest.fn()
    }

   wrapper = setupRTL(Button, props, 'component-button')
  });

  test('renders without error', () => {
    fireEvent.click(wrapper,  new MouseEvent('click'));
    expect(props.onClick).toHaveBeenCalled();
  });
});
