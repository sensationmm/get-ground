
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout'
import formUtils from 'src/utils/form';

import Form from 'src/components/_layout/Form/Form';
import InputText from 'src/components/_form/InputText/InputText';
import InputNumber from 'src/components/_form/InputNumber/InputNumber';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import Button from 'src/components/_buttons/Button/Button';
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup';
import Datepicker from 'src/components/Datepicker/Datepicker';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import propertyService from 'src/services/Property';
export const PropertyService = new propertyService();

import addIcon from 'src/assets/images/add-icon.svg';
import 'src/styles/pages/purchase-details.scss';

/**
  * PurchaseDetails
  * @param {object} date - date value (for JSdoc)
  * @param {function} t - i18next function for translating
  * @return {JSXElement} PurchaseDetails
  */
class PurchaseDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDatepickerOpen: false,
      focusedDateField: '',
      extraInstallmentFieldsShowing: 0
    };

    this.config = [];
  }
  
  componentDidMount() {
    formUtils.initFormState({
      priceOfProperty: '',
      newBuild: '',
      expectedExchange: '',
      completionDate: '',
      depositDueDate: '',
      depositAmount: '',
      exchangeDate: '',
      firstInstallmentDate: '',
      firstInstallmentAmount: '',
      secondInstallmentDate: '',
      secondInstallmentAmount: ''
    });
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  /**
    * @param {object} e - event object
    * @return {void}
    */
  openDatePicker = (e) => {
    this.setState({
      isDatepickerOpen: true,
      focusedDateField: e.target.id 
    });
  }

  closeDatePicker = () => this.setState({isDatepickerOpen: false});

  setDateFieldValue = /* istanbul ignore next */ date => {
    const { focusedDateField } = this.state
    const element = document.getElementById(focusedDateField);

    /* istanbul ignore else */
    if (!element) return;

    formUtils.setNativeValue(element, moment(date).format('Do MMMM YYYY'));
    element.dispatchEvent(new Event('input', { bubbles: true }));

    this.setState({ [focusedDateField]: moment(date).format('L'), isDatepickerOpen: false });
  }

  checkElementHidden = () => {
    const { form: { values: { newBuild } } } = this.props;
    return newBuild === '' || newBuild === 'no';
  }

  showNextInstallment = /* istanbul ignore next */ () => {
    const { extraInstallmentFieldsShowing } = this.state;
    const installmentDateField = document.getElementsByClassName('installment-date');
    const installmentDateAmount = document.getElementsByClassName('installment-amount');

    if (installmentDateField.length === extraInstallmentFieldsShowing) return;

    this.setState({ extraInstallmentFieldsShowing: extraInstallmentFieldsShowing + 1});

    installmentDateField[extraInstallmentFieldsShowing].style.display = 'block';
    installmentDateAmount[extraInstallmentFieldsShowing].style.display = 'block';
  }

  submitPurchaseDetails = () => {
    const { showLoader, hideLoader, t, form } = this.props;

    /* istanbul ignore else */
    if (formUtils.validateForm(this.config)) {
      showLoader();

      PropertyService.SavePurchaseDetails(form.values).then((response) => {
        hideLoader();
        /* istanbul ignore else */
        if (response.status === 200) {
          navigate('/company-design/solicitor-details');
          
        } else if (response.status === 400) {
          formUtils.setFormError(t('form.correctErrors'));
        }
      });
    }

  }

  render() {
    const { t, form } = this.props;
    const { isDatepickerOpen } = this.state;
    const {
      values: {
        priceOfProperty,
        newBuild,
        completionDate,
        depositDueDate,
        depositAmount,
        firstInstallmentDate,
        firstInstallmentAmount,
        secondInstallmentDate,
        secondInstallmentAmount,
        expectedExchange,
        exchangeDate
      },
      showErrorMessage,
      errors
    } = form;

    this.radioConfig = [
      {
        label: 'no',
        value: 'no'
      },
      {
        label: 'yes',
        value: 'yes'
      }
    ]
        
    this.config = [
      {
        stateKey: 'priceOfProperty',
        component: InputNumber,
        label: t('companyDesign.purchaseDetails.form.priceOfPropertyLabel'),
        value: priceOfProperty,
        validationFunction: 'validateRequired',
        note: t('companyDesign.purchaseDetails.form.priceOfPropertyNote'),
      },
      {
        stateKey: 'newBuild',
        component: RadioGroup,
        groupLabel: t('companyDesign.purchaseDetails.form.newBuildLabel'),
        name: 'newBuildRadio',
        items: this.radioConfig,
        value: newBuild
      },
      {
        stateKey: 'completionDate',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.completionDateLabel'),
        value: completionDate,
        validationFunction: 'validateRequired',
        onFocus: this.openDatePicker,
        id: 'completionDate',
        hidden: newBuild !== 'yes'
      },
      {
        component: 'h1',
        children: t('companyDesign.purchaseDetails.heading2'),
        style: { display: this.checkElementHidden() ? 'none' : 'block' }
      },
      {
        stateKey: 'depositDueDate',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.depositDueLabel'),
        value: depositDueDate,
        validationFunction: 'validateRequired',
        onFocus: this.openDatePicker,
        id: 'depositDueDate',
        hidden: this.checkElementHidden()
      },
      {
        stateKey: 'depositAmount',
        component: InputNumber,
        label: t('companyDesign.purchaseDetails.form.depositAmountLabel'),
        value: depositAmount,
        validationFunction: 'validateRequired',
        wrapperClass: 'background-gradient',
        hidden: this.checkElementHidden()
      },
      {
        stateKey: 'firstInstallmentDate',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.firstInstallmentDateLabel'),
        value: firstInstallmentDate,
        validationFunction: 'validateRequired',
        onFocus: this.openDatePicker,
        id: 'firstInstallmentDate',
        hidden: this.checkElementHidden()
      },
      {
        stateKey: 'firstInstallmentAmount',
        component: InputNumber,
        label: t('companyDesign.purchaseDetails.form.firstInstallmentLabel'),
        value: firstInstallmentAmount,
        validationFunction: 'validateRequired',
        wrapperClass: 'background-gradient',
        hidden: this.checkElementHidden()
      },
      {
        stateKey: 'secondInstallmentDate',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.secondInstallmentDateLabel'),
        value: secondInstallmentDate,
        onFocus: this.openDatePicker,
        id: 'secondInstallmentDate',
        wrapperClass: 'installment-date'
      },
      {
        stateKey: 'secondInstallmentAmount',
        component: InputNumber,
        label: t('companyDesign.purchaseDetails.form.secondInstallmentLabel'),
        value: secondInstallmentAmount,
        wrapperClass: 'background-gradient installment-amount',
      },
      {
        component: Button,
        onClick: () => this.showNextInstallment(),
        icon: addIcon,
        small: true,
        label: t('companyDesign.purchaseDetails.form.addButton'),
        hidden: this.checkElementHidden()
      },
      {
        stateKey: 'expectedExchange',
        component: RadioGroup,
        groupLabel: t('companyDesign.purchaseDetails.form.expectedExchangeLabel'),
        value: expectedExchange,
        name: 'exchangeDateRadios',
        items: this.radioConfig,
        hidden: newBuild === ''
      },
      {
        stateKey: 'exchangeDate',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.expectedExchangeDateLabel'),
        value: exchangeDate,
        validationFunction: 'validateRequired',
        onFocus: this.openDatePicker,
        id: 'exchangeDate',
        hidden: expectedExchange !== 'yes'
      },
      {
        component: Datepicker,
        isDatepickerOpen: isDatepickerOpen,
        closeDatepicker: () => this.closeDatePicker(),
        setDateFieldValue: date => this.setDateFieldValue(date),
        confirmButtonText: t('companyDesign.purchaseDetails.datepicker.button2'),
        cancelButtonText: t('companyDesign.purchaseDetails.datepicker.button1')
      },
    ];

    return (
      <>
      <Layout secure>
        <div className="company-design-purchase-details" data-test="container-company-design-purchase-details">
          <h1>{t('companyDesign.purchaseDetails.heading')}</h1>

          <IntroBox>{t('companyDesign.purchaseDetails.intro')}</IntroBox>

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

            { expectedExchange !== '' &&
              <Button
                data-test="submit-button"
                label={t('companyDesign.purchaseDetails.form.nextButton')}
                fullWidth
                onClick={() => this.submitPurchaseDetails()}
                classes="primary"
              />
            }

            <Button 
              classes="secondary" 
              label={t('companyDesign.purchaseDetails.form.backButton')} 
              fullWidth 
              onClick={() => navigate('/company-design/property-address')}
            />
          </Form>
        </div>
      </Layout>
      </>
    );
  }
}

PurchaseDetails.propTypes = {
  t: PropTypes.func.isRequired,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  form: PropTypes.object
};

const mapStateToProps = state => ({
  form: state.form
});

const actions = { showLoader, hideLoader };

export const RawComponent = PurchaseDetails;
export default connect(mapStateToProps, actions)(withTranslation()(PurchaseDetails));
