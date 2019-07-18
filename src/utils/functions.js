import React from 'react';
import countryData from 'src/countries.json';

/**
 * inArray
 * checks if item exists in array
 * @author Kevin Reynolds
 * @param {string} item - item to search for
 * @param {array} array - array to search in
 * @return {boolean} whether item exists
 */
export const inArray = (item, array) => {
  if (array === undefined) return false;
  return array.indexOf(item) >= 0;
};

/**
 * objectKeyExists
 * checks if key exists on object
 * @param {string} key - key to search for
 * @param {Object} object - object to search in
 * @return {boolean} whether key exists
 */
export const objectKeyExists = (key, object) => {
  return object[key] ? true : false;
};

/**
 * getByValue
 * returns object from array by specified key value
 * @param {array} arr - array to search
 * @param {string} key - key to search for
 * @param {any} value - key value to match
 * @return {Object|null} matched object, null if key/value pair not found
 */
export const getByValue = (arr, key, value) => {
  const filteredArray = arr.filter((obj) => {
      return obj[key] === value;
  });

  return filteredArray.length ? filteredArray[0] : null;
};

export const setCountries = (key) => {
  const heroCountries = ['GBR','SGP','HKG'];

  const createOption = (country, key, index) => {
    return (
      <option 
        key={`country-${index}`} 
        value={`[${country.alpha_3_code}] ${country[key]}`}
      >
        {country[key]}
      </option>
    );
  }

  const countries = countryData.sort((a, b) => {
    return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0); 
  }).map((country, index) => {
    return createOption(country, key, index);
  });

  const popular = heroCountries.map((code) => {
    return createOption(getByValue(countryData, 'alpha_3_code', code), key, code);
  });

  return [
    <optgroup label='Popular' key='group-popular'>{popular}</optgroup>,
    <optgroup label='Countries' key='group-countries'>{countries}</optgroup>
  ];
}

export const formatCurrency = (amount, thousands = ',') => {
  if(!amount) {
    return null;
  }
  
  const i = parseInt(amount = Math.abs(Number(amount) || 0)).toString();
  const j = (i.length > 3) ? i.length % 3 : 0;

  return (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands);
};

export const stripCurrency = amount => {
  return amount.replace(/[,.]/g, '');
}

const functions = {
  inArray,
  objectKeyExists,
  getByValue
};

export default functions;
