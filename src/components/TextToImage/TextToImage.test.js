import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import React from 'react';
import { mount } from 'enzyme';

import TextToImage from './TextToImage';

HTMLCanvasElement.prototype.getContext = () => {
  return {
    canvas: {
      toDataURL: jest.fn()
    },
    fillText: jest.fn()
  }
};

describe('<TextToImage />', () => {
  let wrapper;
  const onClickMock = jest.fn();
  const defaultProps = {
    firstname: 'bob',
    lastname: 'bobbers',
    canvasWrapperId: 'wrapper-id',
    canvasId: 'canvas-id',
    imageId: 'image-id',
    font: 'Caveat',
    fontSize: '30px',
    setSignatureImg: jest.fn(),
    onClick: onClickMock
  };

  beforeEach(() => {
    wrapper = setup(TextToImage, defaultProps, { img: '' });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-text-to-image');
    expect(component.length).toBe(1);
  });

  test('componentDidUpdate', () => {
    const div = document.createElement('div');
    window.domNode = div;
    document.body.appendChild(div);

    wrapper = mount(<TextToImage {...defaultProps} />, { attachTo: window.domNode });
    wrapper.setProps({ firstname: 'bobb' });
    expect(wrapper.props().setSignatureImg).toHaveBeenCalled();
  });

  test('onClick is fired on component click', () => {
    const component = findByTestAttr(wrapper, 'component-text-to-image');

    component.props().onClick();
    expect(onClickMock).toHaveBeenCalled();
  });

});
