import React from 'react';
import PropTypes from 'prop-types';

import CanvasCurve from 'src/components/_layout/CanvasCurve'

import './curve-box.scss';

/**
* CurveBox
* Wrapper component to display content in a box with curved edges
* @param {object} props - props object
* @return {JSXElement} - CurveBox component
*/
const CurveBox = (props) => {
  const { children } = props;

  return (
    <div data-test="component-curve-box" className="curve-box">
      <CanvasCurve shape="chevronTop" classes="top" />

      <div className="curve-box-content">
        { children }
      </div>

      <CanvasCurve shape="chevronBottom" classes="bottom" />
    </div>
  );
}

CurveBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
};

export default CurveBox;
