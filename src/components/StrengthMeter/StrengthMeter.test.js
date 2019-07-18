import { setup, findByTestAttr } from '../../test-utils/test-utils';

import StrengthMeter from './StrengthMeter';

describe('<StrengthMeter />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(StrengthMeter, {
      valueToCheck: 'spongebob123'
    });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-strength-meter');
    expect(component.length).toBe(1);
  });

  describe('createLabel()', () => {
    test('returns expected value', () => {
      expect(wrapper.instance().createLabel(10)).toEqual('Weak');
      expect(wrapper.instance().createLabel(0)).toEqual('Weak');
      expect(wrapper.instance().createLabel(1)).toEqual('Fair');
      expect(wrapper.instance().createLabel(2)).toEqual('Fair');
      expect(wrapper.instance().createLabel(3)).toEqual('Good');
      expect(wrapper.instance().createLabel(4)).toEqual('Strong');
    });
  });
});
