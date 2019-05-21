import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout'
import Button from 'src/components/_buttons/Button/Button';
import Form from 'src/components/_layout/Form/Form';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import formUtils from 'src/utils/form';

import StrengthMeter from 'src/components/StrengthMeter/StrengthMeter';
import InputPassword from 'src/components/_form/InputPassword/InputPassword';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import './reset-password.scss'

import authService from 'src/services/Auth';
export const AuthService = new authService();

/**
 * Reset Password
 * @author Ravin Patel <ravin.patel@getground.co.uk>
 * @return {JSXElement} - ResetPassword
 */
class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...formUtils.initFormState({
        password: '',
        passwordConfirm: '',
        optin: false,
        privacy: false
      })
    };

    this.config = [];
  }

  onSetNewPassword = async () => {
    const { password } = this.state.values;
    const { showLoader, hideLoader, t, location: { search } } = this.props;
    const self = this;

    if(formUtils.validateForm(this)) {
      showLoader();

      return AuthService.setNewPassword(password, search)
      .then((res) => {
        hideLoader();
        if(res.status === 200) {
            navigate('/login');
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
        stateKey: 'password',
        component: InputPassword,
        label: t('onBoarding.createAccount.form.label.password'),
        value: values.password,
        validationFunction: 'validateRequired',
        note: t('onBoarding.createAccount.form.note.password')
      },
      {
        component: StrengthMeter,
        valueToCheck: values.password
      },
      {
        stateKey: 'passwordConfirm',
        component: InputPassword,
        label: t('onBoarding.createAccount.form.label.passwordConfirm'),
        value: values.passwordConfirm,
        validationFunction: 'validateMatching',
        validationParam: values.password
      },
    ];

    return (
      <Layout>
        <div className="reset-password" data-test="container-reset-password" role="account fullscreen">
          <h1 className="reset-password-title">{ t('forgotPassword.reset.title') }</h1>

          {errors.form && <ErrorBox data-test="reset-password-error">{errors.form}</ErrorBox>}

            <Form data-test="reset-password-form">
              { formUtils.renderForm(this) }
              <Button
                data-test="reset-password-button"
                classes="secondary"
                label={ t('forgotPassword.reset.setPasswordButton') }
                fullWidth
                onClick={this.onSetNewPassword}
              />
            </Form>
        </div>
      </Layout>
    );
  }
}

ResetPassword.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  location: PropTypes.object
};

export const RawComponent = ResetPassword;

const actions = { showLoader, hideLoader };

export default connect(null, actions)(withTranslation()(ResetPassword));
