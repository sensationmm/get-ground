import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './checkbox.scss';

/**
 * Checkbox
 *
 * @param {Object} props - props object (for jest)
 * @param {string} checked - whether in selected state
 * @param {string} label - text label to display above the input field
 * @param {function} onChange - callback to execute on click
 * @param {string} [error] - error message
 * @return {JSXElement} Checkbox
 */
const Checkbox = (props) => {
  const { label, checked, onChange, error } = props;

  return (
    <div className="checkbox" data-test="component-checkbox">
      <div data-test="component-checkbox-layout" className="checkbox-layout" onClick={() => onChange(!checked)}>
        <div
          data-test="component-checkbox-toggle"
          className={classNames(
            'checkbox-toggle',
            { 'checked': checked },
            { 'error': error }
          )}
        />

        <div className="checkbox-label">
          {label}
        </div>
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  error: PropTypes.string
};

export default Checkbox;
