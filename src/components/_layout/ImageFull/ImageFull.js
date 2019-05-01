import React from 'react';
import PropTypes from 'prop-types';

import './image-full.css';

/**
* ImageFull
* Renders a full width image
*
* @param {Object} props - props object (for jsdoc)
* @return {JSXElement} Note
*/
const ImageFull = props => {
  return (
    <div data-test="component-image-full" className="image-full">
      <img src={props.src} alt={props.alt} />
    </div>
  );
};

ImageFull.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};

ImageFull.defaultProps = {
  alt: ''
};

export default ImageFull;
