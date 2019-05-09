import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { navigate } from '@reach/router';

import Layout from 'src/components/Layout/Layout'
import Button from 'src/components/_buttons/Button/Button';
import Form from 'src/components/_layout/Form/Form';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import formUtils from 'src/utils/form';

import InputText from 'src/components/_form/InputText/InputText';
import InputPassword from 'src/components/_form/InputPassword/InputPassword';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import authService from 'src/services/Auth';
const AuthService = new authService();

/**
 * Login
 * @author Kevin Reynolds <kevin.reynolds@somoglobal.com>
 * @return {JSXElement} - Login
 */
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...formUtils.initFormState({
        email: 'kevin.reynolds@getground.co.uk',
        password: 'asprilla'
      })
    };

    this.config = [];
  }

  onLogin = async () => {
    const { email, password } = this.state.values;
    const { showLoader, hideLoader, t } = this.props;
    const self = this;

    showLoader();

    return AuthService.login(email, password)
    .then((res) => {
      hideLoader();
      if(res.status === 200) {
        navigate('/onboarding-intro');
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
      {
        stateKey: 'password',
        component: InputPassword,
        label: t('login.form.label.password'),
        value: values.password,
        validationFunction: 'validateRequired'
      }
    ];

    return (
      <Layout>
        <div data-test="container-login" role="account fullscreen">
          <h1>Login</h1>

          {errors.form && <ErrorBox>{errors.form}</ErrorBox>}

          <Form>
          { formUtils.renderForm(this) }

            <Button
              data-test="login-button"
              classes="secondary"
              label={ t('login.ctaPrimary') }
              fullWidth
              onClick={this.onLogin}
            />

            <Button classes="secondary" label={ t('login.ctaSecondary') } small />
          </Form>
        </div>
      </Layout>
    );
  }
}

Login.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired
};

export const RawComponent = Login;

const actions = { showLoader, hideLoader };

export default connect(null, actions)(withTranslation()(Login));
