/* eslint-disable require-jsdoc */
import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import formUtils from 'src/utils/form'
import Form from 'src/components/_layout/Form/Form'
import Layout from 'src/components/Layout/Layout'
import List from 'src/components/_layout/List/List'
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup'
import Button from 'src/components/_buttons/Button/Button'
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';

import { showLoader, hideLoader } from 'src/state/actions/loader'

import './acceptance-of-role.scss'

import accountService from 'src/services/Account';
export const AccountService = new accountService();

class AcceptanceOfRole extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      companyAddress: '',
      propertyPrice: 0,
      shares: 0
    };
  }
  componentDidMount() {
    formUtils.initFormState({
      shareholder: null,
      director: null
    });

    const { location } = this.props;

    showLoader();
    AccountService.retrieveInvestedUser(location.search).then((response) => {
      hideLoader();
      if (response.status === 201) {
        console.log(response)
      } else if (response.status === 400) {
        this.setState({
          ...this.state,
          errors: {
            form: t('companyDesign.propertyAddress.form.error')
          },
          showErrorMessage: true
        });
      }
    });
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  submitAnswers = () => {
    const { form: { values: { find_mortgage, find_property_insurance,  find_property_management, find_solicitor }}} = this.props;

    this.props.setAdditionalServices({
      mortgage: find_mortgage === 'yes',
      insurance: find_property_insurance === 'yes',
      management: find_property_management === 'yes',
      solicitor: find_solicitor === 'yes'
    })

    services.addServices(find_mortgage, find_property_insurance, find_property_management, find_solicitor)
  }

  render() {
    const { t, form } = this.props

    const { values } = form

    const config = [
      {
        stateKey: 'shareholder',
        component: RadioGroup,
        groupLabel: t('acceptanceOfRole.question.shareholder'),
        name: 'shareholder',
        items: [
          { value: 'yes', label: t('form.radioConfirm.true') },
          { value: 'no', label: t('form.radioConfirm.false') }
        ],
        value: values.shareholder,
        validationFunction: 'validateRequired',
      },
      {
        stateKey: 'director',
        component: RadioGroup,
        groupLabel: t('acceptanceOfRole.question.director'),
        name: 'director',
        items: [
          { value: 'yes', label: t('form.radioConfirm.true') },
          { value: 'no', label: t('form.radioConfirm.false') }
        ],
        value: values.director,
        validationFunction: 'validateRequired'
      },
      {
        component: Button,
        onClick: () => this.submitAnswers(),
        label: t('acceptanceOfRole.confirmBtn'),
        classes: 'white full',
      },
    ];

    const { showErrorMessage, errors } = form;

    return (
      <Layout>
        <div role="account fullscreen" className="acceptance-of-role">
          <h1>{t('acceptanceOfRole.title')}</h1>
          <h3>{t('acceptanceOfRole.content')}</h3>
          <List>
            <div>
              <h3>{t('acceptanceOfRole.company.address')}</h3>
              <p>COmpany</p>
            </div>
            <div><h3>{t('acceptanceOfRole.company.price')}</h3><p>£</p></div>
            <div><h3>{t('acceptanceOfRole.company.shares')}</h3><p>%</p></div>
          </List>
          {showErrorMessage &&
              <ErrorBox data-test="error-box">
              { errors.form
                ? errors.form
                : t('form.correctErrors')
              }
              </ErrorBox>
            }
          <Form className="acceptance-of-role-form">
            {formUtils.renderForm(config)}
          </Form>

        </div>
      </Layout>
    )
  }
}

AcceptanceOfRole.propTypes = {
  t: PropTypes.func,
  form: PropTypes.object
}

const mapStateToProps = state => ({
  form: state.form
});

const actions = { showLoader, hideLoader };

export default connect(mapStateToProps, actions)(withTranslation()(AcceptanceOfRole));

