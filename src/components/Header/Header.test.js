import React from 'react';
import { setup, findByTestAttr } from '../../test-utils/test-utils';

import Header from './Header';
import Button from 'src/components/_buttons/Button/Button';

describe('<Header />', () => {
  let wrapper;

  test('renders without error', () => {
    wrapper = setup(Header);
    const component = findByTestAttr(wrapper, 'component-header');
    expect(component.length).toBe(1);
  });

  test('renders header button', () => {
    wrapper = setup(Header, { children: <Button label="str" />});

    expect(wrapper.find(Button).length).toBe(1);
  });
});
