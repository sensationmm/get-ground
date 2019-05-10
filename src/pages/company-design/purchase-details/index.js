
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';

import Layout from 'src/components/Layout/Layout'
import formUtils from 'src/utils/form';

import Form from 'src/components/_layout/Form/Form';
import InputText from 'src/components/_form/InputText/InputText';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import Button from 'src/components/_buttons/Button/Button';
import RadioGroup from 'src/components/_form/RadioGroup/RadioGroup';
import Datepicker from 'src/components/Datepicker/Datepicker';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import 'src/styles/pages/onboarding-details.scss';

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
      ...formUtils.initFormState({
        priceOfProperty: '',
        newBuild: '',
        expectedExchange: '',
        completionDate: '',
        depositDueDate: '',
        exchangeDate: '',
        firstInstallmentDate: ''
      }),
      isDatepickerOpen: false,
      focusedDateField: ''
    };

    this.config = [];
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

  setDateFieldValue = date => {
    const { focusedDateField } = this.state
    const element = document.getElementById(focusedDateField);

    // Element is null in unit test so blows up at this point...
    /* istanbul ignore else */
    if (!element) return;

    formUtils.setNativeValue(element, moment(date).format('Do MMMM YYYY'));
    element.dispatchEvent(new Event('input', { bubbles: true }));

    this.setState({ [focusedDateField]: moment(date).format('L'), isDatepickerOpen: false });
  }

  render() {
    const { t } = this.props;
    const { 
      values,
      isDatepickerOpen
    } = this.state;

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
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.priceOfPropertyLabel'),
        value: values.priceOfProperty,
        validationFunction: 'validateRequired',
        note: t('companyDesign.purchaseDetails.form.priceOfPropertyNote'),
      },
      {
        stateKey: 'newBuild',
        component: RadioGroup,
        groupLabel: t('companyDesign.purchaseDetails.form.newBuildLabel'),
        value: values.newBuild,
        name: 'newBuildRadio',
        items: this.radioConfig,
        selectedValue: values.newBuild
      },
      {
        stateKey: 'completionDate',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.completionDateLabel'),
        value: values.completionDate,
        validationFunction: 'validateRequired',
        onFocus: this.openDatePicker,
        id: 'completionDate',
      },
      {
        component: 'h1',
        children: t('companyDesign.purchaseDetails.heading2')
      },
      {
        stateKey: 'depositDueDate',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.depositDueLabel'),
        value: values.depositDueDate,
        validationFunction: 'validateRequired',
        onFocus: this.openDatePicker,
        id: 'depositDueDate',
      },
      {
        stateKey: 'firstInstallmentDate',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.firstInstallmentDateLabel'),
        value: values.firstInstallmentDate,
        validationFunction: 'validateRequired',
        onFocus: this.openDatePicker,
        id: 'firstInstallmentDate',
      },
      {
        stateKey: 'expectedExchange',
        component: RadioGroup,
        groupLabel: t('companyDesign.purchaseDetails.form.expectedExchangeLabel'),
        value: values.expectedExchange,
        name: 'exchangeDateRadios',
        items: this.radioConfig,
        selectedValue: values.expectedExchange
      },
      {
        stateKey: 'exchangeDate',
        component: InputText,
        label: t('companyDesign.purchaseDetails.form.expectedExchangeDateLabel'),
        value: values.exchangeDate,
        validationFunction: 'validateRequired',
        onFocus: this.openDatePicker,
        id: 'exchangeDate',
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
      <Layout>
        <div className="company-design-purchase-details" data-test="container-company-design-purchase-details">
          <h1>{t('companyDesign.purchaseDetails.heading')}</h1>

          <IntroBox>{t('companyDesign.purchaseDetails.intro')}</IntroBox>

          {/* {showErrorMessage && 
              <ErrorBox>
              { errors.form 
                ? errors.form
                : t('companyDesign.propertyAddress.form.error')
              }
              </ErrorBox>
            } */}

          <Form>
            {formUtils.renderForm(this)}

            <Button
              label={t('companyDesign.purchaseDetails.form.nextButton')}
              fullWidth
              onClick={this.submitPropertyAddress}
              classes="primary"
            />

            <Button classes="secondary" label={t('companyDesign.purchaseDetails.form.backButton')} fullWidth />
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
  hideLoader: PropTypes.func
};

const actions = { showLoader, hideLoader };

export const RawComponent = PurchaseDetails;
export default connect(null, actions)(withTranslation()(PurchaseDetails));
