
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import Helmet from 'react-helmet'

import Layout from 'src/components/Layout/Layout'
import formUtils from 'src/utils/form';

import Form from 'src/components/_layout/Form/Form';
import AddressFinder from 'src/components/_form/AddressFinder/AddressFinder';
import InputText from 'src/components/_form/InputText/InputText';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import Select from 'src/components/_form/Select/Select';
import Button from 'src/components/_buttons/Button/Button';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import countryData from 'src/countries.json';
import { addressNow } from 'src/config/endpoints';
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
        country: '',
        street: '',
        city: '',
        unitNumber: '',
        postcode: ''
      }),
      isAddressValid: true,
      isManualAddress: false,
    };

    this.config = [];
  }

  /* istanbul ignore next */
  componentDidMount() {
    window.addressNow.listen('load', (control) => {
      control.listen('populate', (address) => {
        this.setState({
          street: address.Street,
          city: address.City,
          unitNumber: address.BuildingNumber,
          postcode: address.PostalCode,
          isAddressValid: true
        });
      });
    });
  }
  
  resetAddress = /* istanbul ignore next */ () => {
    document.getElementById('addressArea').value = '';

    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        street: '',
        city: '',
        unitNumber: '',
        postcode: '',
      },
      isManualAddress: !this.state.isManualAddress
    }));
  }

  initFormValidation = /* istanbul ignore next */ () => {
    const requestUrl = 'https://staging-backend-236514.appspot.com/api/v1/users/95';
    const { showLoader, hideLoader } = this.props;
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

    const self = this;

    if (formUtils.validateForm(this)) {
      showLoader();

      axios({
        method: 'put',
        url: requestUrl,
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjk1LCJSb2xlIjoiIiwiZXhwIjoxNTU3MjI5NzIxLCJuYmYiOjE1NTcyMjYxMjJ9.rpobSbMFlCfh1qsF-RPcCQ_ZcY7JKi9W26enwl2F-lE',
          'Content-Type': 'application/json',
        },
        data: {
          'id': 95,
          'first_name': firstName,
          'middle_name': middleName,
          'last_name': lastName,
          'date_of_birth': formattedDate,
          'nationality_name': nationality,
          'birth_town': cityOfBirth,
          'occupation': jobTitle,
          'country': country,
          'street': street,
          'city': city,
          'unit_number': unitNumber,
          'postcode': postcode,
          'previous_names': previousNames,
          'phone_number': phone
        }
      }).then(function(response) {
        if(response.status === 201) {
          self.props.history.push('/account-pending');
          hideLoader();
        }
      }).catch((e) => {
        hideLoader();

        self.setState({
          ...this.state,
          errors: {
            form: 'There has been an issue with some of the details'
          },
          showErrorMessage: true
        });
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
      errors, 
      showErrorMessage
    } = this.state;
  
    const setCountries = countryData.map((country, index) => {
      return (
        <option key={`country-${index}`} value={country.country_name}>{country.country_name}</option>
      );
    });

    this.config = [
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
        resetAddress: this.resetAddress,
        isManualAddress: isManualAddress,
        isAddressValid: isAddressValid,
        buttonLabel: t('onBoarding.personalDetails.form.manualAddressButtonLabel'),
        addressFinderLabel: t('onBoarding.personalDetails.form.addressFinderLabel')
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
        onClick: this.resetAddress,
        label: t('onBoarding.personalDetails.form.addressFinderButtonLabel'),
        hidden: !isManualAddress,
        classes: 'link',
      },
    ];

    return (
      <>
      <Helmet
        script={[
          {
            'src': addressNow , 'type': 'text/javascript', 'innerHTML': 'window.addressNow'
          }
        ]}
      />
      <Layout>
        <div className="onboarding-details" data-test="container-onboarding-details" role="account">
          <h1>{t('companyDesign.propertyAddress.heading')}</h1>

          <IntroBox>{t('companyDesign.propertyAddress.intro')}</IntroBox>

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
  hideLoader: PropTypes.func
};

const actions = { showLoader, hideLoader };

export const RawComponent = OnboardingPersonalDetailsContainer;
export default connect(null, actions)(withTranslation()(OnboardingPersonalDetailsContainer));
