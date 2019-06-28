
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
import Checkbox from 'src/components/_form/Checkbox/Checkbox';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import { addressNow } from 'src/config/endpoints';

import './property-address.scss';

import companyService from 'src/services/Company';
const CompanyService = new companyService();

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
    const { company: { property_address: { address, is_confirmed }}} = this.props;
    const script = document.createElement('script');
    const reduxFields = address;

    reduxFields.is_confirmed = is_confirmed;

    formUtils.initFormState({
      country_name: '',
      street: '',
      posttown: '',
      premise: '',
      postcode: '',
      is_confirmed: ''
    }, reduxFields);

    script.onload = () => {

      const timerId = setInterval(() => {
        if(window.addressNow.controls[0]){

          window.addressNow.controls[0].listen('populate', (address) => {
            formUtils.updateValue('street', address.Street);
            formUtils.updateValue('posttown', address.City);
            formUtils.updateValue('premise', address.BuildingNumber);
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
    const { showLoader, hideLoader, t, form, company } = this.props;
    const { values: { premise, street, posttown, postcode, is_confirmed, country_name } } = form;

    if (formUtils.validateForm(this.config)) {
      showLoader();

      const payload = {
        address: {
          premise,
          street,
          posttown,
          postcode,
          country_name
        },
        is_confirmed
      }

      CompanyService.updateCompany(payload, 'property_address', company.id).then((response) => {
        hideLoader();
        if (response.status === 200) {
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

  saveAndExit = async () => {
    const { showLoader, hideLoader, form, company } = this.props;
    const { values: { premise, street, posttown, postcode, is_confirmed, country_name }, errors } = form;

    formUtils.validateForm(this.config);

    await Object.keys(errors).forEach(async (key) => {
      await formUtils.updateValue(key, '');
    });

    const payload = {
      address: {
        premise,
        street,
        posttown,
        postcode,
        country_name
      },
      is_confirmed
    }

    showLoader();

    CompanyService.updateCompany(payload, 'property_address', company.id).then((response) => {
      hideLoader();
      if (response.status === 200) {
        navigate('/company-design');
      }
    });
  }

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
        stateKey: 'country_name',
        component: Select,
        label: t('companyDesign.propertyAddress.form.countryLabel'),
        value: values.country_name,
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
        component: Button,
        onClick: this.toggleManualAddress,
        label: t('companyDesign.propertyAddress.form.addressFinderButtonLabel'),
        hidden: !isManualAddress,
        classes: 'link small',
      },
      {
        stateKey: 'premise',
        component: InputText,
        label: t('companyDesign.propertyAddress.form.unitNumberLabel'),
        value: values.premise,
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
        stateKey: 'posttown',
        component: InputText,
        label: t('companyDesign.propertyAddress.form.cityLabel'),
        value: values.posttown,
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
        component: 'br'
      },
      {
        stateKey: 'is_confirmed',
        component: Checkbox,
        label: t('companyDesign.propertyAddress.form.toRentConfirmationLabel'),
        checked: values.is_confirmed,
        validationFunction: 'validateRequired'
      }
    ];

    const headerActions = <ButtonHeader onClick={this.saveAndExit} label={t('header.buttons.saveAndExit')} />

    return (
      <>
      <Layout headerActions={headerActions} secure>
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

            <br />

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
              onClick={() => navigate('/company-design/add-services')}
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
  form: PropTypes.object,
  company: PropTypes.object
};

const mapStateToProps = state => ({
  form: state.form,
  company: state.companies.find(company => company.id === state.activeCompany)
});

const actions = { showLoader, hideLoader };

export const RawComponent = PropertyAddress;
export default connect(mapStateToProps, actions)(withTranslation()(PropertyAddress));
