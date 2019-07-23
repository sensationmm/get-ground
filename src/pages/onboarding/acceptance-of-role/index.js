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
import Modal from './modal/index'

import { formatCurrency } from 'src/utils/functions';

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
        lineOfAddress: '',
        town: '',
        city: '',
        postCode: ''
      },
      propertyPrice: 0,
      shares: 0,
      inviteeName: '',
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
    const token = location.search.split('=')[1];

    AccountService.retrieveInvestedUser(token).then((response) => {
      const { data: { property_purchase: { property_address: { address }, purchase_details, shareholder_details }, shareholder_detail } } = response;
      hideLoader();
      if (response.status === 200) {
        this.setState({
          companyAddress: {
            lineOfAddress: `${address.premise} ${address.street}`,
            town: address.posttown,
            city: address.city,
            postCode: address.postcode
          },
          propertyPrice: purchase_details.price.amount_in_cents,
          shares: shareholder_detail.allocated_shares,
          inviteeName: `${shareholder_details.collection[0].first_name} ${shareholder_details.collection[0].last_name}`,
          isDirector: shareholder_detail.is_director,
          isExistingUser: shareholder_detail.is_existing_user
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
    const { inviteeName, isExistingUser } = this.state;
    const token = location.search.split('=')[1];

    if ( shareholder === 'no' || director === 'no' ) {
      return navigate('/onboarding/acceptance-of-role/decline', {
        state: {
          inviteeName: inviteeName
        }
      })
    }

    if (!isExistingUser ) {
      return navigate('/forgot-password/reset',
        {
          state: { acceptRoleToken: token}
        }
      )
    }


    if (isExistingUser ) {
      showLoader();
      AuthService.acceptRoleLogin(token).then((response) => {
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
          { value: 'Yes', label: t('form.radioConfirm.true') },
          { value: 'No', label: t('form.radioConfirm.false') }
        ],
        value: values.shareholder,
        validationFunction: 'validateRequired',
      },
      {
        component: Modal,
        name: 'shareholder Modal',
        content: 'being a shareholder',
        isShareholder: true
      },
      {
        stateKey: 'director',
        component: RadioGroup,
        groupLabel: t('acceptanceOfRole.question.director'),
        name: 'director',
        items: [
          { value: 'Yes', label: t('form.radioConfirm.true') },
          { value: 'No', label: t('form.radioConfirm.false') }
        ],
        value: values.director,
        hidden: !this.state.isDirector,
        validationFunction: 'validateRequired'
      },
      {
        component: Modal,
        name: 'director Modal',
        content: 'being a director',
        isShareholder: false,
        hidden: !this.state.isDirector,
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
        <div role="account fullscreen form-page" className="acceptance-of-role">
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
              <p>{`£${formatCurrency(this.state.propertyPrice)}`}</p>
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

