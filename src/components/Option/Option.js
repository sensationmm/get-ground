import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './option.scss';

/**
* Option
*
* @param {Object} props - props object (for jsdoc)
* @param {boolean} small - small styling variant
* @param {boolean} center - center option text styling
* @param {string} title - main title of Option
* @param {boolean} selected - whether to render in selected state
* @param {string} [text] - option text to show under title
* @param {any} [value] - optional content to show on right
* @param {function} [onClick] - callback function to execute when option is clicked
* @return {JSXElement} Option
*/
const Option = props => {
  const { selected, title, text, value, onClick, small, center } = props;

  return (
    <div
      data-test="component-option"
      className={classNames(
        'option',
        { selected: selected },
        { clickable: !!onClick },
        { small: small },
        { center: center }
      )}
      onClick={onClick}
    >
      <div>
        <div className={classNames('option-title', { 'option-title-header': !!text })}>{title}</div>
        {!!text && <div className="option-text">{text}</div>}
      </div>
      {!!value && <div className="option-value">{value}</div>}
    </div>
  );
};

Option.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  text: PropTypes.string,
  value: PropTypes.any,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  center: PropTypes.bool
};

Option.defaultProps = {
  selected: false
};

export default Option;
