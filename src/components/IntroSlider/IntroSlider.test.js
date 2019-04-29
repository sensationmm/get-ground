import { setup } from '../../test-utils/test-utils'

import IntroSlider from './IntroSlider'

describe('<IntroSlider />', () => {
  let wrapper;
  const mockSlides = {
    slides: [
      {
        title: 'Get started',
        copy: '<p>In 5 Simple steps you will have created an account and profile on getGround.</p><p>This means you will be ready to design your company and proceed to investing in property.</p>'
      },
      {
        title: 'Get started',
        copy: '<p>In 5 Simple steps you will have created an account and profile on getGround.</p><p>This means you will be ready to design your company and proceed to investing in property.</p>'
      }
    ]
  }

  beforeEach(() => {
    wrapper = setup(IntroSlider, mockSlides);
  });

  test('number of slides matches number of config items', () => {
    expect(wrapper.find('.slick-slide--container').length).toBe(mockSlides.slides.length);
  })
});
