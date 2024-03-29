import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import { navigate } from 'gatsby';
import { omitBy, isNull } from 'lodash';

import Layout from 'src/components/Layout/Layout'
import formUtils from 'src/utils/form';

import Form from 'src/components/_layout/Form/Form';
import AddressFinder from 'src/components/_form/AddressFinder/AddressFinder';
import InputText from 'src/components/_form/InputText/InputText';
import InputPhone from 'src/components/_form/InputPhone/InputPhone';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import Select from 'src/components/_form/Select/Select';
import Button from 'src/components/_buttons/Button/Button';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import { setErrors, clearFormErrors } from 'src/state/actions/form';

import accountService from 'src/services/Account';
export const AccountService = new accountService();

import { setCountries } from 'src/utils/functions';
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

    const { premise, previous_names } = this.props.form.values;

    this.state = {
      formattedDate: '',
      isAddressValid: true,
      isManualAddress: typeof premise === 'string',
      isDatepickerOpen: false,
      showPreviousNames: previous_names !== '' &&  previous_names !== null &&  previous_names !== undefined,
      isTextAreaHidden: true
    };

    this.config = null;
  }

  componentDidMount() {
    const script = document.createElement('script');

    formUtils.initFormState({
      first_name: '',
      middle_name: '',
      last_name: '',
      date_of_birth: '',
      nationality: '',
      birth_town: '',
      occupation: '',
      country: '',
      street: '',
      posttown: '',
      premise: '',
      postcode: '',
      previous_names: '',
      phone_number: ''
    }, this.props.user);

    script.onload = () => {

      const timerId = setInterval(() => {
        if(window.addressNow.controls[0]){

          window.addressNow.controls[0].listen('populate', (address) => {
            let premise = address.BuildingNumber ? address.BuildingNumber : address.BuildingName;

            if(address.SubBuilding) {
              premise = [address.SubBuilding, address.BuildingName, address.BuildingNumber].join(', ')
            }

            formUtils.updateValue('street', address.Street);
            formUtils.updateValue('posttown', address.City);
            formUtils.updateValue('premise', premise);
            formUtils.updateValue('postcode', address.PostalCode);

            this.setState(() => ({
              ...this.state,
              isAddressValid: true,
              isTextAreaHidden: false
            }));

          });
          clearInterval(timerId);
        }
      }, 500);

    }

    script.src = addressNow
    script.async = true;
    document.body.appendChild(script);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.isManualAddress !== (typeof this.props.form.values.premise === 'string')) {
      this.setState({
        isManualAddress: typeof this.props.form.values.premise === 'string'
      })
    }
  }

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  toggleManualAddress = () => {this.setState({ isManualAddress: !this.state.isManualAddress });}

  initFormValidation = () => {
    const { showLoader, hideLoader, t, userID, form } = this.props;

    if (formUtils.validateForm(this.config)) {
      const countryName = form.values.country ? form.values.country.split('] ').pop() : null;
      const nationalityName = form.values.nationality ? form.values.nationality.split('] ').pop() : null;

      showLoader();

      const payload = this.props.form.values;
      delete payload.nationality;

      const formattedDate = moment(payload.date_of_birth, 'DD/MM/YYYY').format('YYYY-MM-DD');

      AccountService.savePersonalDetails({
        userID,
        ...payload,
        date_of_birth: formattedDate,
        nationality_name: nationalityName,
        country: countryName
      }).then((response) => {
        hideLoader();
        if (response.status === 200) {
          navigate('/onboarding/id-check');
        } else if (response.status === 400) {
          formUtils.setFormError(t('form.correctErrors'));
        }
      });
    }
  }

  saveAndExit = async () => {
    const { showLoader, hideLoader, userID, form } = this.props;
    const { values, errors } = form;

    await Object.keys(errors).forEach(async (key) => {
      await formUtils.updateValue(key, '');
    });

    const countryName = values.country && values.country !== '[undefined] undefined' ? values.country.split('] ').pop() : null;

    const nationalityName = values.nationality && values.nationality !== '[undefined] undefined' ? values.nationality.split('] ').pop() : null;

    showLoader();

    const payload = this.props.form.values;
    delete payload.nationality;

    const formattedDate = payload.date_of_birth !== '' ? moment(payload.date_of_birth, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss+00:00') : null;

    const payloadWithoutNullValues = omitBy(
      {
        userID,
        ...payload,
        date_of_birth: formattedDate,
        nationality_name: nationalityName,
        country: countryName
      },
      isNull
    )


    AccountService.savePersonalDetails(payloadWithoutNullValues).then((response) => {
      hideLoader();
      if (response.status === 200) {
        navigate('/onboarding');
      }
    });
  }

  submitPersonalDetails = () => {
    const { isManualAddress } = this.state;

    if (!isManualAddress && (document.getElementById('addressArea') && document.getElementById('addressArea').value === '')) {
      this.props.setErrors({
        isAddressValid: 'Required'
      })
      this.setState({ isAddressValid: false }, this.initFormValidation());
    } else {
      this.props.clearFormErrors();
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
      showPreviousNames,
      isTextAreaHidden
    } = this.state;


    /* istanbul ignore next */
    this.config = [
      {
        stateKey: 'first_name',
        component: InputText,
        label: t('onBoarding.personalDetails.form.firstNameLabel'),
        value: values.first_name,
        validationFunction: ['validateRequired', 'validateMinimum', 'validateLettersOnly'],
        validationParam: [null, 2, null]
      },
      {
        stateKey: 'middle_name',
        component: InputText,
        label: t('onBoarding.personalDetails.form.middleNameLabel'),
        value: values.middle_name,
        note: t('onBoarding.personalDetails.form.middleNameNote'),
        validationFunction: ['validateMinimum', 'validateLettersOnly'],
        validationParam: [2, null]
      },
      {
        stateKey: 'last_name',
        component: InputText,
        label: t('onBoarding.personalDetails.form.lastNameLabel'),
        value: values.last_name,
        validationFunction: ['validateRequired', 'validateMinimum', 'validateLettersOnly'],
        validationParam: [null, 2, null]
      },
      {
        stateKey: 'previous_names',
        component: InputText,
        label: t('onBoarding.personalDetails.form.previousNamesLabel'),
        value: values.previous_names,
        validationFunction: ['validateMinimum', 'validateLettersOnly'],
        validationParam: [2, null],
        hidden: !showPreviousNames
      },
      {
        component: Button,
        onClick: () => this.setState({ showPreviousNames: true }),
        icon: addIcon,
        small: true,
        label: t('onBoarding.personalDetails.form.addNamesButton'),
        hidden: showPreviousNames
      },
      {
        stateKey: 'date_of_birth',
        component: InputText,
        label: t('onBoarding.personalDetails.form.dateOfBirthLabel'),
        value: values.date_of_birth,
        validationFunction: ['validateRequired', 'validateDate'],
        placeholder: 'DD/MM/YYYY',
        id: 'datepicker-field',
        note: t('onBoarding.personalDetails.form.dateOfBirthNote'),
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
        stateKey: 'birth_town',
        component: InputText,
        label: t('onBoarding.personalDetails.form.cityOfBirthLabel'),
        value: values.birth_town,
        validationFunction: ['validateRequired', 'validateLettersOnly'],
      },
      {
        stateKey: 'occupation',
        component: InputText,
        label: t('onBoarding.personalDetails.form.jobTitleLabel'),
        value: values.occupation,
        validationFunction: ['validateRequired', 'validateLettersOnly'],
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
        fieldErrorText: t('onBoarding.personalDetails.form.fieldErrorText')
      },
      {
        stateKey: 'premise',
        component: InputText,
        label: t('onBoarding.personalDetails.form.unitNumberLabel'),
        value: values.premise,
        validationFunction: ['validateRequired', 'validateNoSpecial'],
        hidden: !isManualAddress
      },
      {
        stateKey: 'street',
        component: InputText,
        label: t('onBoarding.personalDetails.form.streetLabel'),
        value: values.street,
        validationFunction: ['validateRequired', 'validateNoSpecial'],
        hidden: !isManualAddress
      },
      {
        stateKey: 'posttown',
        component: InputText,
        label: t('onBoarding.personalDetails.form.cityLabel'),
        value: values.posttown,
        validationFunction: ['validateRequired', 'validateNoSpecial'],
        hidden: !isManualAddress
      },
      {
        stateKey: 'postcode',
        component: InputText,
        label: t('onBoarding.personalDetails.form.postcodeLabel'),
        value: values.postcode,
        validationFunction: ['validateRequired', 'validateNoSpecial'],
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
        stateKey: 'phone_number',
        component: InputPhone,
        label: t('onBoarding.personalDetails.form.phoneLabel'),
        value: values.phone_number,
        validationFunction: 'validatePhone'
      }
    ];

    const headerActions = <ButtonHeader onClick={this.saveAndExit} label={t('header.buttons.saveAndExit')} />;

    return (
      <>
      <Layout secure headerActions={headerActions}>
        <div className="onboarding-details" data-test="container-onboarding-details" role="account form-page">
          <h1>{t('onBoarding.personalDetails.heading')}</h1>

          <IntroBox>{t('onBoarding.personalDetails.intro')}</IntroBox>

          {showErrorMessage &&
            <ErrorBox>{ errors.form ? errors.form : t('form.correctErrors') }</ErrorBox>
          }

          <Form>
            {formUtils.renderForm(this.config)}

            <br />

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
  userID: PropTypes.string,
  user: PropTypes.object,
  form: PropTypes.object,
  setErrors: PropTypes.func.isRequired,
  clearFormErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  userID: state.user.id,
  user: state.user,
  form: state.form
});

const actions = { showLoader, hideLoader, setErrors, clearFormErrors };

export const RawComponent = OnboardingPersonalDetailsContainer;
export default connect(mapStateToProps, actions)(withTranslation()(OnboardingPersonalDetailsContainer));
