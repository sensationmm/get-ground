import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { navigate } from 'gatsby';
import PropTypes from 'prop-types'

import formUtils from 'src/utils/form'
import Form from 'src/components/_layout/Form/Form'
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup'
import Button from 'src/components/_buttons/Button/Button'
import Layout from 'src/components/Layout/Layout'
import IntroBox from 'src/components/_layout/IntroBox/IntroBox'

import { setAdditionalServices } from 'src/state/actions/additionalServices'

import './add-services.scss'

import additionalServices from 'src/services/AdditionalServices'

const services = new additionalServices();

/**
 * AdditionalServices
 * @return {ReactComponent} AdditionalServices
 */
export class AdditionalServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...formUtils.initFormState({
        find_mortgage: null,
        find_property_insurance: null,
        find_property_management: null,
      }),
    };

    this.config = [];
  }


  componentWillUnmount() {
    const { values } = this.state;
    const {find_mortgage, find_property_insurance,  find_property_management} = values;

    this.props.setAdditionalServices({
      mortgage: find_mortgage === 'yes',
      insurance: find_property_insurance === 'yes',
      management: find_property_management === 'yes'
    })

    services.addServices(find_mortgage, find_property_insurance, find_property_management )
  }

  render() {
    const { t } = this.props
    const { values } = this.state;
    this.config = [
      {
        stateKey: 'find_mortgage',
        component: RadioGroup,
        groupLabel: t('additionalServices.mortgageOptionsQuestion'),
        name: 'find_mortgage',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.find_mortgage,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
      },
      {
        stateKey: 'find_property_insurance',
        component: RadioGroup,
        groupLabel: t('additionalServices.propertyInsuranceQuestion'),
        name: 'find_property_insurance',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.find_property_insurance,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
      },
      {
        stateKey: 'find_property_management',
        component: RadioGroup,
        groupLabel: t('additionalServices.property_managementQuestion'),
        name: 'find_property_management',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.find_property_management,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
      },
      {
        component: Button,
        onClick: () => navigate('/company-design'),
        label: t('additionalServices.nextButton'),
        classes: 'primary full',
      },
      {
        component: Button,
        onClick: () => navigate('/company-design/shareholder-details'),
        label: t('additionalServices.backButton'),
        classes: 'secondary full',
      },
      {
        component: Button,
        onClick: () => navigate('/company-design'),
        label: t('additionalServices.skipButton'),
        classes: 'link small full',
      },
    ];

    return (
      <Layout>
        <div className="add-services" role="company-design">
        <h1 className="add-services-title">{t('additionalServices.title')}</h1>
        <IntroBox>{t('additionalServices.introBox')}</IntroBox>
          <Form className="add-services-form">
            {formUtils.renderForm(this)}
          </Form>
        </div>
      </Layout>
    )
  }
}

AdditionalServices.propTypes = {
  setAdditionalServices: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

const actions = {
  setAdditionalServices
}

export default connect(null, actions)(withTranslation()(AdditionalServices))
