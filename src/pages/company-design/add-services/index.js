import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { navigate } from 'gatsby';
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group';

import formUtils from 'src/utils/form'
import Form from 'src/components/_layout/Form/Form'
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup'
import Button from 'src/components/_buttons/Button/Button'
import Layout from 'src/components/Layout/Layout'
import IntroBox from 'src/components/_layout/IntroBox/IntroBox'
import Modal from 'src/components/Modal/Modal';
import ModalContent from 'src/components/Modal/ModalContent';

import { setAdditionalServices } from 'src/state/actions/additionalServices'
import { showModal, hideModal } from 'src/state/actions/modal';

import './add-services.scss'

import additionalServices from 'src/services/AdditionalServices'

const services = new additionalServices();

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
      find_mortgage: null,
      find_property_insurance: null,
      find_property_management: null,
      find_solicitor: null
    });
  }

  componentWillUnmount() {
    formUtils.clearFormState();

    const { form: { values: { find_mortgage, find_property_insurance,  find_property_management, find_solicitor }}} = this.props;

    this.props.setAdditionalServices({
      mortgage: find_mortgage === 'yes',
      insurance: find_property_insurance === 'yes',
      management: find_property_management === 'yes',
      solicitor: find_solicitor === 'yes'
    })

    services.addServices(find_mortgage, find_property_insurance, find_property_management, find_solicitor)
  }

  render() {
    const { t, form, modalIsOpen, showModal, hideModal } = this.props
    const { values } = form;

    const config = [
      {
        stateKey: 'find_solicitor',
        component: RadioGroup,
        groupLabel: t('additionalServices.findSolicitorQuestion'),
        name: 'find_solicitor',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.find_solicitor,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
      },
      {
        stateKey: 'find_mortgage',
        component: RadioGroup,
        groupLabel: t('additionalServices.mortgageOptionsQuestion'),
        name: 'find_mortgage',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.find_mortgage,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
      },
      {
        stateKey: 'find_property_insurance',
        component: RadioGroup,
        groupLabel: t('additionalServices.propertyInsuranceQuestion'),
        name: 'find_property_insurance',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.find_property_insurance,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
      },
      {
        stateKey: 'find_property_management',
        component: RadioGroup,
        groupLabel: t('additionalServices.property_managementQuestion'),
        name: 'find_property_management',
        items: [
          { value: 'no', label: t('form.radioConfirm.false') },
          { value: 'yes', label: t('form.radioConfirm.true') }
        ],
        value: values.find_property_management,
        validationFunction: 'validateRequired',
        isAdditionalServices: true
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

    return (
      <Layout>
        <div className="add-services" role="company-design">
          <h1 className="add-services-title">{t('additionalServices.title')}</h1>
          <IntroBox>{t('additionalServices.introBox')}</IntroBox>
          <Form className="add-services-form">
            {formUtils.renderForm(config)}
          </Form>
          <CSSTransition
            in={modalIsOpen}
            timeout={600}
            classNames="modal"
            unmountOnExit
          >
            <Modal>
              <ModalContent
                heading={t('additionalServices.modalHeading')}
                htmlContent={
                  <>
                  <p>{t('additionalServices.modalPara1')}</p>
                  <p>{t('additionalServices.modalPara2')}</p>
                  <p>{t('additionalServices.modalPara3')}</p>
                  <Button
                    label={t('additionalServices.modalContentButton')}
                    onClick={() => navigate('/company-design')}
                    classes="primary"
                    fullWidth
                  />
                  </>
                }
                closeModal={hideModal}
                closeIconAltText={t('onBoarding.createAccount.termsModalCloseIconAltText')}
              />
            </Modal>
          </CSSTransition>
        </div>
      </Layout>
    )
  }
}

AdditionalServices.propTypes = {
  setAdditionalServices: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  form: PropTypes.object,
  modalIsOpen: PropTypes.bool,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
};

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen,
  form: state.form
});

const actions = {
  setAdditionalServices,
  showModal,
  hideModal
}

export default connect(mapStateToProps, actions)(withTranslation()(AdditionalServices))
