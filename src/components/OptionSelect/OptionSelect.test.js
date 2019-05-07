import { setup, findByTestAttr } from '../../test-utils/test-utils';

import OptionSelect from './OptionSelect';

describe('<OptionSelect />', () => {
  let wrapper, optionsList;
  const options = [
    { id: 'option1', title: 'Option One'},
    { id: 'option2', title: 'Option Two'},
    { id: 'option3', title: 'Option Three'}
  ];

  const onChangeMock = jest.fn();
  const onDeselectAllMock = jest.fn();

  beforeEach(() => {
    
    wrapper = setup(OptionSelect, {
      options,
      onChange: onChangeMock,
      onDeselectAll: onDeselectAllMock,
      multiple: false,
      selected: ['option1']
    });
    optionsList = wrapper.find('Option');
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-option-select');
    expect(component.length).toBe(1);
  });

  test('renders options', () => {
    expect(optionsList.length).toEqual(options.length);
  });

  test('onClick callback', () => {
    optionsList.first().simulate('click');
    expect(onChangeMock).toHaveBeenCalledWith('option1');
  });
  
  describe('multiple selectable', () => {
    beforeEach(() => {
      wrapper = setup(OptionSelect, {
        options,
        onChange: onChangeMock,
        onDeselectAll: onDeselectAllMock,
        multiple: true
      }, {
        selected: ['option1']
      });
      optionsList = wrapper.find('Option');
    });

    test('adds another option to selected', () => {
      wrapper.instance().onClick('option2');
      expect(wrapper.state().selected.length).toEqual(2);
    });

    test('calls onDeselectAll()', () => {
      wrapper.instance().onClick('option1');
      expect(onDeselectAllMock).toHaveBeenCalledTimes(1);
    });
  });

  test('componentDidUpdate', () => {
    const setStateWrapper = setup(OptionSelect, {
      options,
      onChange: onChangeMock,
      onDeselectAll: onDeselectAllMock,
      selected: ['option1']
    }, {
      selected: ['option1','option2']
    });
    expect(setStateWrapper.state().selected).toEqual(['option1']);
  });
});
