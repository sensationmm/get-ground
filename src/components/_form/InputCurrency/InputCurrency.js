import React from 'react';

import Input from '../Input/Input';

/**
 * InputCurrency
 * Wrapper for currency variant of Input
 * 
 * @param {Object} props - props object (see Input component)
 * @return {JSXElement} InputNumber
 */
const InputCurrency = props => {
  return (
    <Input
      wrapperClass="currency"
      data-test="component-input-currency"
      type="text"
      {...props}
    />
  );
};

export default InputCurrency;
