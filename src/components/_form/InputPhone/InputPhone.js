import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Note from '../../_layout/Note/Note';

import './input-phone.scss';

/**
 * InputPhone
 * Renders phone number component
 * @param {object} props - props object (for jsdoc)
 * @param {string} [value] - existing value of the input field
 * @param {string} id - field identifier
 * @param {string} [label] - text label to display above the input field
 * @param {string} type - input variant type
 * @param {function} onChange - callback to execute on type
 * @param {bool} [readOnly] - boolean to set the input to read only
 * @param {string} [note] - explanation text to show under input
 * @return {JSXElement} InputPhone
 */
const InputPhone = (props) => {
  const {
    id,
    label,
    onChange,
    value,
    validate,
    readOnly,
    note,
    error,
    onKeyPress
  } = props;

  let country = '+44';
  let number = '';

  if(value) {
    const split = value.split(')');
    country = split[0].substring(1);
    number = split[1];
  }

  const onBlur = validate ? validate : undefined;

  return (
    <div className="input-phone" data-test="component-input-phone">
      <div className="input-phone-label">
        {label}
      </div>

      {error &&
        <div data-test="input-phone-error" className="input-phone-required">{error}</div>
      }

      <div className="input-phone-box">
        <div className="input-phone-country">
          <select data-test="phone-country" onChange={(e) => onChange(`(${e.target.value})${number}`, id)} value={country}>
            <option value="+44">+44</option>
            <option value="+01">+01</option>
            <option value="+22">+22</option>
            <option value="+33">+33</option>
          </select>
        </div>

        <input
          data-test="phone-number"
          type="number"
          id={id}
          onBlur={onBlur}
          onChange={(e) => onChange(`(${country})${e.target.value}`)}
          value={number}
          readOnly={readOnly}
          className={classNames([
            {'error': error }
          ])}
          onKeyPress={onKeyPress}
        />
      </div>

      {note && <Note>{note}</Note>}
    </div>
  );
};

InputPhone.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  validate: PropTypes.func,
  onKeyPress: PropTypes.func,
  note: PropTypes.string,
  error: PropTypes.string
};

export default InputPhone;
