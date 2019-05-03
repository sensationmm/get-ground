/**
 * inArray
 * checks if item exists in array
 * @author Kevin Reynolds
 * @param {string} item - item to search for
 * @param {array} array - array to search in
 * @return {boolean} whether item exists
 */
export const inArray = (item, array) => {
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

const functions = {
  inArray,
  objectKeyExists,
  getByValue
};

export default functions;
