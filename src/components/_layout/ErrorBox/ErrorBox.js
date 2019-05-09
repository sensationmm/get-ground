import React from 'react';
import PropTypes from 'prop-types';

import './error-box.scss';

/**
* ErrorBox
*
* Wrapper component to display error-style box
*
* @param {element|array} children - any HTML/React components to display as the content
*/

const ErrorBox = props => {
  const { children } = props;

  return (
    <div data-test="component-error-box" className="error-box">
      {children}
    </div>
  );
};

ErrorBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ])
};

export default ErrorBox;
