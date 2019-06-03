import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import Layout from 'src/components/Layout/Layout'
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import ContactUs from 'src/components/ContactUs/ContactUs'
import InputText from 'src/components/_form/InputText/InputText';
import Button from 'src/components/_buttons/Button/Button';
import formUtils from 'src/utils/form';
import Form from 'src/components/_layout/Form/Form';
import partners from 'src/services/Partners';
export const PartnerService = new partners();

import ShakingHands from 'src/assets/images/shaking-hands.svg'

import 'src/styles/pages/partnerships.scss'

/**
 * Partnerships
 * @author Ravin Patel <ravin.patel@getground.co.uk>
 * @param {boolean} showErrorMessage - errors from form
 * @param {Array} errors - error messages
 * @param {boolean} sentEmail - email successfully sent
 * @param {function} t - i18next function for translating
 * @return {JSXElement} - Partnerships
 */
class Partnerships extends Component {
  constructor(props) {
    super(props);

    this.config = null;

    this.state = {
      sentEmail: false
    }
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

      return PartnerService.sendEmail(email).then((res) => {
        hideLoader();
        if(res.status === 200) {
          this.setState({ sentEmail: true })
        } else {
          formUtils.setFormError(t('partnerships.form.error'));
        }
      });
    }
  }

  formResponseBox = (showErrorMessage, errors, sentEmail, t) => {
    if ( showErrorMessage ) {
      return (
      <ErrorBox data-test="create-error-box">{ errors.form ? errors.form : t('form.correctErrors') }</ErrorBox>
      )
    }

    if ( sentEmail ) {
      return (
        <IntroBox data-test="intro-box">{ t(`partnerships.form.success`) }</IntroBox>
      )
    }

    return;
  }

  render() {
    const { t, form } = this.props;
    const { values, errors, showErrorMessage } = form;

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
          {this.formResponseBox(showErrorMessage, errors, this.state.sentEmail, t)}
          <Form data-test="partnership-form">
            { formUtils.renderForm(this.config) }
          </Form>

          <Form className="enter-email-actions" data-test="partnership-form">
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

const actions = {
  showLoader,
  hideLoader
};

export default connect(mapStateToProps, actions)(withTranslation()(Partnerships));

