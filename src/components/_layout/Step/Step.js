import React from 'react';
import PropTypes from 'prop-types';

import './step.scss';

/**
* Step
* Renders a set of instructions
* @param {object} props - props object
* @return {JSXElement} - Step component
*/
const Step = (props) => {
  const { image, stepName, heading, content } = props;

  return (
    <div data-test="component-step" className="step">
      <h2>{ stepName }</h2>

      <div className="step-content">
        <div className="step-image"><img src={image} /></div>

        <div className="step-instructions">
          <h3>{ heading }</h3>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        </div>
    </div>
  );
}

Step.propTypes = {
  stepName: PropTypes.string,
  heading: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ]),
  image: PropTypes.object,
};

export default Step;
