import React from 'react';
import PropTypes from 'prop-types';

import './comparison.scss';

/**
* Comparison
* Displays an array of text content in staggered left/right alignment
* @param {object} props - props object
* @return {JSXElement} - Comparison component
*/
const Comparison = (props) => {
  const { heading, compareA, compareB, footnote } = props;

  const content = ({ heading, labels, values }) => {
    return (
      <div className="comparison-table-block">
        <h4>{ heading }</h4>
        {labels.map((item, count) => {
          return (
            <div className="comparison-table-item" key={`item-${count}`}>
              <div className="comparison-table-item-label">{ item }</div>
              <div className="comparison-table-item-value">{ values[count] }%</div>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <div data-test="component-comparison" className="comparison">
      <h3>{ heading }</h3>

      <div className="comparison-table">
        { content(compareA) }
        { content(compareB) }
      </div>

      {footnote && <div className="comparison-footnote">{ footnote }</div>}
    </div>
  );
}

Comparison.propTypes = {
  heading: PropTypes.string,
  labels: PropTypes.array,
  values: PropTypes.array,
  footnote: PropTypes.string,
  compareA: PropTypes.shape({
    heading: PropTypes.string,
    labels: PropTypes.array,
    values: PropTypes.array
  }),
  compareB: PropTypes.shape({
    heading: PropTypes.string,
    labels: PropTypes.array,
    values: PropTypes.array
  })
};

export default Comparison;
