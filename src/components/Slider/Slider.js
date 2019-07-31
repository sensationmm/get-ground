import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import '../IntroSlider/intro-slider.scss';

import RightArrow from 'src/assets/images/chevron-right.svg';
import LeftArrow from 'src/assets/images/chevron-left.svg';

/**
  * Slider (carousel)
  *
  * @param {Object} props - Props object
  * @param {Object[]} slides - Array of content objects for each slide
  * @param {string} slides[].content - Content for each slide
  * @param {boolean} isMobile - mobile layout variant
  * @param {boolean} arrows - whether to show arrows
  * @return {JSXElement} Slider
*/
const ContentSlider = props => {

  const { slides } = props;
  const settings = {
    dots: true,
    arrows: props.arrows,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <img className="slick-slider-arrow right" src={RightArrow} width="10px" />,
    prevArrow: <img className="slick-slider-arrow left" src={LeftArrow} width="10px" />
  }

  return (
    <div data-testid="intro-slider" className={props.classes}>
      <Slider data-testid="react-slider" {...settings}>
        {slides.map((slide, index) => {
          return (
            <div 
              className="slick-slide--container"
              data-testid="slick-slide--container" 
              key={`slide-${index}`}
            >
              { slide }
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

ContentSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      imageAltText: PropTypes.string,
      title: PropTypes.string,
      copy: PropTypes.string
    })
  ),
  isMobile: PropTypes.bool,
  arrows: PropTypes.bool,
  classes: PropTypes.string
};

ContentSlider.defaultProps = {
  arrows: true
};

const mapStateToProps = (state) => ({
  isMobile: state.layout.isMobile
});

export const RawComponent = ContentSlider;

export default connect(mapStateToProps)(ContentSlider);
