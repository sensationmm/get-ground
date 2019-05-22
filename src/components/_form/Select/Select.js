import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './select.scss';

/**
 * Select
 * Wrapper for select list
 * @param {Object} props - props object
 * @param {string} label - value for the select label
 * @param {string} classes - class names as a string
 * @param {function} onChange - callback to execute on select
 * @param {array} options - array of react elements (option elements)
 * @param {string} defaultOptionText - first option value
 * @return {JSXElement} Select
 */
const Select = (props) => {
  const {
    label,
    classes,
    onChange,
    options,
    defaultOptionText,
    value,
    error
  } = props;

  return (
    <div data-test="component-select" className="select">
      <label>{label}</label>

      {error &&
        <div data-test="select-error" className="select-required">{error}</div>
      }

      <select
        className={classNames([ classes,
          {'error': error }
        ])}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{defaultOptionText}</option>
        {options}
      </select>
    </div>
  );
};

Select.propTypes = {
  classes: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  defaultOptionText: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default Select;

