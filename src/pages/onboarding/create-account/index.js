import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
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
import Modal from 'src/components/Modal/Modal';
import ModalContent from 'src/components/Modal/ModalContent';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import { showModal, hideModal } from 'src/state/actions/modal';

import accountService from 'src/services/Account';
export const AccountService = new accountService();
import modalService from 'src/services/Modal';
export const ModalService = new modalService();

import termsImage from 'src/assets/images/terms-image.svg';

/**
 * CreateAccount
 * @param {object} e - event passed on openModal (for JSdoc)
 * @return {JSXElement} CreateAccount
 */
class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...formUtils.initFormState({
        email: '',
        password: '',
        passwordConfirm: '',
        optin: false,
        privacy: false
      }),
      termsMarkdown: ''
    };

    this.config = [];
  }

  createAccount = () => {
    const { showLoader, hideLoader, t } = this.props;
    const { email, password, optin } = this.state.values;
    const self = this;

    if(formUtils.validateForm(this)) {
      showLoader();

      AccountService.createAccount(email, password, optin).then(response => {
        hideLoader();
        if(response.status === 201) {
          navigate('/onboarding/account-pending');
        } else if(response.status === 500) {
          self.setState({
            ...self.state,
            errors: {
              form: t('onBoarding.createAccount.form.errors.duplicateEmail')
            },
            showErrorMessage: true
          });
        }
      });
    }
  }

  getModalContent = (e) => {
    const { showLoader, hideLoader, showModal } = this.props;
    const self = this;
    e.preventDefault();

    showLoader();

    ModalService.fetchModalContent('getGround Terms and Conditions').then(response => {
      self.setState({ termsMarkdown: response.data.markdown_text });
      
      hideLoader();
      showModal();
    });
  }

  render() {
    const { values, errors, showErrorMessage, termsMarkdown } = this.state;
    const { t, modalIsOpen, showModal, hideModal } = this.props;

    /* istanbul ignore next */
    this.config = [
      {
        stateKey: 'email',
        component: InputText,
        label: t('onBoarding.createAccount.form.label.email'),
        value: values.email,
        validationFunction: 'validateEmail',
        note: t('onBoarding.createAccount.form.note.email')
      },
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
            if (termsMarkdown === '') {
              this.getModalContent(e)
            } else {
              showModal();
            }
          }}>
          {t('onBoarding.createAccount.form.label.privacyTermsLink')}</a>
          {t('onBoarding.createAccount.form.label.privacyTwo')}
          {t('onBoarding.createAccount.form.label.privacyPolicyLink')}
        </div>,
        checked: values.privacy,
        validationFunction: 'validateRequired'
      }
    ];
    
    return (
      <Layout>
        <div data-test="container-create-account" className="create-account" role="account">
          <h1>{ t('onBoarding.createAccount.title') }</h1>

          <IntroBox>{ t('onBoarding.createAccount.intro') }</IntroBox>

          {showErrorMessage &&
            <ErrorBox>
            { errors.form
              ? errors.form
              : t('form.correctErrors')
            }
            </ErrorBox>
          }

          <Form>
            {formUtils.renderForm(this)}

            <br />

            <Button
              data-test="create-account-button"
              classes="primary"
              label={ t('onBoarding.createAccount.ctaPrimary') }
              fullWidth
              onClick={this.createAccount}
            />

            <Button classes="secondary" label={ t('onBoarding.createAccount.ctaSecondary') } fullWidth />
          </Form>
          <CSSTransition
            in={modalIsOpen}
            timeout={600}
            classNames="modal"
            unmountOnExit
          >
            <Modal>
              <ModalContent 
                heading={t('onBoarding.createAccount.termsModalHeading')}
                content={termsMarkdown}
                closeModal={hideModal} 
                downloadButtonLabel={t('onBoarding.createAccount.termsModalDownloadButtonLabel')}
                closeIconAltText={t('onBoarding.createAccount.termsModalCloseIconAltText')}
                modalImage={termsImage}
              />
            </Modal>
          </CSSTransition>
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
  modalIsOpen: PropTypes.bool
};

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen
});

const actions = { 
  showLoader, 
  hideLoader ,
  showModal,
  hideModal
};

export const RawComponent = CreateAccount;

export default connect(mapStateToProps, actions)(withTranslation()(CreateAccount));
