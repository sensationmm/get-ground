
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
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import companyService from 'src/services/Company';
export const CompanyService = new companyService();

// import addIcon from 'src/assets/images/add-icon.svg';

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
    const { company: { purchase_details }} = this.props;
    const payment = purchase_details.payment_schedule;
    const completionDate = purchase_details.completion_date;
    const exchangeDate = purchase_details.expected_exchange_date;
    const reduxFields = {
      amount_in_cents: purchase_details.price.amount_in_cents,
      is_new_build: purchase_details.is_new_build,
      expected_exchange_date: exchangeDate === null ? '' : moment(exchangeDate).format('DD/MM/YYYY'),
      completion_date: completionDate === null ? '' : moment(completionDate).format('DD/MM/YYYY'),
      depositDueDate: this.setReduxDateValues(payment, 0),
      depositAmount: payment === null ? '' : payment[0].amount.amount_in_cents,
      firstInstallmentDate: this.setReduxDateValues(payment, 1),
      firstInstallmentAmount: payment === null ? '' : payment[1].amount.amount_in_cents,
      // secondInstallmentDate: this.setReduxDateValues(payment, 2),
      // secondInstallmentAmount: payment === null ? '' : payment[2].amount.amount_in_cents
    }
    
    formUtils.initFormState({
      amount_in_cents: '',
      is_new_build: null,
      completion_date: '',
      depositDueDate: '',
      depositAmount: '',
      expected_exchange_date: '',
      firstInstallmentDate: '',
      firstInstallmentAmount: '',
      // secondInstallmentDate: '',
      // secondInstallmentAmount: ''
    }, reduxFields);
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  /**
   * setReduxDateValues
   * @param {Array} payment - array of payments
   * @param {number} index - index of payment in array
   * @return {void} setReduxDateValues
   */
  setReduxDateValues = (payment, index) => {
    if (payment === null || (payment && payment[index].due_date === null) || 
      (payment && payment[index].due_date === undefined)) {
      return '';
    } else {
      return moment(payment[index].due_date).format('DD/MM/YYYY');
    }
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

    this.setState({ [focusedDateField]: moment(date).format('YYYY-MM-DDTHH:mm:ss+00:00'), isDatepickerOpen: false });
  }

  checkElementHidden = () => {
    const { form: { values: { is_new_build } } } = this.props;
    return is_new_build === false || is_new_build === null;
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

  /**
   * setPaymentScheduleDate
   * @param {string} stateKeyValue - date string
   * @param {number} index - index of payment in array
   * @return {string} - date
   */
  setPaymentScheduleDate = (stateKeyValue, index) => {
    const { company: { purchase_details }} = this.props;
    let date;

    if (!purchase_details.payment_schedule) {
      date = stateKeyValue ? stateKeyValue : null
    } else {
      date = stateKeyValue ? stateKeyValue : purchase_details.payment_schedule[index].due_date;
    }

    return date;
  }

  /**
   * handleSubmitPurchaseDetails
   * @param {boolean} isSaveAndExit - whether the save and exit button has fired this or not
   * @return {void} handleSubmitPurchaseDetails
   */
  handleSubmitPurchaseDetails = async (isSaveAndExit) => {
    const { 
      showLoader, 
      form: { values, errors },  
    } = this.props;

    const paymentSchedule = [
      {
        type: 'deposit',
        due_date: values.depositDueDate ? moment(values.depositDueDate, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss+00:00') : null,
        amount: {
          amount_in_cents: values.depositAmount,
          currency: 'GBP'
        }
      },
      {
        type: 'first_installment',
        due_date: values.firstInstallmentDate ? moment(values.firstInstallmentDate, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss+00:00') : null,
        amount: {
          amount_in_cents: values.firstInstallmentAmount,
          currency:'GBP'
        }
      }
    ];

    const payload = {
      price: {
        amount_in_cents: values.amount_in_cents,
        currency: 'GBP' 
      },
      is_new_build: values.is_new_build,
      completion_date:  moment(values.completion_date, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss+00:00'),
      expected_exchange_date: moment(values.expected_exchange_date, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss+00:00'),
      payment_schedule: paymentSchedule
    };

    if (isSaveAndExit) {
      this.saveAndExit(payload, errors);
      showLoader();
    } else {
      this.submitPurchaseDetails(payload);
    }
  }

  /**
   * saveAndExit
   * @param {object} payload - request object
   * @param {object} errors - form errors
   * @return {void} saveAndExit
   */
  saveAndExit = async (payload, errors) => {
    const { hideLoader, company } = this.props;

    await Object.keys(errors).forEach(async (key) => {
      await formUtils.updateValue(key, '');
    });

    CompanyService.updateCompany(payload, 'purchase_details', company.id).then((response) => {
      hideLoader();
      if (response.status === 200) {
        navigate('/company-design');
      }
    });
  }

  /**
   * submitPurchaseDetails
   * @param {object} payload - request object
   * @return {void} submitPurchaseDetails
   */
  submitPurchaseDetails = payload => {
    const { hideLoader, showLoader, t, company } = this.props;

    /* istanbul ignore else */
    if (formUtils.validateForm(this.config)) {
      showLoader();

      CompanyService.updateCompany(payload, 'purchase_details', company.id).then((response) => {
        hideLoader();
        /* istanbul ignore else */
        if (response.status === 200) {

          if (company.additional_services.solicitor === true) {
            navigate('/company-design/shareholder-details')
          } else {
            navigate('/company-design/solicitor-details');
          }
          
        } else if (response.status === 400) {
          formUtils.setFormError(t('form.correctErrors'));
        }
      });
    }
  }

  render() {
    const { t, form, company } = this.props;
    // const payment_schedule = company ? company.purchase_details.payment_schedule : []
    const {
      values: {
        amount_in_cents,
        is_new_build,
        completion_date,
        depositDueDate,
        depositAmount,
        firstInstallmentDate,
        firstInstallmentAmount,
        // secondInstallmentDate,
        // secondInstallmentAmount,
        expected_exchange_date
      },
      showErrorMessage,
      errors
    } = form;

    this.radioConfig = [
      {
        label: 'no',
        value: false
      },
      {
        label: 'yes',
        value: true
      }
    ]
        
    this.config = [
      {
        stateKey: 'amount_in_cents',
        component: InputNumber,
        label: t('companyDesign.purchaseDetails.form.priceOfPropertyLabel'),
        value: amount_in_cents,
        validationFunction: 'validateRequired',
        note: t('companyDesign.purchaseDetails.form.priceOfPropertyNote'),
      },
      {
        stateKey: 'is_new_build',
        component: RadioGroup,
        groupLabel: t('companyDesign.purchaseDetails.form.newBuildLabel'),
        name: 'newBuildRadio',
        items: this.radioConfig,
        value: is_new_build
      },
      {
        stateKey: 'expected_exchange_date',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.expectedExchangeDateLabel'),
        value: expected_exchange_date,
        placeholder: 'DD/MM/YYYY',
        validationFunction: ['validateRequired', 'validateDate', 'validateFutureDate'],
        id: 'exchangeDate',
        hidden: is_new_build == null,
      },
      {
        stateKey: 'completion_date',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.completionDateLabel'),
        value: completion_date,
        validationFunction: ['validateRequired', 'validateDate', 'validateFutureDate'],
        placeholder: 'DD/MM/YYYY',
        id: 'completionDate',
        hidden: is_new_build === null,
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
        validationFunction: ['validateRequired', 'validateDate', 'validateFutureDate'],
        placeholder: 'DD/MM/YYYY',
        id: 'depositDueDate',
        hidden: this.checkElementHidden(),
      },
      {
        stateKey: 'depositAmount',
        component: InputNumber,
        label: t('companyDesign.purchaseDetails.form.depositAmountLabel'),
        value: depositAmount,
        validationFunction: 'validateRequired',
        hidden: this.checkElementHidden()
      },
      {
        stateKey: 'firstInstallmentDate',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.firstInstallmentDateLabel'),
        value: firstInstallmentDate,
        validationFunction: ['validateRequired', 'validateDate', 'validateFutureDate'],
        placeholder: 'DD/MM/YYYY',
        id: 'firstInstallmentDate',
        hidden: this.checkElementHidden(),
      },
      {
        stateKey: 'firstInstallmentAmount',
        component: InputNumber,
        label: t('companyDesign.purchaseDetails.form.firstInstallmentLabel'),
        value: firstInstallmentAmount,
        validationFunction: 'validateRequired',
        hidden: this.checkElementHidden()
      },
      // {
      //   stateKey: 'secondInstallmentDate',
      //   component: InputText,
      //   label: t('companyDesign.purchaseDetails.form.secondInstallmentDateLabel'),
      //   value: secondInstallmentDate,
      //   onFocus: this.openDatePicker,
      //   id: 'secondInstallmentDate',
      //   wrapperClass: 'installment-date',
      //   readOnly: true,
      //   hidden: this.checkElementHidden() ||
      //           (is_new_build === true && payment_schedule === null) ||
      //           (is_new_build === true && payment_schedule && payment_schedule[2].due_date === '')
      // },
      // {
      //   stateKey: 'secondInstallmentAmount',
      //   component: InputNumber,
      //   label: t('companyDesign.purchaseDetails.form.secondInstallmentLabel'),
      //   value: secondInstallmentAmount,
      //   wrapperClass: 'installment-amount',
      //   hidden: this.checkElementHidden() ||
      //           (is_new_build === true && payment_schedule === null) ||
      //           (is_new_build === true && payment_schedule && payment_schedule[2].due_date === '')
      // },
      // {
      //   component: Button,
      //   onClick: () => this.showNextInstallment(),
      //   icon: addIcon,
      //   small: true,
      //   label: t('companyDesign.purchaseDetails.form.addButton'),
      //   hidden: this.checkElementHidden()
      // },
    ];

    const headerActions = <ButtonHeader onClick={() => this.handleSubmitPurchaseDetails(true)} label={t('header.buttons.saveAndExit')} />

    return (
      <>
      <Layout headerActions={headerActions} secure>
        <div className="company-design-purchase-details" data-test="container-company-design-purchase-details" role="form-page">
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

            <br />

            <center>
              <Button
                data-test="skip-button"
                label={t('companyDesign.purchaseDetails.form.skipButton')}
                onClick={() => {
                  if (company.additional_services.solicitor === true) {
                    navigate('/company-design/shareholder-details')
                  } else {
                    navigate('/company-design/solicitor-details');
                  }
                }}
                classes="link small"
              />
            </center>

            <Button
              data-test="submit-button"
              label={t('companyDesign.purchaseDetails.form.nextButton')}
              fullWidth
              onClick={() => this.handleSubmitPurchaseDetails(false)}
              classes="primary"
            />

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
  form: PropTypes.object,
  company: PropTypes.object
};

const mapStateToProps = state => ({
  form: state.form,
  company: state.companies.find(company => company.id === state.activeCompany)
});

const actions = { showLoader, hideLoader };

export const RawComponent = PurchaseDetails;
export default connect(mapStateToProps, actions)(withTranslation()(PurchaseDetails));
