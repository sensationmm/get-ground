import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

import './button.scss'

/**
 * Button
 * Renders a default style button
 *
 * @author Kevin Reynolds
 * @param {Object} props - props object
 * @param {bool} [disabled] - control button disable / enable
 * @param {string} [label] - button text
 * @param {function} onClick - action to fire when button is clicked
 * @param {string} [classes] - list of css classes passed from wrapper components
 * @param {bool} [fullWidth] - button fills parent horizontal space if true
 * @param {bool} [opaque] - button background is semi-transparent if true
 * @return {JSXElement} Button
 */
const Button = props => {
  const {
    label,
    onClick,
    disabled,
    classes,
    fullWidth,
    opaque,
    small
  } = props;

  return (
    <button
      data-testid="component-button"
      disabled={disabled}
      className={classNames(
        'button',
        classes,
        {'disabled': disabled},
        {'full': fullWidth},
        {'opaque': opaque},
        {'small': small}
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  classes: PropTypes.string,
  fullWidth: PropTypes.bool,
  opaque: PropTypes.bool,
  small: PropTypes.bool
};

Button.defaultProps = {
  label: 'Submit',
  disabled: false,
  fullWidth: false,
  opaque: false,
  small: false
};

export default Button;
