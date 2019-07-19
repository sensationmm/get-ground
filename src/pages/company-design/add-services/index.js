import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { navigate } from 'gatsby';
import PropTypes from 'prop-types'

import formUtils from 'src/utils/form'
import Form from 'src/components/_layout/Form/Form'
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup'
import Button from 'src/components/_buttons/Button/Button'
import Layout from 'src/components/Layout/Layout'
import IntroBox from 'src/components/_layout/IntroBox/IntroBox'
import ModalContent from 'src/components/Modal/ModalContent';
import ModalWrapper from 'src/components/Modal/ModalWrapper';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';
import TextImage from 'src/components/_layout/TextImage/TextImage';

import { companyUpdate } from 'src/state/actions/activeCompany';
import { showModal, hideModal } from 'src/state/actions/modal';
import { showLoader, hideLoader } from 'src/state/actions/loader';

import InTouchImage from 'src/assets/images/verify-email.svg'

import companyService from 'src/services/Company';
const CompanyService = new companyService();

/**
 * AdditionalServices
 * @return {ReactComponent} AdditionalServices
 */
export class AdditionalServices extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.company !== undefined) {
      formUtils.initFormState({
        mortgage: null,
        insurance: null,
        management: null,
        solicitor: null
      }, this.props.company.additional_services);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.company === undefined && this.props.company !== undefined) {
      formUtils.initFormState({
        mortgage: null,
        insurance: null,
        management: null,
        solicitor: null
      }, this.props.company.additional_services);
    }

  }

  /**
   * @param {boolean} saveAndExit - whether this is a save and exit call
   * @return {void}
   */
  submitAdditionalServices = (saveAndExit = false) => {
    const { form: { values }, showLoader, hideLoader, company } = this.props;

    showLoader();

    CompanyService.updateCompany(values, 'additional_services', company.id).then((response) => {
      hideLoader();
      if (response.status === 200) {
        if(saveAndExit) {
          navigate('/company-design');
        } else {
          navigate('/company-design/property-address');
        }
      }
    });
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  save = () => {
    const { values: { mortgage, insurance, management, solicitor } } = this.props.form;

    const servicesRequired = mortgage || insurance || management || solicitor;

    if(servicesRequired) {
      this.props.showModal();
    } else {
      this.submitAdditionalServices();
    }
  }

  render() {
    const { t, form, modalIsOpen, hideModal } = this.props
    const { values } = form;

    const config = [
      {
        stateKey: 'solicitor',
        component: RadioGroup,
        groupLabel: t('additionalServices.findSolicitorQuestion'),
        name: 'solicitor',
        items: [
          { value: false, label: t('form.radioConfirm.false') },
          { value: true, label: t('form.radioConfirm.true') }
        ],
        value: values.solicitor,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
      },
      {
        stateKey: 'mortgage',
        component: RadioGroup,
        groupLabel: t('additionalServices.mortgageOptionsQuestion'),
        name: 'mortgage',
        items: [
          { value: false, label: t('form.radioConfirm.false') },
          { value: true, label: t('form.radioConfirm.true') }
        ],
        value: values.mortgage,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
      },
      {
        stateKey: 'insurance',
        component: RadioGroup,
        groupLabel: t('additionalServices.propertyInsuranceQuestion'),
        name: 'insurance',
        items: [
          { value: false, label: t('form.radioConfirm.false') },
          { value: true, label: t('form.radioConfirm.true') }
        ],
        value: values.insurance,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
      },
      {
        stateKey: 'management',
        component: RadioGroup,
        groupLabel: t('additionalServices.property_managementQuestion'),
        name: 'management',
        items: [
          { value: false, label: t('form.radioConfirm.false') },
          { value: true, label: t('form.radioConfirm.true') }
        ],
        value: values.management,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
      },
      {
        component: 'br'
      },
      {
        component: Button,
        onClick: this.save,
        label: t('additionalServices.nextButton'),
        classes: 'primary full',
      },
      {
        component: Button,
        onClick: () => navigate('/company-design'),
        label: t('additionalServices.backButton'),
        classes: 'secondary full',
      }
    ];

    const headerActions = <ButtonHeader onClick={() => this.submitAdditionalServices(true)} label={t('header.buttons.saveAndExit')} />

    return (
      <Layout headerActions={headerActions} secure companyID>
        <div className="add-services" role="company-design form-page">
          <h1 className="add-services-title">{t('additionalServices.title')}</h1>
          <IntroBox>{t('additionalServices.introBox')}</IntroBox>
          <Form className="add-services-form">
            {formUtils.renderForm(config)}
          </Form>

          <ModalWrapper 
            transitionBool={modalIsOpen}
            transitionTime={600}
            classes="modal fullscreen"
          >
            <ModalContent
              htmlContent={
                <TextImage
                  title={t('additionalServices.modalHeading')}
                  image={InTouchImage}
                  text={`<p>${t('additionalServices.modalPara1')}</p>
                  <p>${t('additionalServices.modalPara2')}</p>
                  <p>${t('additionalServices.modalPara3')}</p>`}
                  buttonAction={this.submitAdditionalServices}
                  buttonLabel={t('additionalServices.modalContentButton')}
                />
              }
              closeModal={hideModal}
              closeIconAltText={t('onBoarding.createAccount.termsModalCloseIconAltText')}
            />
          </ModalWrapper>
        </div>
      </Layout>
    )
  }
}

AdditionalServices.propTypes = {
  company: PropTypes.object,
  companyUpdate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  form: PropTypes.object,
  modalIsOpen: PropTypes.bool,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
};

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen,
  form: state.form,
  company: state.companies.find(company => company.id === state.activeCompany)
});

const actions = {
  companyUpdate,
  showModal,
  hideModal,
  showLoader,
  hideLoader
}

export default connect(mapStateToProps, actions)(withTranslation()(AdditionalServices))
