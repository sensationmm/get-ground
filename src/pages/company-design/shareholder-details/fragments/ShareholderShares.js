import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import formUtils from 'src/utils/form';

import InputNumber from 'src/components/_form/InputNumber/InputNumber';
import Checkbox from 'src/components/_form/Checkbox/Checkbox';

import './shareholder-shares.scss';

/**
 * ShareholderShares
 * @return {JSXElement} ShareholderShares
 */
class ShareholderShares extends Component {
  constructor(props) {
    super(props);

    this.config = null;
  }

  componentDidMount() {
    const { onRef } = this.props;

    onRef && onRef(this);
  }

  componentWillUnmount() {
    const { onRef } = this.props;

    onRef && onRef(undefined);
  }

  validate = () => {
    return formUtils.validateForm(this.config, this.props.shareholderID);
  }

  render() {
    const { shareholderID, name, email, shares, is_director, onChange, totalShares, mainShareholder, disabled } = this.props;

    this.config = [
      {
        stateKey: 'allocated_shares',
        component: InputNumber,
        value: shares,
        validationFunction: ['validateRequired','validateTotal'],
        validationParam: [null, { total: totalShares, maxValue: 100 }],
        onChange: /* istanbul ignore next */(val) => onChange(shareholderID, 'allocated_shares', val),
        readOnly: disabled
      },
      {
        stateKey: 'is_director',
        component: Checkbox,
        checked: is_director,
        onChange: /* istanbul ignore next */() => onChange(shareholderID, 'is_director', !is_director)
      },
    ];

    return (
      <div data-test="fragment-shareholder-share" className={classNames('shareholder-shares', { 'main-shareholder': mainShareholder })}>
        <div className="shareholder-shares-person">
          <div className="shareholder-shares-name">{name}</div>
          <div className="shareholder-shares-email">{email}</div>
        </div>
        {formUtils.renderForm(this.config, shareholderID)}
      </div>
    )
  }
}

ShareholderShares.propTypes = {
  t: PropTypes.func,
  shareholderID: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  shares: PropTypes.number,
  totalShares: PropTypes.number,
  is_director: PropTypes.bool,
  mainShareholder: PropTypes.bool,
  onRef: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

export const RawComponent = ShareholderShares;

export default withTranslation()(ShareholderShares);
