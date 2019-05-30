import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import Layout from 'src/components/Layout/Layout'
import ContactUs from 'src/components/ContactUs/ContactUs'
import InputText from 'src/components/_form/InputText/InputText';
import Button from 'src/components/_buttons/Button/Button';
import formUtils from 'src/utils/form';
import Form from 'src/components/_layout/Form/Form';
import ImageFull from 'src/components/ImageFull/ImageFull'

import ShakingHands from 'src/assets/images/shaking-hands.svg'

import 'src/styles/pages/partnerships.scss'

/**
 * Enter Email
 * @author Ravin Patel <ravin.patel@getground.co.uk>
 * @return {JSXElement} - EnterEmail
 */
class Partnerships extends Component {
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

  onSendEmail = async () => {
    const { showLoader, hideLoader, t, form } = this.props;
    const { values: { email } } = form;

    if(formUtils.validateForm(this.config)) {
      showLoader();

      return AuthService.requestResetPassword(email).then((res) => {
        hideLoader();
        if(res.status === 200) {
          navigate('/onboarding/account-pending', {
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
    const { values } = form;

    this.config = [
      {
        stateKey: 'email',
        component: InputText,
        label: t('partnerships.input.title'),
        value: values.email,
        validationFunction: 'validateEmail'
      },
    ];

    return (
      <Layout>
        <div className="partnerships">
          <img className="partnerships-img" src={ShakingHands} alt="shaking-hands" data-test="partnerships-img" />
          <h1 className="partnerships-title">Partnerships</h1>
          <p className="partnerships-content">Interested in selling GetGround and earning a commission? We work with partners such as estate agents, mortgage brokers and property developers. If you’d like to know more, enter your email and we’ll be in touch.</p>
          <p className="partnerships-content">If you’d like to know more, enter your email and we’ll be in touch.</p>

            <Form>
              { formUtils.renderForm(this.config) }
            </Form>

            <Form className="enter-email-actions" data-test="reset-password-form">
            <Button
                data-test="enter-email-button"
                classes="primary"
                label={ t('partnerships.cta') }
                fullWidth
                onClick={this.onSendEmail}
              />
              <br/>
            </Form>
            <ContactUs />
        </div>
      </Layout>
    );
  }
}

Partnerships.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  location: PropTypes.object,
  form: PropTypes.object
};

export const RawComponent = Partnerships;

const mapStateToProps = (state) => ({
  form: state.form
});

export default connect(mapStateToProps, null)(withTranslation()(Partnerships));

