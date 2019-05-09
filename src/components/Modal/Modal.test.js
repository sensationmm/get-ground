import React from 'react';
import { mount } from 'enzyme';

import Modal from './Modal';

describe('<Modal />', () => {
  let component;
  const Child = () => <div>stuff</div>;
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  it('should render with its children', () => {
    component = mount(
      <Modal>
        <Child />
      </Modal>,
    );

    expect(component.find(Child).exists()).toBeTruthy();
  });

  it('test', () => {
    const component = mount(
      <Modal>
        <Child />
      </Modal>,
    );

    const componentWillUnmount = jest.spyOn(component.instance(), 'componentWillUnmount');
    component.unmount();
    expect(componentWillUnmount).toHaveBeenCalled();
  });
});
