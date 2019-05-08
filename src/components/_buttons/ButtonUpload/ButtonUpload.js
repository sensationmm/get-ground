import React from 'react';
import PropTypes from 'prop-types';
import './button-upload.scss'

/**
 * Contact Us
 * App Contact Us component
 * @param {Object} props - props object (for jsdoc)
 * @return {JSXElement} ContactUs Component
 */

const ButtonUpload = ({label}) => {
  return (
    <p className="button-upload" data-testid="component-button-upload" >
      {label}
    </p>
  )
}

export default ButtonUpload;

ButtonUpload.propTypes = {
  history: PropTypes.object,
  label: PropTypes.string
}
