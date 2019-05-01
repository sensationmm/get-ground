import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as validation from '../../../utils/validation';

import Note from '../../_layout/Note/Note';

import './input.css';

const initialState = {
  validated: true,
  validationMessage: null
};

/**
 * Input
 * Standard input component
 * 
 * @param {string} [value] - existing value of the input field
 * @param {string} id - field identifier
 * @param {string} [label] - text label to display above the input field
 * @param {string} type - input variant type
 * @param {string} [placeholder] - placeholder text for the input field
 * @param {function} onChange - callback to execute on type
 * @param {function} onFocus - callback to execute on focus
 * @param {bool} [readOnly] - boolean to set the input to read only
 * @param {string} [note] - explanation text to show under input
 * @return {JSXElement} Input
 */
class Input extends Component {

  render() {
    const { 
      id, 
      type, 
      label, 
      onChange, 
      value, 
      validate, 
      onFocus, 
      readOnly,
      note,
      error
    } = this.props;

    return (
      <div className="text-input" data-test="component-input">
        <div className="text-input-label">
          {label}
        </div>

        {error &&
          <div data-test="text-input-error" className="text-input-required">{error}</div>
        }

        <input
          data-test="component-input-field"
          type={type}
          id={id}
          onFocus={() => {
            this.setState(initialState);
            if (onFocus) onFocus();
          }}
          onBlur={(e) => validate ? validate() : null}
          onChange={(e) => onChange(e.target.value, e.target.id)}
          value={value}
          readOnly={readOnly}
          className={classNames([
            {'error': error }
          ])}
        />

        {note && <Note data-test="text-input-note">{note}</Note>}
      </div>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  validate: PropTypes.func,
  note: PropTypes.string,
  error: PropTypes.string
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
