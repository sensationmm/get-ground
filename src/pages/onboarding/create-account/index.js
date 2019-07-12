import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout'
import formUtils from 'src/utils/form';

import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import Form from 'src/components/_layout/Form/Form';
import InputText from 'src/components/_form/InputText/InputText';
import InputPassword from 'src/components/_form/InputPassword/InputPassword';
import Checkbox from 'src/components/_form/Checkbox/Checkbox';
import Button from 'src/components/_buttons/Button/Button';
import StrengthMeter from 'src/components/StrengthMeter/StrengthMeter';
import ModalWrapper from 'src/components/Modal/ModalWrapper';
import ModalContent from 'src/components/Modal/ModalContent';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import { showModal, hideModal } from 'src/state/actions/modal';

import accountService from 'src/services/Account';
export const AccountService = new accountService();
import modalService from 'src/services/Modal';
export const ModalService = new modalService();

import termsImage from 'src/assets/images/documents-modal.svg';

/**
 * CreateAccount
 * @return {JSXElement} CreateAccount
 */
class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalTitle: '',
      modalMarkdown: ''
    };

    this.config = null;
  }

  componentDidMount() {
    formUtils.initFormState({
      email: '',
      password: '',
      passwordConfirm: '',
      optin: false,
      privacy: false
    });
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  createAccount = () => {
    const { showLoader, hideLoader, t, form } = this.props;
    const { values: { email, password, optin }} = form

    if(formUtils.validateForm(this.config)) {
      showLoader();

      AccountService.createAccount(email, password, optin).then(response => {
        hideLoader();
        if(response.status === 201) {
          navigate('/verify_email', {
            state: {
              passwordReset: false,
              email
            }
          });
        } else if(response.status === 500) {
          formUtils.setFormError(t('onBoarding.createAccount.form.errors.duplicateEmail'));
        }
      });
    }
  }

  /**
   * @param {object} e - event passed on openModal (for JSdoc)
   * @param {string} content - modal content to fetch
   * @return {void}
   */
  getModalContent = (e, content) => {
    const { showLoader, hideLoader, showModal } = this.props;
    const self = this;
    e.preventDefault();

    showLoader();

    let target;
    switch(content) {
      case 'privacy':
        target = 'Privacy Policy';
        break;
      case 'terms':
      default:
        target = 'getGround Terms and Conditions';
        break;
    }

    ModalService.fetchModalContent(target).then(response => {
      self.setState({ modalTitle: response.data.title, modalMarkdown: response.data.markdown_text });

      hideLoader();
      showModal();
    });
  }

  render() {
    const { modalTitle, modalMarkdown } = this.state;
    const { t, modalIsOpen, hideModal, form } = this.props;
    const { values, errors, showErrorMessage } = form;

    /* istanbul ignore next */
    this.config = [
      {
        stateKey: 'email',
        component: InputText,
        label: t('onBoarding.createAccount.form.label.email'),
        value: values.email,
        validationFunction: ['validateLettersOnly', 'validateEmail'],
        note: t('onBoarding.createAccount.form.note.email')
      },
      {
        stateKey: 'password',
        component: InputPassword,
        label: t('onBoarding.createAccount.form.label.password'),
        value: values.password,
        validationFunction: ['validateRequired','validateNoSpaces','validateMinimum'],
        validationParam: [null, null, 8],
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
      {
        component: 'br'
      },
      {
        stateKey: 'optin',
        component: Checkbox,
        label: t('onBoarding.createAccount.form.label.optIn'),
        checked: values.optin,
      },
      {
        stateKey: 'privacy',
        component: Checkbox,
        label: <div>
          {t('onBoarding.createAccount.form.label.privacyOne')}
          <a onClick={(e) => {
            e.stopPropagation();
            this.getModalContent(e, 'terms');
          }}>
          {t('onBoarding.createAccount.form.label.privacyTermsLink')}</a>
          {t('onBoarding.createAccount.form.label.privacyTwo')}
          <a onClick={(e) => {
            e.stopPropagation();
            this.getModalContent(e, 'privacy');
          }}>
          {t('onBoarding.createAccount.form.label.privacyPolicyLink')}</a>
        </div>,
        checked: values.privacy,
        validationFunction: 'validateRequired'
      }
    ];

    return (
      <Layout loggedOutOnly>
        <div data-test="container-create-account" className="create-account" role="account form-page">
          <h1>{ t('onBoarding.createAccount.title') }</h1>

          <IntroBox>{ t('onBoarding.createAccount.intro') }</IntroBox>

          {showErrorMessage &&
            <ErrorBox data-test="create-error-box">
            { errors.form
              ? errors.form
              : t('form.correctErrors')
            }
            </ErrorBox>
          }

          <Form>
            {formUtils.renderForm(this.config)}

            <br />

            <Button
              data-test="create-account-button"
              classes="primary"
              label={ t('onBoarding.createAccount.ctaPrimary') }
              fullWidth
              onClick={() => this.createAccount()}
            />
          </Form>

          <ModalWrapper
            transitionBool={modalIsOpen}
            transitionTime={600}
            classes="modal"
          >
            <ModalContent
              heading={modalTitle}
              content={modalMarkdown}
              closeModal={hideModal}
              downloadButtonLabel={t('onBoarding.createAccount.termsModalDownloadButtonLabel')}
              closeIconAltText={t('onBoarding.createAccount.termsModalCloseIconAltText')}
              modalImage={termsImage}
            />
          </ModalWrapper>
        </div>
      </Layout>
    );
  }
}

CreateAccount.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  t: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool,
  form: PropTypes.object
};

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen,
  form: state.form
});

const actions = {
  showLoader,
  hideLoader,
  showModal,
  hideModal
};

export const RawComponent = CreateAccount;

export default connect(mapStateToProps, actions)(withTranslation()(CreateAccount));
