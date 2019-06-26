import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { setActiveCompany } from 'src/state/actions/activeCompany';

import ActionConfig from './ActionConfig';

import './action-button.scss';

/**
* ActionButton
* Renders button to respond to action prompt
*
* @param {object} alert - action object, comprising:
*   @param {string} type - type of action
*   @param {number} companyID - company action relates to
*/

const ActionButton = (props) => {
  const { t, alert } = props;

  const { labelShort, action } = ActionConfig(alert);

  return (
    <div data-test="component-action-button" className="action-button" onClick={action}>
      {t(labelShort)}
    </div>
  );
};

ActionButton.propTypes = {
  t: PropTypes.func.isRequired,
  alert: PropTypes.shape({
    type: PropTypes.string.isRequired,
    companyID: PropTypes.number
  })
};

const actions = {
  setActiveCompany
};

export const RawComponent = ActionButton;

export default connect(null, actions)(withTranslation()(ActionButton));
