import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link, navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout'
import Button from 'src/components/_buttons/Button/Button';
import Form from 'src/components/_layout/Form/Form';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import formUtils from 'src/utils/form';

import InputText from 'src/components/_form/InputText/InputText';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import authService from 'src/services/Auth';

import './enter-email.scss'
const AuthService = new authService();

/**
 * Enter Email
 * @author Ravin Patel <ravin.patel@getground.co.uk>
 * @return {JSXElement} - EnterEmail
 */
class EnterEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...formUtils.initFormState({
        email: ''
      })
    };

    this.config = [];
  }

  onSendEmailForReset = async () => {
    const { email } = this.state.values;
    const { showLoader, hideLoader, t } = this.props;
    const self = this;

    if(formUtils.validateForm(this)) {
      showLoader();

      return AuthService.resetPassword(email)
      .then((res) => {
        hideLoader();
        if(res.status === 200) {
          navigate('/onboarding/account-pending', {
            state: {
              passwordReset: true,
            }
          });
        } else {
          self.setState({
            ...self.state,
            errors: {
              ...self.state.errors,
              form: t('login.form.error')
            },
            showErrorMessage: true
          });
        }
      });
    }
  }

  render() {
    const { t } = this.props;
    const { values, errors } = this.state;

    this.config = [
      {
        stateKey: 'email',
        component: InputText,
        label: t('login.form.label.email'),
        value: values.email,
        validationFunction: 'validateEmail'
      },
    ];

    return (
      <Layout>
        <div className="enter-email" data-test="container-enter-email" role="account fullscreen">
          <h1 className="enter-email-title">{ t('forgotPassword.title') }</h1>

          {errors.form && <ErrorBox>{errors.form}</ErrorBox>}

            <Form>
              { formUtils.renderForm(this) }
            </Form>

            <Form className="enter-email-actions">
              <Button
                data-test="enter-email-button"
                classes="secondary"
                label={ t('forgotPassword.cta') }
                fullWidth
                onClick={this.onSendEmailForReset}
              />

              <center>
                <Link to="/login">
                  <Button classes="secondary faded" label={ t('forgotPassword.goBack') } small />
                </Link>
              </center>
            </Form>
        </div>
      </Layout>
    );
  }
}

EnterEmail.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  location: PropTypes.object
};

export const RawComponent = EnterEmail;

const actions = { showLoader, hideLoader };

export default connect(null, actions)(withTranslation()(EnterEmail));
