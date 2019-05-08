import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby'
import './button-upload.scss'

/**
 * Contact Us
 * App Contact Us component
 * @param {Object} props - props object (for jsdoc)
 * @return {JSXElement} ContactUs Component
 */

const ButtonUpload = ({label, path}) => {
  return (
    <Link to={path}>
      <p className="button-upload" data-testid="component-button-upload">
        {label}
      </p>
    </Link>
  )
}

export default ButtonUpload;

ButtonUpload.propTypes = {
  history: PropTypes.object,
  label: PropTypes.string,
  path: PropTypes.string
}
