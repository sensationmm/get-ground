/* eslint-disable require-jsdoc */
import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

import formUtils from 'src/utils/form'
import Form from 'src/components/_layout/Form/Form'
import Layout from 'src/components/Layout/Layout'
import List from 'src/components/_layout/List/List'
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup'
import Button from 'src/components/_buttons/Button/Button'
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox'

import { showLoader, hideLoader } from 'src/state/actions/loader'

import './acceptance-of-role.scss'

import accountService from 'src/services/Account'
export const AccountService = new accountService()

import authService from 'src/services/Auth'
export const AuthService = new authService()

export class AcceptanceOfRole extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      companyAddress: {
        lineOfAddress: '93  Dunmow Road',
        town: 'Lanstephan',
        city: 'Launceston',
        postCode: 'PL15 8JN'
      },
      propertyPrice: 14000000,
      shares: 32,
      inviteeName: 'John Smith',
      isDirector: null,
      isExistingUser: null
    };
  }

  componentDidMount() {
    formUtils.initFormState({
      shareholder: null,
      director: null
    });

    const { location, t, showLoader, hideLoader } = this.props;
    showLoader();
    AccountService.retrieveInvestedUser(location.search).then((response) => {
      hideLoader();
      if (response.status === 200) {
        this.setState({
          companyAddress: {
            lineOfAddress: response.property.first_line_of_address,
            town: response.property.town,
            city: response.property.city,
            postCode: response.property.post_code
          },
          propertyPrice: response.price_of_property.amount_in_cents,
          shares: response.num_shares,
          inviteeName: response.invitee_name,
          isDirector: response.is_director,
          isExistingUser: response.is_existing_user
        })
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
    const { t, location, form: { values: { shareholder, director }}} = this.props;

    if ( shareholder === 'no' || director === 'no' ) {
      navigate('/onboarding/acceptance-of-role/decline')
    }

    if (!this.state.isExistingUser ) {
      navigate('/forgot-password/reset', {
        state: {
          acceptRoleToken: location.search
        }
      })
    }


    if (this.state.isExistingUser ) {
      showLoader();
      AuthService.acceptRoleLogin(location.search).then((response) => {
        hideLoader();
        if (response.status === 200) {
          navigate('/dashboard')
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
        hidden: !this.state.isDirector,
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
          <h3 className="acceptance-of-role-content">{`${this.state.inviteeName} ${t('acceptanceOfRole.content')}`}</h3>
          <List>
            <div className="acceptance-of-role-property-address">
              <h3>{t('acceptanceOfRole.property.address')}</h3>
              <p>{this.state.companyAddress.lineOfAddress}</p>
              <p>{this.state.companyAddress.town}</p>
              <p>{this.state.companyAddress.city}</p>
              <p>{this.state.companyAddress.postCode}</p>
            </div>
            <div>
              <h3>{t('acceptanceOfRole.property.price')}</h3>
              <p>{`£${this.state.propertyPrice}`}</p>
            </div>
            <div>
              <h3>{t('acceptanceOfRole.property.shares')}</h3>
              <p>{`${this.state.shares}%`}</p>
            </div>
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
  form: PropTypes.object,
  location: PropTypes.object,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func
}

const mapStateToProps = state => ({
  form: state.form
});

const actions = { showLoader, hideLoader };

export default connect(mapStateToProps, actions)(withTranslation()(AcceptanceOfRole));

