import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link, navigate } from 'gatsby';
import queryString from 'query-string'

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

import 'src/styles/pages/login.scss';

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
        email: '',
        password: ''
      })
    };

    this.config = [];
  }

  onLogin = async () => {
    const { email, password } = this.state.values;
    const { showLoader, hideLoader, t, location: { search } } = this.props;
    const self = this;

    if(formUtils.validateForm(this)) {
      showLoader();

      return AuthService.login(email, password)
      .then((res) => {
        hideLoader();
        if(res.status === 200) {
          const queryStringValues = queryString.parse(search)

          if (queryStringValues.redirect) {
            navigate(queryStringValues.redirect);
          } else {
            navigate('/onboarding/intro');
          }

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
        <div className="account-login" data-test="container-login" role="account fullscreen">
          <h1>{ t('login.title') }</h1>

          {errors.form && <ErrorBox>{errors.form}</ErrorBox>}

            <Form>
              { formUtils.renderForm(this) }
            </Form>

            <Form className="account-login-actions">
              <Button
                data-test="login-button"
                classes="secondary"
                label={ t('login.ctaPrimary') }
                fullWidth
                onClick={this.onLogin}
              />

              <center>
                <Link to="/forgot-password">
                  <Button classes="secondary faded" label={ t('login.ctaSecondary') } small />
                </Link>
              </center>
            </Form>
        </div>
      </Layout>
    );
  }
}

Login.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  location: PropTypes.object
};

export const RawComponent = Login;

const actions = { showLoader, hideLoader };

export default connect(null, actions)(withTranslation()(Login));
