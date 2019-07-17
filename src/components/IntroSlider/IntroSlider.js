import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import './intro-slider.scss';
import TextImage from 'src/components/_layout/TextImage/TextImage';

import RightArrow from 'src/assets/images/chevron-right.svg';
import LeftArrow from 'src/assets/images/chevron-left.svg';

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
    arrows: !props.isMobile,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <img className="slick-slider-arrow right" src={RightArrow} width="10px" />,
    prevArrow: <img className="slick-slider-arrow left" src={LeftArrow} width="10px" />
  }

  return (
    <div data-testid="intro-slider">
      <Slider data-testid="react-slider" {...settings}>
        {slides.map((slide, index) => {
          return (
            <div className="slick-slide--container" data-testid="slick-slide--container" key={`slide-${index}`}>
              <TextImage
                title={slide.title}
                text={slide.copy}
                image={slide.image}
              />
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
  isMobile: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isMobile: state.layout.isMobile
});

export const RawComponent = IntroSlider;

export default connect(mapStateToProps)(IntroSlider);
