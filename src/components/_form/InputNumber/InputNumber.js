import React from 'react';

import Input from '../Input/Input';

/**
 * InputNumber
 * Wrapper for number variant of Input
 * 
 * @param {Object} props - props object (see Input component)
 * @return {JSXElement} InputNumber
 */
const InputNumber = props => {
  return (
    <Input data-test="component-input-number" type="number" {...props} />
  );
};

export default InputNumber;
