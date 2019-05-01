import React from 'react';
import PropTypes from 'prop-types';

import './form.css';
import { isArray } from 'util';

/**
* Form
*
* Wrapper component to display a set of form elememts
*
* @param {element|array} children - any HTML/React components to display as the content
*/

const Form = props => {
  const { children } = props;

  return (
    <div data-test="component-form" className="form">
      {children.map((child, key) => {
        if(isArray(child)) {
          return child.map((childItem, childKey) => {
            return <div className="form-row" key={`form-row-${childKey}`}>{childItem}</div>;
          });
        }
        return <div className="form-row" key={`form-row-${key}`}>{child}</div>;
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
};

export default Form;
