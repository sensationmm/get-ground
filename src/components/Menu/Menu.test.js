import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import Menu from './Menu'

describe('<Menu />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      menuLinks: [
        {
          text: 'What We Do',
          link: '/what-we-do'
        },
        {
          text: 'GetGround Advantages',
          link: '/get-ground-advantages'
        }
      ]
    }
    wrapper = setup(Menu, props, { fadeInLinks: false });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-menu');
    expect(component.length).toBe(1);
  });

  test('menu links fade in after it has been opened', (done) => {
    setTimeout(() => {
      expect(wrapper.state().fadeInLinks).toBe(true);
      done();
    }, 200);
  });

});
