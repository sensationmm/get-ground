import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import RadioGroup from './RadioGroup';
import Radio from 'src/components/_form/Radio/Radio';

describe('<RadioGroup />', () => {
  let wrapper;
  let props;
  const mockOnChange = jest.fn();
  const mockEvent = {
    target: {
      value: 'yes'
    }
  };

  beforeEach(() => {
    props = {
      items: [
        {
          label: 'no',
          value: 'no'
        },
        {
          label: 'yes',
          value: 'no'
        }
      ],
      name: 'radioGroup',
      onChange: mockOnChange,
      value: '',
      groupLabel: 'is this a question?',
      hidden: false
    }

   wrapper = setup(RadioGroup, props);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-radio-group');
    expect(component.length).toBe(1);
  });

  test('renders and is hidden', () => {
    wrapper = setup(RadioGroup, { hidden: true });
    const component = findByTestAttr(wrapper, 'component-radio-group');
    expect(component.length).toBe(1);
  });

  test('on child `radio` change fire onChange', () => {
    const component = findByTestAttr(wrapper, 'component-radio-group');

    component.find(Radio).first().props().onChange(mockEvent);
    expect(mockOnChange).toHaveBeenCalledWith('yes');
  });

});
