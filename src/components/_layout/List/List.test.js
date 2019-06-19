import React from 'react';
import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import { RawComponent as List } from './List';

describe('<List />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(List, { children: [
      <div key='child-1'>Child1</div>,
      <div key='child-2'>Child2</div>,
      [
        <div key='child-3'>Child3</div>,
        <div key='child-4'>Child4</div>
      ]
    ], numToShow: 3, t: jest.fn() });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-list');
    expect(component.length).toBe(1);
  });

  test('renders correct number of children', () => {
    const children = wrapper.find('.list-row');

    expect(children.length).toBe(3);
  });

  test('non array children', () => {
    wrapper = setup(List, { children: <div key='child-1'>Child1</div> });
    const children = wrapper.find('.list-row');

    expect(children.length).toBe(1);
  });
});
