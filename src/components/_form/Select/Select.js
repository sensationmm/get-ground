import React from 'react';
import PropTypes from 'prop-types';

import chevron from '../../../assets/images/chevron-down.svg';
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
    defaultOptionText
  } = props;

  return (
    <div data-test="component-select" className="select">
      <label>{label}</label>
      <select
        className={classes}
        onChange={onChange}
      >
        <option value="">{defaultOptionText}</option>
        {options}
      </select>
      <span className="select__icon icon-chevron-down">
        <img src={chevron} alt="" />
      </span>
    </div>
  );
};

Select.propTypes = {
  classes: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  defaultOptionText: PropTypes.string.isRequired
};

export default Select;

