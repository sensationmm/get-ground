import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { setActiveCompany } from 'src/state/actions/activeCompany';

import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';
import ActionConfig from './ActionConfig';

import './action-box.scss';

/**
* ActionBox
* Renders collection of alerts
*
* @param {array} actions - list of current required actions, comprising:
*   @param {string} type - type of action
*   @param {string} companyID - company action relates to
*   @param {boolean} dismissable - whether action has a dismiss button
* @return {JSXElement} ActionBox
*/
class ActionBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: this.props.actions,
      currentAction: 0
    };

    this.dismissAction = this.dismissAction.bind(this);
  }

  dismissAction() {
    const { currentAction } = this.state;

    this.setState({
      currentAction: currentAction + 1
    })
  }

  renderAction = () => {
    const { t } = this.props;
    const { currentAction, actions } = this.state;

    const alert = actions[currentAction];

    const { label, cta, action } = ActionConfig(alert);

    return (
      <div className="action-box-action">
        <p>{t(label)}</p>

        <div className={classNames('action-box-buttons', { single: alert.dismissable === false})}>
          {alert.dismissable !== false && <ButtonHeader label={ t('actionBox.dismiss')} onClick={this.dismissAction} />}
          <ButtonHeader label={t(cta)} onClick={action} />
        </div>
      </div>
    );
  }

  render() {
    const { t } = this.props;
    const { currentAction, actions } = this.state;

    return (
      <div
        data-test="component-action-box"
        className={classNames(
          'action-box',
          {actions: actions && actions.length > 0 && currentAction < actions.length}
        )}
      >
        <div className="action-box-header">{ t('actionBox.title') }</div>

        { (currentAction >= actions.length) && 
          <div className="action-box-action">
            <div>{t('actionBox.noActions')}</div>
            <div></div> 
          </div>
        }
        
        {currentAction < actions.length && this.renderAction()}
      </div>
    );
  }
}

ActionBox.propTypes = {
  t: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      companyID: PropTypes.string,
      dismissable: PropTypes.bool
    })
  ),
  setActiveCompany: PropTypes.func
};

const actions = {
  setActiveCompany
};

export const RawComponent = ActionBox;

export default connect(null, actions)(withTranslation()(ActionBox));
