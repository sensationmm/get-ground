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
 * @param {bool} [hidden] - boolean to hide / show the button
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
    small,
    hidden,
    icon
  } = props;

  return (
    <button
      data-test='component-button'
      disabled={disabled}
      style={{ display: hidden ? 'none' : 'block'}}
      className={classNames(
        'button',
        classes,
        {'disabled': disabled},
        {'full': fullWidth},
        {'opaque': opaque},
        {'small': small},
        {'icon': icon}
      )}
      onClick={onClick}
    >
      {label}
      {icon &&
        <img className="button-icon" alt="" src={icon} />
      }
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
  small: PropTypes.bool,
  hidden: PropTypes.bool,
  icon: PropTypes.any
};

Button.defaultProps = {
  label: 'Submit',
  disabled: false,
  fullWidth: false,
  opaque: false,
  small: false
};

export default Button;
