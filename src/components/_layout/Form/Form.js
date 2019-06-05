import React from 'react';
import PropTypes from 'prop-types';

import './form.scss';
import { isArray } from 'util';

/**
* Form
*
* Wrapper component to display a set of form elememts
*
* @param {element|array} children - any HTML/React components to display as the content
* @param {string} spacing - override to default row spacing
*/

const Form = props => {
  const { children, spacing } = props;
  return (
    <div data-test="component-form" className="form">
      {children.map((child, key) => {
        if(isArray(child)) {
          return child.map((childItem, childKey) => {
            return <div className="form-row" style={{ marginBottom: spacing }} key={`form-row-${childKey}`}>{childItem}</div>;
          });
        }
        return <div className="form-row" style={{ marginBottom: spacing }} key={`form-row-${key}`}>{child}</div>;
      })}
    </div>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
  spacing: PropTypes.string
};

export default Form;
