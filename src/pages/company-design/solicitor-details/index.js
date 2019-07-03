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
import InputPhone from 'src/components/_form/InputPhone/InputPhone';
import Checkbox from 'src/components/_form/Checkbox/Checkbox';
import Button from 'src/components/_buttons/Button/Button';
import ModalWrapper from 'src/components/Modal/ModalWrapper';
import ModalContent from 'src/components/Modal/ModalContent';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

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
    const { company } = this.props;

    formUtils.initFormState({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      permission: false
    }, company.solicitor_details );
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  saveDetails = () => {
    const { showLoader, hideLoader, form, company } = this.props;
    const { values } = form;

    if(formUtils.validateForm(this.config)) {
      showLoader();

      CompanyService.updateCompany(values, 'solicitor_details', company.id).then(() => {
        hideLoader();
        navigate('/company-design/shareholder-details');
      });
    }
  }

  saveAndExit = async () => {
    const { showLoader, hideLoader, form: { errors, values }, company } = this.props;

    await Object.keys(errors).forEach(async (key) => {
      await formUtils.updateValue(key, '');
    });

    showLoader();

    CompanyService.updateCompany(values, 'solicitor_details', company.id).then((response) => {
      hideLoader();
      if (response.status === 200) {
        navigate('/company-design');
      }
    });
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
        stateKey: 'first_name',
        component: InputText,
        label: t('companyDesign.solicitorDetails.form.label.firstName'),
        value: values.first_name,
        validationFunction: 'validateRequired'
      },
      {
        stateKey: 'last_name',
        component: InputText,
        label: t('companyDesign.solicitorDetails.form.label.lastName'),
        value: values.last_name,
        validationFunction: 'validateRequired'
      },
      {
        stateKey: 'email',
        component: InputText,
        label: t('companyDesign.solicitorDetails.form.label.email'),
        value: values.email,
        validationFunction: 'validateEmail'
      },
      {
        stateKey: 'phone_number',
        component: InputPhone,
        label: t('companyDesign.solicitorDetails.form.label.phone'),
        value: values.phone_number,
        validationFunction: 'validatePhone'
      },
      {
        component: 'br'
      },
      {
        stateKey: 'permission',
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
        checked: values.permission,
        validationFunction: 'validateRequired'
      }
    ];

    const headerActions = <ButtonHeader onClick={this.saveAndExit} label={t('header.buttons.saveAndExit')} />;

    return (
      <Layout headerActions={headerActions} secure>
        <div data-test="container-solicitor-details" className="solicitor-details" role="account form-page">
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

            <Button
              data-test="save-details-button"
              classes="primary"
              label={ t('companyDesign.solicitorDetails.ctaPrimary') }
              fullWidth
              onClick={this.saveDetails}
            />

            <br />
          </Form>

          <ModalWrapper 
            transitionBool={modalIsOpen}
            transitionTime={600}
            classes="modal"
          >
            <ModalContent
              heading={t('companyDesign.solicitorDetails.modal.heading')}
              content={termsMarkdown}
              closeModal={hideModal}
              downloadButtonLabel={t('modal.downloadButtonLabel')}
              closeIconAltText={t('modal.closeIconAltText')}
              modalImage={termsImage}
            />
          </ModalWrapper>

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
  company: PropTypes.object,
  activeCompany: PropTypes.number
};

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen,
  activeCompany: state.activeCompany,
  company: state.companies.find(company => company.id === state.activeCompany),
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
