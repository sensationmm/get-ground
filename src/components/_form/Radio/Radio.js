import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './radio.scss';

/**
 * Radio
 * @param {string} name - name of radio button
 * @param {string} id - id of radio button
 * @param {bool} isChecked - boolean for whether it is checked or not
 * @param {string} label - label for the radio button
 * @param {string} value - radio button value
 * @param {func} onChange - onChange function
 * @return {JSXElement} Radio
 */
const Radio = ({ id, isChecked, label, name, value, onChange }) => {
  return (
    <div
      className={classNames(
        'radio',
        { 'checked': isChecked }
      )}
      data-test="component-radio"
    >
      <input id={id} name={name} onChange={onChange} type="radio" value={value} />
      <label htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

Radio.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Radio;
