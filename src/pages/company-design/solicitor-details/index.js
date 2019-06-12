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
import InputPhone from 'src/components/_form/InputPhone/InputPhone';
import Checkbox from 'src/components/_form/Checkbox/Checkbox';
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup';
import Button from 'src/components/_buttons/Button/Button';
import Modal from 'src/components/Modal/Modal';
import ModalContent from 'src/components/Modal/ModalContent';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import { showModal, hideModal } from 'src/state/actions/modal';

import modalService from 'src/services/Modal';
export const ModalService = new modalService();
import companyService from 'src/services/Company';
export const CompanyService = new companyService();

import termsImage from 'src/assets/images/terms-image.svg';

import './solicitor-details.scss'
/**
 * SolicitorDetails
 * @param {object} e - event passed on openModal (for JSdoc)
 * @return {JSXElement} CreateAccount
 */
class SolicitorDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      termsMarkdown: null
    };

    this.config = null;
  }

  componentDidMount = () => {
    const { activeCompany, companies } = this.props;

    formUtils.initFormState({
      have_solicitor: null,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      authority: false
    }, companies[activeCompany], 'solicitor');
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  saveDetails = () => {
    const { showLoader, hideLoader, form } = this.props;
    const { values } = form;

    if(formUtils.validateForm(this.config)) {
      showLoader();

      const solicitor = values;

      if(solicitor.have_solicitor !== 'yes') {
        solicitor.first_name = '';
        solicitor.last_name = '';
        solicitor.email = '';
        solicitor.phone = '';
        solicitor.authority = false;
      }

      CompanyService.saveSolicitor(solicitor).then(response => {
        hideLoader();
        navigate('/company-design/shareholder-details');
      });
    }
  }

  getModalContent = e => {
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
    const { termsMarkdown } = this.state;
    const { t, modalIsOpen, showModal, hideModal, form: { values, errors, showErrorMessage } } = this.props;

    /* istanbul ignore next */
    this.config = [
      {
        stateKey: 'have_solicitor',
        component: RadioGroup,
        groupLabel: t('companyDesign.solicitorDetails.form.label.haveSolicitor'),
        name: 'have_solicitor',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.have_solicitor,
        validationFunction: 'validateRequired'
      },
      {
        stateKey: 'first_name',
        component: InputText,
        label: t('companyDesign.solicitorDetails.form.label.firstName'),
        value: values.first_name,
        validationFunction: 'validateRequired',
        hidden: !values.have_solicitor || values.have_solicitor === 'no'
      },
      {
        stateKey: 'last_name',
        component: InputText,
        label: t('companyDesign.solicitorDetails.form.label.lastName'),
        value: values.last_name,
        validationFunction: 'validateRequired',
        hidden: !values.have_solicitor || values.have_solicitor === 'no'
      },
      {
        stateKey: 'email',
        component: InputText,
        label: t('companyDesign.solicitorDetails.form.label.email'),
        value: values.email,
        validationFunction: 'validateEmail',
        hidden: !values.have_solicitor || values.have_solicitor === 'no'
      },
      {
        stateKey: 'phone',
        component: InputPhone,
        label: t('companyDesign.solicitorDetails.form.label.phone'),
        value: values.phone,
        validationFunction: 'validatePhone',
        hidden: !values.have_solicitor || values.have_solicitor === 'no'
      },
      {
        component: 'br'
      },
      {
        stateKey: 'authority',
        component: Checkbox,
        label: <div>
          {t('companyDesign.solicitorDetails.form.label.authority')}&nbsp;
          <a onClick={(e) => {
            e.stopPropagation();
            if (termsMarkdown === '') {
              this.getModalContent(e)
            } else {
              showModal();
            }
          }}>{t('companyDesign.solicitorDetails.form.label.authorityLink')}</a>
        </div>,
        checked: values.authority,
        validationFunction: 'validateRequired',
        hidden: !values.have_solicitor || values.have_solicitor === 'no'
      }
    ];

    const showDone = (
      (values.have_solicitor === 'no') ||
      (
        values.have_solicitor === 'yes' &&
        values.first_name &&
        values.last_name &&
        values.email &&
        values.phone &&
        values.authority
      )
    );

    return (
      <Layout secure>
        <div data-test="container-solicitor-details" className="solicitor-details" role="account">
          <h1>{ t('companyDesign.solicitorDetails.title') }</h1>

          <IntroBox>{ t('companyDesign.solicitorDetails.intro') }</IntroBox>
          <center>
              <Button
                data-test="button-skip-step"
                onClick={() => navigate('/company-design/shareholder-details')}
                classes="small link"
                label={t('form.skipStep')}
              />
            </center>
          {showErrorMessage &&
            <ErrorBox>
            { errors.form
              ? errors.form
              : t('form.correctErrors')
            }
            </ErrorBox>
          }

          <Form>
            {formUtils.renderForm(this.config)}

            <br />

            {showDone &&
              <Button
                data-test="save-details-button"
                classes="primary"
                label={ t('companyDesign.solicitorDetails.ctaPrimary') }
                fullWidth
                onClick={this.saveDetails}
              />
            }

            <br />
          </Form>

          <CSSTransition
            in={modalIsOpen}
            timeout={600}
            classNames="modal"
            unmountOnExit
          >
            <Modal>
              <ModalContent
                heading={t('companyDesign.solicitorDetails.modal.heading')}
                content={termsMarkdown}
                closeModal={hideModal}
                downloadButtonLabel={t('modal.downloadButtonLabel')}
                closeIconAltText={t('modal.closeIconAltText')}
                modalImage={termsImage}
              />
            </Modal>
          </CSSTransition>
        </div>
      </Layout>
    );
  }
}

SolicitorDetails.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  t: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool,
  form: PropTypes.object,
  companies: PropTypes.array,
  activeCompany: PropTypes.number
};

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen,
  activeCompany: state.activeCompany,
  companies: state.companies,
  form: state.form
});

const actions = {
  showLoader,
  hideLoader ,
  showModal,
  hideModal
};

export const RawComponent = SolicitorDetails;

export default connect(mapStateToProps, actions)(withTranslation()(SolicitorDetails));
