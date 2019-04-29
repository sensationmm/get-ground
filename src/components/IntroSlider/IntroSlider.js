import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import './intro-slider.scss';

/**
  * Introduction Slider (carousel)
  *
  * @param {Object} props - Props object
  * @param {Object[]} slides - Array of content objects for each slide
  * @param {string} slides[].image - Path to slide image
  * @param {string} slides[].imageAltText - Alt text for slide image
  * @param {string} slides[].title - Heading for slide
  * @param {string} slides[].copy - Copy for slide
  * @return {JSXElement} IntroSlider
*/
const IntroSlider = props => {

  const { slides } = props;
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 720,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0px',
        }
      },
    ]
  }

  return (
    <div data-testid="intro-slider">
      <Slider data-testid="react-slider" {...settings}>
        {slides.map((slide, index) => {
          return (
            <div className="slick-slide--container" data-testid="slick-slide--container" key={`slide-${index}`}>
              <div className="slick-slide--image-wrapper">
                <img src={slide.image} alt={slide.imageAltText} />
              </div>
              <h2>{slide.title}</h2>
              <div className="slick-slide--copy" dangerouslySetInnerHTML={{ __html: slide.copy }} />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

IntroSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      imageAltText: PropTypes.string,
      title: PropTypes.string,
      copy: PropTypes.string
    })
  ),
};

export default IntroSlider;
