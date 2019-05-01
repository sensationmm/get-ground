import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

import Note from '../_layout/Note/Note';

import './StrengthMeter.css';

/**
 * StrengthMeter
 * 
 * @param {object} result - for jsdoc
 * @param {string|null} valueToCheck - value to be strength metered
 * @return {JSXElement} StrengthMeter
 */
class StrengthMeter extends Component {

  createLabel = (result) => {
    switch (result.score) {
      case 4:
        return 'Strong';
      case 3:
        return 'Good';
      case 2:
        return 'Fair';
      case 1:
      case 0:
      default:
        return 'Weak';
    }
  }

  render() {
    const { valueToCheck } = this.props;
    const testedResult = zxcvbn(valueToCheck);
    return (
      <div data-test="component-strength-meter" className="strength-meter">
        <progress
          className={`strength-meter-progress strength-${this.createLabel(testedResult)}`}
          value={testedResult.score}
          max="4"
        />
        
        <Note>
          <strong>Password strength:</strong> {this.createLabel(testedResult)}
        </Note>
      </div>
    );
  }
}

StrengthMeter.propTypes = {
  valueToCheck: PropTypes.string
};

export default StrengthMeter;