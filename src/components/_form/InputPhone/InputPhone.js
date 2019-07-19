import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/scss/react-flags-select.scss';

import countryData from 'src/countries.json';
import Note from 'src/components/_layout/Note/Note';
import { getByValue } from 'src/utils/functions';

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
  
  const flagLabels = {};
  const flags = countryData.map((country) => {
    flagLabels[country.alpha_2_code] = country.dial_code;

    return country.alpha_2_code;
  });

  const selectedCountry = getByValue(countryData, 'dial_code', country).alpha_2_code;

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
        <ReactFlagsSelect
          countries={flags}
          defaultCountry={selectedCountry}
          customLabels={flagLabels}
          searchable
          onSelect={(countryCode) => onChange(`(${getByValue(countryData, 'alpha_2_code', countryCode).dial_code})${number}`, id)} 
        />
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
