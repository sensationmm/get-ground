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

import InputText from 'src/components/_form/InputText/InputText';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import authService from 'src/services/Auth';

import './enter-email.scss'

export const AuthService = new authService();

/**
 * Enter Email
 * @author Ravin Patel <ravin.patel@getground.co.uk>
 * @return {JSXElement} - EnterEmail
 */
class EnterEmail extends Component {
  constructor(props) {
    super(props);

    this.config = null;
  }

  componentDidMount() {
    formUtils.initFormState({
      email: ''
    })
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  onSendEmailForReset = async () => {
    const { showLoader, hideLoader, t, form } = this.props;
    const { values: { email } } = form;

    if(formUtils.validateForm(this.config)) {
      showLoader();

      return AuthService.requestResetPassword(email).then((res) => {
        hideLoader();
        if(res.status === 200) {
          navigate('/verify_email', {
            state: {
              passwordReset: true,
            }
          });
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

          {showErrorMessage &&
            <ErrorBox data-test="create-error-box">
            { errors.form
              ? errors.form
              : t('form.correctErrors')
            }
            </ErrorBox>
          }

            <Form>
              { formUtils.renderForm(this.config) }
            </Form>

            <Form className="enter-email-actions" data-test="reset-password-form">
              <Button
                data-test="enter-email-button"
                classes="secondary"
                label={ t('forgotPassword.cta') }
                fullWidth
                onClick={this.onSendEmailForReset}
              />

              <center>
                <Button classes="secondary faded" label={ t('forgotPassword.goBack') } small onClick={() => navigate('/login')} />
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
  location: PropTypes.object,
  form: PropTypes.object
};

export const RawComponent = EnterEmail;

const mapStateToProps = (state) => ({
  form: state.form
});

const actions = { showLoader, hideLoader };

export default connect(mapStateToProps, actions)(withTranslation()(EnterEmail));
