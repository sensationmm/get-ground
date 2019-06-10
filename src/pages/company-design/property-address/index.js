
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby'

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

import { addressNow } from 'src/config/endpoints';
import 'src/styles/pages/onboarding-details.scss';

import propertyService from 'src/services/Property';
const PropertyService = new propertyService();

/**
  * PropertyAddress
  * @param {object} e - event object
  * @param {function} t - i18next function for translating
  * @return {JSXElement} PropertyAddress
  */
class PropertyAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddressValid: true,
      isManualAddress: false,
      isTextAreaHidden: true
    };

    this.config = null;
  }

  /* istanbul ignore next */
  componentDidMount() {
    formUtils.initFormState({
      country: '',
      street: '',
      city: '',
      unitNumber: '',
      postcode: ''
    });

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

  componentWillUnmount() {
    formUtils.clearFormState();
  }

  toggleManualAddress = /* istanbul ignore next */ () => {
    document.getElementById('addressArea').value = '';

    this.setState((prevState) => ({
      isManualAddress: !this.state.isManualAddress,
      isTextAreaHidden: true
    }))
  };

  initFormValidation = /* istanbul ignore next */ () => {
    const { showLoader, hideLoader, t, form } = this.props;
    const {
      values: {
        street,
        city,
        unitNumber,
        postcode,
      }
    } = form;

    if (formUtils.validateForm(this.config)) {
      showLoader();

      PropertyService.SavePropertyAddress({street, city, unitNumber, postcode}).then((response) => {
        hideLoader();
        if (response.status === 201) {
          navigate('/company-design/purchase-details');
        } else if (response.status === 400) {
          this.setState({
            ...this.state,
            errors: {
              form: t('companyDesign.propertyAddress.form.error')
            },
            showErrorMessage: true
          });
        }
      });
    }
  }

  submitPropertyAddress =   /* istanbul ignore next */ () => {
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

  render() {
    const { t, form } = this.props;
    const {
      isManualAddress,
      isAddressValid,
      isTextAreaHidden
    } = this.state;
    const { values, errors, showErrorMessage } = form;

    const setCountries = [
      <option key='country-0' value='England'>England</option>,
      <option key='country-1' value='Wales'>Wales</option>
    ];

    this.config = [
      {
        stateKey: 'country',
        component: Select,
        label: t('companyDesign.propertyAddress.form.countryLabel'),
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
        buttonLabel: t('companyDesign.propertyAddress.form.manualAddressButtonLabel'),
        addressFinderLabel: t('companyDesign.propertyAddress.form.addressFinderLabel'),
        isHidden: isTextAreaHidden,
        editIconAltText: t('companyDesign.propertyAddress.form.editIconAltText'),
        fieldErrorText: t('companyDesign.propertyAddress.form.fieldErrorText'),
      },
      {
        stateKey: 'unitNumber',
        component: InputText,
        label: t('companyDesign.propertyAddress.form.unitNumberLabel'),
        value: values.unitNumber,
        validationFunction: 'validateRequired',
        hidden: !isManualAddress
      },
      {
        stateKey: 'street',
        component: InputText,
        label: t('companyDesign.propertyAddress.form.streetLabel'),
        value: values.street,
        validationFunction: 'validateRequired',
        hidden: !isManualAddress
      },
      {
        stateKey: 'city',
        component: InputText,
        label: t('companyDesign.propertyAddress.form.cityLabel'),
        value: values.city,
        validationFunction: 'validateRequired',
        hidden: !isManualAddress
      },
      {
        stateKey: 'postcode',
        component: InputText,
        label: t('companyDesign.propertyAddress.form.postcodeLabel'),
        value: values.postcode,
        validationFunction: 'validateRequired',
        hidden: !isManualAddress
      },
      {
        component: Button,
        onClick: this.toggleManualAddress,
        label: t('companyDesign.propertyAddress.form.addressFinderButtonLabel'),
        hidden: !isManualAddress,
        classes: 'link small',
      },
    ];

    return (
      <>
      <Layout>
        <div className="company-design-property-address" data-test="container-company-design-property-address">
          <h1>{t('companyDesign.propertyAddress.heading')}</h1>

          <IntroBox>{t('companyDesign.propertyAddress.intro')}</IntroBox>

          {showErrorMessage &&
              <ErrorBox>
              { errors.form
                ? errors.form
                : t('companyDesign.propertyAddress.form.error')
              }
              </ErrorBox>
            }

          <Form>
            {formUtils.renderForm(this.config)}

            <Button
              label={t('companyDesign.propertyAddress.form.nextButton')}
              fullWidth
              onClick={this.submitPropertyAddress}
              classes="primary"
            />

            <Button
              classes="secondary"
              label={t('companyDesign.propertyAddress.form.backButton')}
              fullWidth
              onClick={() => navigate('/company-design/')}
            />
          </Form>
        </div>
      </Layout>
      </>
    );
  }
}

PropertyAddress.propTypes = {
  t: PropTypes.func.isRequired,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  form: PropTypes.object
};

const mapStateToProps = state => ({
  form: state.form
});

const actions = { showLoader, hideLoader };

export const RawComponent = PropertyAddress;
export default connect(mapStateToProps, actions)(withTranslation()(PropertyAddress));
