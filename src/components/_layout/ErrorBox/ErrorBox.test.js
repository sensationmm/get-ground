import React from 'react';
import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import ErrorBox from './ErrorBox';

describe('<ErrorBox />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(
      ErrorBox,
      { children: [
        <div key="child-1">Child1</div>,
        <div key="child-2">Child2</div>
      ]
      }
    );
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-error-box');
    expect(component.length).toBe(1);
  });
});
