import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button-icon.scss'

/**
 * ButtonIcon
 * Renders am icon button
 *
 * @author Kevin Reynolds
 * @param {Object} props - props object
 * @param {bool} [disabled] - control button disable / enable
 * @param {string} icon - svg to show
 * @param {function} onClick - action to fire when button is clicked
 * @return {JSXElement} ButtonIcon
 */
const ButtonIcon = props => {
  const {
    icon,
    onClick,
    disabled,
    liveChat
  } = props;

  return (
    <button
      data-test='component-button-icon'
      disabled={disabled}
      className={classNames(
        'icon-button',
        {'disabled': disabled},
        {'chat': liveChat}
      )}
      onClick={onClick}
    >
      <img alt="" src={icon} />
    </button>
  );
};

ButtonIcon.propTypes = {
  alt: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  liveChat: PropTypes.bool
};

ButtonIcon.defaultProps = {
  disabled: false
};

export default ButtonIcon;
