import React from 'react';
import { setup, findByTestAttr } from '../../../test-utils/test-utils';

import IntroBox from './IntroBox';

describe('<IntroBox />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(
      IntroBox,
      { children: [
        <div key="child-1">Child1</div>,
        <div key="child-2">Child2</div>
      ]
      }
    );
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-intro-box');
    expect(component.length).toBe(1);
  });
});
