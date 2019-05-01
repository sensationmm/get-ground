import React from 'react';
import PropTypes from 'prop-types';

import './intro-box.scss';

/**
* IntroBox
*
* Wrapper component to display page intro content in a box
*
* @param {element|array} children - any HTML/React components to display as the content
*/

const IntroBox = props => {
  const { children } = props;

  return (
    <div data-test="component-intro-box" className="intro-box">
      {children}
    </div>
  );
};

IntroBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
};

export default IntroBox;
