import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from './Layout'

describe('<Layout />', () => {
  const props = {
    isLoading: false,
    children: {
      props: {
        role: 'test-role'
      }
    },
    setWidth: jest.fn()
  }

  test('onmount should call setWidth with innerWidth', () => {
    shallow(<Layout {...props} />);
    expect(props.setWidth).toHaveBeenCalledWith(1024);
  })

  test('renders Loader if isLoading is true', () => {
    const customProps = {
      ...props,
      isLoading: true
    }
    const wrapper = shallow(<Layout {...customProps} />);
    expect(wrapper.find('Loader')).toHaveLength(1);
  })

  test('passes role to classname', () => {
    const wrapper = shallow(<Layout {...props} />);
    expect(wrapper.find('.app.test-role')).toHaveLength(1);
  })
})
