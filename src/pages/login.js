import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link, navigate } from 'gatsby';
import queryString from 'query-string';

import Layout from 'src/components/Layout/Layout'
import Button from 'src/components/_buttons/Button/Button';
import Form from 'src/components/_layout/Form/Form';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import formUtils from 'src/utils/form';

import InputText from 'src/components/_form/InputText/InputText';
import InputPassword from 'src/components/_form/InputPassword/InputPassword';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import authService from 'src/services/Auth';
export const AuthService = new authService();

import 'src/styles/pages/login.scss';

/**
 * Login
 * @author Kevin Reynolds <kevin.reynolds@somoglobal.com>
 * @return {JSXElement} - Login
 */
class Login extends Component {
  constructor(props) {
    super(props);

    this.config = null;
  }

  componentDidMount = () => {
    formUtils.initFormState({
      email: '',
      password: ''
    });
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  onLogin = async () => {
    const { showLoader, hideLoader, t, location: { search }, form, last_page_visited } = this.props;
    const { values: { email, password }} = form;

    if(formUtils.validateForm(this.config)) {
      showLoader();

      return AuthService.login(email, password)
      .then((res) => {
        hideLoader();
        if(res.status === 200) {
          const queryStringValues = queryString.parse(search)

          if (queryStringValues.redirect) {
            navigate(queryStringValues.redirect);
          } else {
            if (last_page_visited === 'dashboard') {
              navigate('/dashboard');
            } else {
              navigate('/onboarding');
            }
          }

        } else {
          switch(res.data.error) {
            case 'Please verify your email.':
              formUtils.setFormError(t('login.form.errorVerify'));
              break;
            case 'Invalid password':
              formUtils.setFormError(t('login.form.errorPassword'));
              break;
            case 'User not found':
              formUtils.setFormError(t('login.form.errorUser'));
              break;
            default:
              formUtils.setFormError(t('login.form.error'));
              break;
          }
        }
      });
    }
  }

  /**
   * enterSubmit
   * @param {event} e - event object
   * @return {void}
   */
  enterSubmit = (e) => {
    if(e.key === 'Enter') {
      this.onLogin();
    }
  }

  render() {
    const { form: { values, errors, showErrorMessage }, t } = this.props;

    this.config = [
      {
        stateKey: 'email',
        component: InputText,
        label: t('login.form.label.email'),
        value: values.email,
        validationFunction: ['validateRequired','validateEmail'],
        onKeyPress: this.enterSubmit
      },
      {
        stateKey: 'password',
        component: InputPassword,
        label: t('login.form.label.password'),
        value: values.password,
        validationFunction: 'validateRequired',
        onKeyPress: this.enterSubmit
      }
    ];

    return (
      <Layout loggedOutOnly>
        <div className="account-login" data-test="container-login" role="account fullscreen hasCurve">
          <h1>{ t('login.title') }</h1>

          {showErrorMessage && errors.form && <ErrorBox data-test="create-error-box">{errors.form}</ErrorBox>}

          <Form>
            { formUtils.renderForm(this.config) }
          </Form>

          <br />

          <Form className="account-login-actions">
            <Button
              data-test="login-button"
              label={ t('login.ctaPrimary') }
              fullWidth
              onClick={() => this.onLogin()}
            />

            <center>
              <Link to="/forgot-password/enter-email">
                <Button classes="faded" label={ t('login.ctaSecondary') } small />
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
  location: PropTypes.object,
  form: PropTypes.object,
  last_page_visited: PropTypes.string
};

const mapStateToProps = state => ({
  form: state.form,
  last_page_visited: state.user.last_page_visited
});

export const RawComponent = Login;

const actions = { showLoader, hideLoader };

export default connect(mapStateToProps, actions)(withTranslation()(Login));
