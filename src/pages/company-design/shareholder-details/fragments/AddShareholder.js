import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import formUtils from 'src/utils/form';

import Form from 'src/components/_layout/Form/Form';
import InputText from 'src/components/_form/InputText/InputText';

/**
 * AddShareholder
 * @return {JSXElement} AddShareholder
 */
class AddShareholder extends Component {
  constructor(props) {
    super(props);

    this.config = null;
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  validate = () => {
    return formUtils.validateForm(this.config, this.props.shareholderID);
  }

  render() {
    const { t, shareholderID, onChange, first_name, last_name, email } = this.props;

    this.config = [
      {
        stateKey: 'first_name',
        component: InputText,
        label: t('companyDesign.shareholderDetails.add.new.form.firstName'),
        value: first_name,
        validationFunction: 'validateRequired',
        onChange: /* istanbul ignore next */(val) => onChange(shareholderID, 'first_name', val),
      },
      {
        stateKey: 'last_name',
        component: InputText,
        label: t('companyDesign.shareholderDetails.add.new.form.lastName'),
        value: last_name,
        validationFunction: 'validateRequired',
        onChange: /* istanbul ignore next */(val) => onChange(shareholderID, 'last_name', val),
      },
      {
        stateKey: 'email',
        component: InputText,
        label: t('companyDesign.shareholderDetails.add.new.form.email'),
        value: email,
        validationFunction: 'validateEmail',
        onChange: /* istanbul ignore next */(val) => onChange(shareholderID, 'email', val),
      }
    ];

    return (
      <div data-test="component-add-shareholder" className="shareholder-detail" role="company-design">
        <h2>{t('companyDesign.shareholderDetails.add.new.title')}</h2>
        <Form>{formUtils.renderForm(this.config, shareholderID)}</Form>
      </div>
    )
  }
}

AddShareholder.propTypes = {
  shareholderID: PropTypes.number,
  t: PropTypes.func,
  updateShareholder: PropTypes.func,
  onRef: PropTypes.func,
  onChange: PropTypes.func,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string
}

export const RawComponent = AddShareholder;

export default withTranslation()(AddShareholder);
