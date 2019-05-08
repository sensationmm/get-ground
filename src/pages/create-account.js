import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';

import Layout from '../components/Layout/Layout'
import formUtils from '../utils/form';

import IntroBox from '../components/_layout/IntroBox/IntroBox';
import ErrorBox from '../components/_layout/ErrorBox/ErrorBox';
import Form from '../components/_layout/Form/Form';
import InputText from '../components/_form/InputText/InputText';
import InputPassword from '../components/_form/InputPassword/InputPassword';
import Checkbox from '../components/_form/Checkbox/Checkbox';
import Button from '../components/_buttons/Button/Button';
import StrengthMeter from '../components/StrengthMeter/StrengthMeter';
import Modal from '../components/Modal/Modal';
import ModalContent from '../components/Modal/ModalContent';

import { showLoader, hideLoader } from '../state/actions/loader';
import { showModal, hideModal } from '../state/actions/modal';

import ModalServices from 'src/services/Modal';
const { fetchModalContent } = ModalServices;

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

  createAccount = /* istanbul ignore next */ () => {
    var requestUrl = 'https://staging-backend-236514.appspot.com/api/v1/users';

    const { showLoader, hideLoader } = this.props;
    const { email, password, optin } = this.state.values;
    const self = this;

    if(formUtils.validateForm(this)) {
      showLoader();

      axios({
        method: 'post',
        url: requestUrl,
        headers: {
          'Authorization': 'avb068cbk2os5ujhodmt',
          'Content-Type': 'application/json',
        },
        data: {
          'email': email,
          'password': password,
          'receives_marketing': optin
        }
      }).then(function(response) {
        if(response.status === 201) {
          self.props.history.push('/account-pending');
          hideLoader();
        }
      }).catch((e) => {
        hideLoader();

        self.setState({
          ...this.state,
          errors: {
            form: 'Email address already exists'
          },
          showErrorMessage: true
        });
      });
    }
  }

  getModalContent = e => {
    const { showLoader, hideLoader } = this.props;
    e.preventDefault();

    showLoader();
    return fetchModalContent().then(response => {
      this.setState({ termsMarkdown: response[19].markdown_text });
      
      hideLoader();
      this.openModal();
    }).catch(() => {
      hideLoader();
    });
  }

  openModal = () => this.props.showModal();

  closeModal = () => this.props.hideModal();

  render() {
    const { values, errors, showErrorMessage, termsMarkdown } = this.state;
    const { t, modal: { isOpen } } = this.props;
    // @TODO can this be moved out of render - fails on edit field currently

    this.config = [
      {
        stateKey: 'email',
        component: InputText,
        label: t('createAccount.form.label.email'),
        value: values.email,
        validationFunction: 'validateEmail',
        note: t('createAccount.form.note.email')
      },
      {
        stateKey: 'password',
        component: InputPassword,
        label: t('createAccount.form.label.password'),
        value: values.password,
        validationFunction: 'validateRequired',
        note: t('createAccount.form.note.password')
      },
      {
        component: StrengthMeter,
        valueToCheck: values.password
      },
      {
        stateKey: 'passwordConfirm',
        component: InputPassword,
        label: t('createAccount.form.label.passwordConfirm'),
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
        label: t('createAccount.form.label.optIn'),
        checked: values.optin,
      },
      {
        stateKey: 'privacy',
        component: Checkbox,
        label: <div>
          {t('createAccount.form.label.privacyOne')}
          <a onClick={(e) => { 
            if (termsMarkdown === '') {
              this.getModalContent(e)
            } else {
              this.openModal();
            }
          }}>
          {t('createAccount.form.label.privacyTermsLink')}</a>
          {t('createAccount.form.label.privacyTwo')}
          {t('createAccount.form.label.privacyPolicyLink')}
        </div>,
        checked: values.privacy,
        validationFunction: 'validateRequired'
      }
    ];
    
    return (
      <Layout>
        <div data-test="container-create-account" className="create-account" role="account">
          <h1>{ t('createAccount.title') }</h1>

          <IntroBox>{ t('createAccount.intro') }</IntroBox>

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
              label={ t('createAccount.ctaPrimary') }
              fullWidth
              onClick={this.createAccount}
            />

            <Button classes="secondary" label={ t('createAccount.ctaSecondary') } fullWidth />
          </Form>
          <CSSTransition
            in={isOpen}
            timeout={600}
            classNames="modal"
            unmountOnExit
          >
            <Modal>
              <ModalContent 
                heading={t('createAccount.termsModalHeading')}
                content={termsMarkdown}
                closeModal={this.closeModal} 
                downloadButtonLabel="Download"
                closeIconAltText="close icon"
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
  modal: PropTypes.object
};

const mapStateToProps = state => {
  return {
    modal: {
      isOpen: state.modal.isOpen
    }
  }
};

const actions = { 
  showLoader, 
  hideLoader ,
  showModal,
  hideModal
};

export const RawComponent = CreateAccount;

export default connect(mapStateToProps, actions)(withTranslation()(CreateAccount));
