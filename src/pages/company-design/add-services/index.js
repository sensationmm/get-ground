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

//import { setAdditionalServices } from 'src/state/actions/additionalServices'
import { companyUpdate } from 'src/state/actions/activeCompany';
import { showModal, hideModal } from 'src/state/actions/modal';
import { showLoader, hideLoader } from 'src/state/actions/loader';

import './add-services.scss'

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
    formUtils.initFormState({
      mortgage: null,
      insurance: null,
      management: null,
      solicitor: null
    }, this.props.company.additional_services);
  }

  submitAdditionalServices = () => {
    const { form: { values }, showLoader, hideLoader } = this.props;

    showLoader();

    CompanyService.updateCompany(values, 'additional_services', 1).then((response) => {
      hideLoader();
      if (response.status === 200) {
        navigate('/company-design');
      }
    });
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  render() {
    const { t, form, modalIsOpen, showModal, hideModal } = this.props
    const { values } = form;

    const config = [
      {
        stateKey: 'solicitor',
        component: RadioGroup,
        groupLabel: t('additionalServices.findSolicitorQuestion'),
        name: 'solicitor',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
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
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
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
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
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
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
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
        onClick: () => showModal(),
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

    const headerActions = <ButtonHeader onClick={this.submitAdditionalServices} label={t('header.buttons.saveAndExit')} />

    return (
      <Layout headerActions={headerActions} secure>
        <div className="add-services" role="company-design">
          <h1 className="add-services-title">{t('additionalServices.title')}</h1>
          <IntroBox>{t('additionalServices.introBox')}</IntroBox>
          <Form className="add-services-form">
            {formUtils.renderForm(config)}
          </Form>

          <ModalWrapper 
            transitionBool={modalIsOpen}
            transitionTime={600}
            classes="modal"
          >
            <ModalContent
              heading={t('additionalServices.modalHeading')}
              htmlContent={
                <>
                <p>{t('additionalServices.modalPara1')}</p>
                <p>{t('additionalServices.modalPara2')}</p>
                <p>{t('additionalServices.modalPara3')}</p>
                <Button
                  label={t('additionalServices.modalContentButton')}
                  onClick={this.submitAdditionalServices}
                  classes="primary"
                  fullWidth
                />
                </>
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
  company: state.companies.find(company => company.id === 1)
});

const actions = {
  companyUpdate,
  showModal,
  hideModal,
  showLoader,
  hideLoader
}

export default connect(mapStateToProps, actions)(withTranslation()(AdditionalServices))
