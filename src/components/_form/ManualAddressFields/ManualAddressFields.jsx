import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InputText from '../InputText/InputText';

/**
  * ManualAddressFields
  * @param {object} props - for JSdoc
  * @param {function} onInputChange - function for setting the field value
  * @param {string} unitNumber - unit number value (string)
  * @param {string} street - street value (string)
  * @param {string} city - city value (string)
  * @param {string} postcode - postcode value (string)
  * @return {JSXElement} ManualAddressFields
  */
const ManualAddressFields = props => {
  const [ t ] = useTranslation();
  const {
    onInputChange,
    unitNumber,
    street,
    city,
    postcode
  } = props;

  return (
    <div data-test="component-manual-address-fields">
      <InputText 
        id="unitNumber"
        label={t('onBoarding.personalDetails.form.unitNumberLabel')}
        onChange={(value, id) => {onInputChange(value, id)}}
        value={unitNumber}
      />
      <InputText 
        id="street"
        label={t('onBoarding.personalDetails.form.streetLabel')}
        onChange={(value, id) => { onInputChange(value, id)}}
        value={street}
      />
      <InputText 
        id="city"
        label={t('onBoarding.personalDetails.form.cityLabel')}
        onChange={(value, id) => {onInputChange(value, id)}}
        value={city}
      />
      <InputText 
        id="postcode"
        label={t('onBoarding.personalDetails.form.postcodeLabel')}
        onChange={(value, id) => {onInputChange(value, id)}}
        value={postcode}
      />
    </div>
  )
}

ManualAddressFields.propTypes = {
  onInputChange: PropTypes.func,
  unitNumber: PropTypes.string,
  street: PropTypes.string,
  city: PropTypes.string,
  postcode: PropTypes.string
};

export default ManualAddressFields;
