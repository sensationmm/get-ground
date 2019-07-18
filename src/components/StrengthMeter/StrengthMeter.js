import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

import Note from '../_layout/Note/Note';

import './StrengthMeter.scss';

/**
 * StrengthMeter
 * 
 * @param {object} score - for jsdoc
 * @param {string|null} valueToCheck - value to be strength metered
 * @return {JSXElement} StrengthMeter
 */
class StrengthMeter extends Component {

  createLabel = (score) => {
    switch (score) {
      case 4:
        return 'Strong';
      case 3:
        return 'Good';
      case 2:
      case 1:
        return 'Fair';
      case 0:
      default:
        return 'Weak';
    }
  }

  render() {
    const { valueToCheck } = this.props;
    const testedResult = zxcvbn(valueToCheck);

    let score = testedResult.score;
    if(valueToCheck.length > 0) {
      score += 1;
    }

    return (
      <div data-test="component-strength-meter" className="strength-meter">
        <progress
          className={`strength-meter-progress strength-${this.createLabel(score - 1)}`}
          value={score * 5}
          max="25"
        />
        
        <Note>
          <strong>Password strength:</strong> {score > 0 && this.createLabel(score - 1) }
        </Note>
      </div>
    );
  }
}

StrengthMeter.propTypes = {
  valueToCheck: PropTypes.string
};

export default StrengthMeter;