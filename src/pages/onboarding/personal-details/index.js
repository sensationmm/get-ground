
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
      formattedDate: '',
      isAddressValid: true,
      isManualAddress: false,
      isDatepickerOpen: false,
      showPreviousNames: false,
      isTextAreaHidden: true
    };

    this.config = null;
  }

  componentDidMount() {
    formUtils.initFormState({
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
    });
    
    const script = document.createElement('script');

    script.onload = () => {
      /* TODO: NEED TO GET THIS WORKING WITHOUT A TIMEOUT - THE SCRIPT COULD TAKE LONGER THAN A SECOND TO LOAD */
      setTimeout(() => {
        window.addressNow.controls[0].listen('populate', (address) => {
          formUtils.updateValue('street', address.Street);
          formUtils.updateValue('city', address.City);
          formUtils.updateValue('unitNumber', address.BuildingNumber);
          formUtils.updateValue('postcode', address.PostalCode);
          
          this.setState(() => ({
            ...this.state,
            isAddressValid: true,
            isTextAreaHidden: false
          }));

        });
      }, 1000);

    }
    
    script.src = addressNow
    script.async = true;
    document.body.appendChild(script);
  }
  
  componentWillUnmount() {
    formUtils.clearFormState();
  }

  toggleManualAddress = () => this.setState({ isManualAddress: !this.state.isManualAddress });

  initFormValidation = () => {
    const { showLoader, hideLoader, t, userID, form } = this.props;
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
      }
    } = form;
    const { formattedDate } = this.state;

    /* istanbul ignore else */
    if (formUtils.validateForm(this.config)) {
      const countryName = country ? country.split('] ').pop() : '';
      const nationalityName = nationality ? nationality.split('] ').pop() : '';
      showLoader();

      AccountService.savePersonalDetails({
        userID,
        firstName,
        middleName,
        lastName,
        formattedDate,
        nationalityName,
        cityOfBirth,
        jobTitle,
        countryName,
        street,
        city,
        unitNumber,
        postcode,
        previousNames,
        phone
      }).then((response) => {
        hideLoader();
        /* istanbul ignore else */
        if (response.status === 200) {
          navigate('/onboarding/id-check');
        } else if (response.status === 400) {
          formUtils.setFormError(t('form.correctErrors'));
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
  handleCountryChange = country => {
    const countryCode = country.split('[').pop().split(']')[0];
    window.addressNow.setCountry(countryCode);
  }

  openDatePicker = () => this.setState({isDatepickerOpen: true});

  closeDatePicker = () => this.setState({isDatepickerOpen: false});

  setDateOfBirth = /* istanbul ignore next */ date => {
    const element = document.getElementById('datepicker-field');
    
    if (!element) return;

    formUtils.setNativeValue(element, moment(date).format('Do MMMM YYYY'));
    element.dispatchEvent(new Event('input', { bubbles: true }));

    this.setState({ formattedDate: moment(date).format('YYYY-MM-DDTHH:mm:ss+00:00'), isDatepickerOpen: false });
  }

  render() {
    const { t, form } = this.props;
    const { values, errors, showErrorMessage } = form;
    const { 
      isManualAddress, 
      isAddressValid, 
      isDatepickerOpen,
      showPreviousNames,
      isTextAreaHidden
    } = this.state;
  
    const setCountries = (key) => countryData.map((country, index) => {
      return (
        <option 
          key={`country-${index}`} 
          value={`[${country.alpha_2_code}] ${country[key]}`}
        >
          {country[key]}
        </option>
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
        value: values.middleName,
        note: t('onBoarding.personalDetails.form.middleNameNote')
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
        note: t('onBoarding.personalDetails.form.dateOfBirthNote'),
        readOnly: true
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
        options: setCountries('nationality'),
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
        wrapperClass: 'job-title-wrapper',
        note: t('onBoarding.personalDetails.form.jobTitleNote'),
      },
      {
        stateKey: 'country',
        component: Select,
        label: t('onBoarding.personalDetails.form.countryLabel'),
        value: values.country,
        options: setCountries('country_name'),
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
      <Layout secure>
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
            {formUtils.renderForm(this.config)}

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
  form: PropTypes.object
};

const mapStateToProps = (state) => ({
  userID: state.user.id,
  form: state.form
});

const actions = { showLoader, hideLoader };

export const RawComponent = OnboardingPersonalDetailsContainer;
export default connect(mapStateToProps, actions)(withTranslation()(OnboardingPersonalDetailsContainer));
