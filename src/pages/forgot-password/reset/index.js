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

    this.config = null;
  }

  componentDidMount() {
    formUtils.initFormState({
      password: '',
      passwordConfirm: '',
      optin: false,
      privacy: false
    })
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  onSetNewPassword = async () => {
    const { showLoader, hideLoader, t, location: { search, state }, form } = this.props;
    const { values: { password } } = form;

    if(formUtils.validateForm(this.config)) {
      showLoader();

      if(state.acceptRoleToken) {
        AuthService.acceptRoleSetPassword(password, state.acceptRoleToken).then((res) => {
          hideLoader();
          if(res.status === 200) {
              navigate('/dashboard', {
                state: {
                  acceptRoleToken: ''
                }
              });
          } else {
            formUtils.setFormError(t('forgotPassword.reset.form.errors.formFail'));
          }
        })
      }

      AuthService.setNewPassword(password, search).then((res) => {
        hideLoader();
        if(res.status === 200) {
            navigate('/dashboard');
        } else {
          formUtils.setFormError(t('forgotPassword.reset.form.errors.formFail'));
        }
      });
    }
  }

  render() {
    const { t, form } = this.props;
    const { values, errors, showErrorMessage } = form;

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
        valueToCheck: values.password ? values.password : ''
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

          {showErrorMessage &&
            <ErrorBox data-test="create-error-box">
            { errors.form
              ? errors.form
              : t('form.correctErrors')
            }
            </ErrorBox>
          }

            <Form data-test="reset-password-form">
              { formUtils.renderForm(this.config) }
              
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
  location: PropTypes.object,
  form: PropTypes.object
};

export const RawComponent = ResetPassword;

const mapStateToProps = (state) => ({
  form: state.form
})
const actions = { showLoader, hideLoader };

export default connect(mapStateToProps, actions)(withTranslation()(ResetPassword));
