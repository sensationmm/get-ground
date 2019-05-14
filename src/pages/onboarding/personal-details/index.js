
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import { navigate } from 'gatsby';

import Layout from 'src/components/Layout/Layout'
import formUtils from 'src/utils/form';

import Form from 'src/components/_layout/Form/Form';
import AddressFinder from 'src/components/_form/AddressFinder/AddressFinder';
import InputText from 'src/components/_form/InputText/InputText';
import InputPhone from 'src/components/_form/InputPhone/InputPhone';
import Datepicker from 'src/components/Datepicker/Datepicker';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import Select from 'src/components/_form/Select/Select';
import Button from 'src/components/_buttons/Button/Button';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import accountService from 'src/services/Account';
export const AccountService = new accountService();

import countryData from 'src/countries.json';
import { addressNow } from 'src/config/endpoints';
import addIcon from 'src/assets/images/add-icon.svg';
import 'src/styles/pages/onboarding-details.scss';

/**
  * OnboardingPersonalDetailsContainer
  * @param {object} date - event object
  * @param {object} e - event object
  * @param {function} t - i18next function for translating
  * @return {JSXElement} OnboardingPersonalDetailsContainer
  */
class OnboardingPersonalDetailsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...formUtils.initFormState({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        nationality: '',
        cityOfBirth: '',
        jobTitle: '',
        country: '',
        street: '',
        city: '',
        unitNumber: '',
        postcode: '',
        previousNames: '',
        phone: ''
      }),
      formattedDate: '',
      isAddressValid: true,
      isManualAddress: false,
      isDatepickerOpen: false,
      showPreviousNames: false,
      isTextAreaHidden: true
    };

    this.config = [];
  }

  /* istanbul ignore next */
  componentDidMount() {
    const script = document.createElement('script');

    script.onload = () => {
      window.addressNow.listen('load', (control) =>  {
        control.listen('populate', (address) => {
          
          this.setState((prevState) => ({
            ...this.state,
            values: {
              ...prevState.values,
              street: address.Street,
              city: address.City,
              unitNumber: address.BuildingNumber,
              postcode: address.PostalCode,
            },
            isAddressValid: true,
            isTextAreaHidden: false
          }));

        });
      });
    }

    script.src = addressNow
    script.async = true;
    document.body.appendChild(script);
  }
  
  toggleManualAddress = /* istanbul ignore next */ () => {
    document.getElementById('addressArea').value = '';

    this.setState((prevState) => ({
      isManualAddress: !this.state.isManualAddress,
      isTextAreaHidden: true
    }))
  };

  initFormValidation = () => {
    const { showLoader, hideLoader, t, userID } = this.props;

    const { 
      values: {
        firstName,
        middleName,
        lastName,
        nationality,
        cityOfBirth,
        jobTitle,
        country,
        street,
        city,
        unitNumber,
        postcode,
        previousNames,
        phone
      }, 
      formattedDate 
    } = this.state;

    /* istanbul ignore else */
    if (formUtils.validateForm(this)) {
      showLoader();
      
      AccountService.savePersonalDetails({
        userID,
        firstName,
        middleName,
        lastName,
        formattedDate,
        nationality,
        cityOfBirth,
        jobTitle,
        country,
        street,
        city,
        unitNumber,
        postcode,
        previousNames,
        phone
      }).then((response) => {
        hideLoader();
        /* istanbul ignore else */
        if (response.status === 201) {
          navigate('/account-pending');
        } else if (response.status === 400) {
          this.setState({
            ...this.state,
            errors: {
              form: t('form.correctErrors'),
            },
            showErrorMessage: true
          });
        }
      });
    }
  }

  submitPersonalDetails =   /* istanbul ignore next */ () => {
    const { isManualAddress } = this.state;

    if (!isManualAddress && document.getElementById('addressArea').value === '') {
      this.setState({ isAddressValid: false }, this.initFormValidation());
    } else {
      this.setState({ isAddressValid: true }, this.initFormValidation());
    }
  }

  /**
    * @param {string} country - value to set
    * @return {void}
    */
  handleCountryChange = country => window.addressNow.setCountry(country);

  openDatePicker = () => this.setState({isDatepickerOpen: true});

  closeDatePicker = () => this.setState({isDatepickerOpen: false});

  setDateOfBirth = date => {
    const element = document.getElementById('datepicker-field');

    // Element is null in unit test so blows up at this point...
    /* istanbul ignore else */
    if (!element) return;

    formUtils.setNativeValue(element, moment(date).format('Do MMMM YYYY'));
    element.dispatchEvent(new Event('input', { bubbles: true }));

    this.setState({ formattedDate: moment(date).format('L'), isDatepickerOpen: false });
  }

  render() {
    const { t } = this.props;
    const { 
      isManualAddress, 
      isAddressValid, 
      values, 
      isDatepickerOpen,
      showPreviousNames,
      errors, 
      showErrorMessage,
      isTextAreaHidden
    } = this.state;
  
    const setCountries = countryData.map((country, index) => {
      return (
        <option key={`country-${index}`} value={country.country_name}>{country.country_name}</option>
      );
    });

    this.config = [
      {
        stateKey: 'firstName',
        component: InputText,
        label: t('onBoarding.personalDetails.form.firstNameLabel'),
        value: values.firstName,
        validationFunction: 'validateLettersOnly'
      },
      {
        stateKey: 'middleName',
        component: InputText,
        label: t('onBoarding.personalDetails.form.middleNameLabel'),
        value: values.middleName
      },
      {
        stateKey: 'lastName',
        component: InputText,
        label: t('onBoarding.personalDetails.form.lastNameLabel'),
        value: values.lastName,
        validationFunction: 'validateLettersOnly'
      },
      {
        stateKey: 'previousNames',
        component: InputText,
        label: t('onBoarding.personalDetails.form.previousNamesLabel'),
        value: values.previousNames,
        validationFunction: 'validateLettersOnly',
        hidden: !showPreviousNames
      },
      {
        component: Button,
        onClick: () => this.setState({ showPreviousNames: true }),
        icon: addIcon,
        small: true,
        label: t('onBoarding.personalDetails.form.addNamesButton'),
      },
      {
        stateKey: 'dateOfBirth',
        component: InputText,
        label: t('onBoarding.personalDetails.form.dateOfBirthLabel'),
        value: values.dateOfBirth,
        validationFunction: 'validateRequired',
        onFocus: this.openDatePicker,
        id: 'datepicker-field',
        note: t('onBoarding.personalDetails.form.dateOfBirthNote')
      },
      {
        component: Datepicker,
        isDatepickerOpen: isDatepickerOpen,
        closeDatepicker: () => this.closeDatePicker(),
        setDateFieldValue: date => this.setDateOfBirth(date),
        confirmButtonText: t('onBoarding.personalDetails.datepicker.button2'),
        cancelButtonText: t('onBoarding.personalDetails.datepicker.button1')
      },
      {
        stateKey: 'nationality',
        component: Select,
        label: t('onBoarding.personalDetails.form.nationalityLabel'),
        value: values.nationality,
        options: setCountries,
        validationFunction: 'validateRequired'
      },
      {
        stateKey: 'cityOfBirth',
        component: InputText,
        label: t('onBoarding.personalDetails.form.cityOfBirthLabel'),
        value: values.cityOfBirth,
        validationFunction: 'validateLettersOnly'
      },
      {
        stateKey: 'jobTitle',
        component: InputText,
        label: t('onBoarding.personalDetails.form.jobTitleLabel'),
        value: values.jobTitle,
        validationFunction: 'validateRequired',
        wrapperClass: 'job-title-wrapper'
      },
      {
        stateKey: 'country',
        component: Select,
        label: t('onBoarding.personalDetails.form.countryLabel'),
        value: values.country,
        options: setCountries,
        classes: 'country-select',
        validationFunction: 'validateRequired', 
        callback: country => this.handleCountryChange(country)
      },
      {
        stateKey: 'isAddressValid',
        component: AddressFinder,
        toggleManualAddress: this.toggleManualAddress,
        isManualAddress: isManualAddress,
        isAddressValid: isAddressValid,
        buttonLabel: t('onBoarding.personalDetails.form.manualAddressButtonLabel'),
        addressFinderLabel: t('onBoarding.personalDetails.form.addressFinderLabel'),
        isHidden: isTextAreaHidden,
        editIconAltText: t('onBoarding.personalDetails.form.editIconAltText'),
        fieldErrorText: t('onBoarding.personalDetails.form.fieldErrorText'),
      },
      {
        stateKey: 'unitNumber',
        component: InputText,
        label: t('onBoarding.personalDetails.form.unitNumberLabel'),
        value: values.unitNumber,
        validationFunction: 'validateRequired',
        hidden: !isManualAddress
      },
      {
        stateKey: 'street',
        component: InputText,
        label: t('onBoarding.personalDetails.form.streetLabel'),
        value: values.street,
        validationFunction: 'validateRequired',
        hidden: !isManualAddress
      },
      {
        stateKey: 'city',
        component: InputText,
        label: t('onBoarding.personalDetails.form.cityLabel'),
        value: values.city,
        validationFunction: 'validateRequired',
        hidden: !isManualAddress
      },
      {
        stateKey: 'postcode',
        component: InputText,
        label: t('onBoarding.personalDetails.form.postcodeLabel'),
        value: values.postcode,
        validationFunction: 'validateRequired',
        hidden: !isManualAddress
      },
      {
        component: Button,
        onClick: this.toggleManualAddress,
        label: t('onBoarding.personalDetails.form.addressFinderButtonLabel'),
        hidden: !isManualAddress,
        classes: 'link small',
      },
      {
        stateKey: 'phone',
        component: InputPhone,
        label: t('onBoarding.personalDetails.form.phoneLabel'),
        value: values.phone,
        validationFunction: 'validatePhone'
      }
    ];

    return (
      <>
      <Layout>
        <div className="onboarding-details" data-test="container-onboarding-details" role="account">
          <h1>{t('onBoarding.personalDetails.heading')}</h1>

          <IntroBox>{t('onBoarding.personalDetails.intro')}</IntroBox>

          {showErrorMessage && 
              <ErrorBox>
              { errors.form 
                ? errors.form
                : 'Please fix your errors to proceed'
              }
              </ErrorBox>
            }

          <Form>
            {formUtils.renderForm(this)}

            <Button
              label={t('onBoarding.personalDetails.form.nextButton')}
              fullWidth
              onClick={this.submitPersonalDetails}
              classes="primary"
            />

            <Button classes="secondary" label={t('onBoarding.personalDetails.form.backButton')} fullWidth />
          </Form>
        </div>
      </Layout>
      </>
    );
  }
}

OnboardingPersonalDetailsContainer.propTypes = {
  t: PropTypes.func.isRequired,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  userID: PropTypes.number,
};

const mapStateToProps = (state) => ({
  userID: state.user.id
});

const actions = { showLoader, hideLoader };

export const RawComponent = OnboardingPersonalDetailsContainer;
export default connect(mapStateToProps, actions)(withTranslation()(OnboardingPersonalDetailsContainer));
