import React from 'react';
import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import Form from './Form';

describe('<Form />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(Form, { children: [
      <div key='child-1'>Child1</div>,
      <div key='child-2'>Child2</div>,
      [
        <div key='child-3'>Child3</div>,
        <div key='child-4'>Child4</div>
      ]
    ] });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-form');
    expect(component.length).toBe(1);
  });

  test('renders correct number of children', () => {
    const children = wrapper.find('.form-row');

    expect(children.length).toBe(4);
  });
});
