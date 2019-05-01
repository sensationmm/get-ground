import React from 'react';

import Input from '../Input/Input';

/**
 * InputText
 * Wrapper for text variant of Input
 * 
 * @param {Object} props - props object (see Input component)
 * @return {JSXElement} InputText
 */
const InputText = (props) => {
  return (
    <Input data-test="component-input-text" type="text" {...props} />
  );
};

export default InputText;
