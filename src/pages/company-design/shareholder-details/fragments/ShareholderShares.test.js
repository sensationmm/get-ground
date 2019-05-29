import { RawComponent as ShareholderShares } from './ShareholderShares'
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';

describe('ShareholderShares', () => {
  let wrapper;
  const mockOnRef = jest.fn();
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id ),
    onRef: mockOnRef
  };

  const spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);

  beforeEach(() => {
    wrapper = setup(ShareholderShares, defaultProps);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'fragment-shareholder-share');
    expect(component.length).toBe(1);
    expect(mockOnRef).toHaveBeenCalled();
  });

  test('validate()', () => {
    wrapper.instance().validate();
    expect(spy).toHaveBeenCalled();
  });

  test('ref cleared on unmount', () => {
    wrapper.unmount();
    expect(mockOnRef).toHaveBeenCalledWith(undefined);
  });

  afterEach(() => {
    mockOnRef.mockReset();
  });
});
