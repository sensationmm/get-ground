import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { formatCurrency, stripCurrency } from 'src/utils/functions';

import Note from 'src/components/_layout/Note/Note';

import './input.scss';

/**
 * Input
 * Standard input component
 * @param {object} props - for JSdoc
 * @param {string} [value] - existing value of the input field
 * @param {string} id - field identifier
 * @param {string} [label] - text label to display above the input field
 * @param {string} type - input variant type
 * @param {string} [placeholder] - placeholder text for the input field
 * @param {function} [onChange] - callback to execute on type
 * @param {function} [onFocus] - callback to execute on focus
 * @param {bool} [readOnly] - boolean to set the input to read only
 * @param {string} [note] - explanation text to show under input
 * @param {number} [max]  - max value allowed in number input
 * @param {number} [min]  - min value allowed in number input
 * @param {bool} [hidden] - boolean to hide / show the button
 * @param {string} [wrapperClass] - unique class name for container
 * @return {JSXElement} Input
 */
const Input = (props) => {
  const {
    id,
    type,
    label,
    onChange,
    onKeyPress,
    value,
    validate,
    onFocus,
    readOnly,
    note,
    error,
    min,
    max,
    hidden,
    wrapperClass,
    placeholder
  } = props;

  const isCurrencyField = wrapperClass && wrapperClass.search('currency') > -1;

  return (
    <div
      className={classNames('text-input', wrapperClass)}
      data-test="component-input"
      style={ hidden !== undefined ? { display: hidden ? 'none' : 'block'} : {}}
    >
      {label &&
        <div className="text-input-label">
          {label}
        </div>
      }

      {error &&
        <div data-test="text-input-error" className="text-input-required">{error}</div>
      }

      <div className={classNames([
          'text-input-wrapper',
          {'error': error }
        ])}
      >
        <input
          data-test="component-input-field"
          type={type}
          id={id}
          onFocus={(e) => {
            /* istanbul ignore else */
            if (onFocus) onFocus(e);
          }}
          placeholder={placeholder}
          onBlur={(e) => {
            if (readOnly) return;
            validate ? validate() : null
          }}
          onChange={(e) => isCurrencyField ? onChange(stripCurrency(e.target.value)) : onChange(e.target.value)}
          onKeyPress={onKeyPress}
          value={isCurrencyField ? formatCurrency(value) : value}
          readOnly={readOnly}
          min={min}
          max={max}
        />
      </div>

      {note && <Note data-test="text-input-note">{note}</Note>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'number']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyPress: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  validate: PropTypes.func,
  note: PropTypes.string,
  error: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  hidden: PropTypes.bool,
  wrapperClass: PropTypes.string
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
