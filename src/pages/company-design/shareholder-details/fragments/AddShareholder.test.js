import { RawComponent as AddShareholder } from './AddShareholder'
import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import formUtils from 'src/utils/form';

describe('AddShareholder', () => {
  let wrapper;
  const mockOnRef = jest.fn();
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id ),
    onRef: mockOnRef
  };

  const spy = jest.spyOn(formUtils, 'validateForm').mockReturnValue(true);

  beforeEach(() => {
    wrapper = setup(AddShareholder, defaultProps);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-add-shareholder');
    expect(component.length).toBe(1);
    expect(mockOnRef).toHaveBeenCalled();
  });

  test('ref cleared on unmount', () => {
    wrapper.unmount();
    expect(mockOnRef).toHaveBeenCalledWith(undefined);
  });

  test('validate()', () => {
    wrapper.instance().validate();
    expect(spy).toHaveBeenCalled();
  });

  test('translations', () => {
    expect(wrapper.find('h2').text()).toEqual('companyDesign.shareholderDetails.add.new.title')
  });

  afterEach(() => {
    mockOnRef.mockReset();
  });
});
