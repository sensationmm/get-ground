import React from 'react';

import Input from '../Input/Input';

/**
 * InputPassword
 * Wrapper for password variant of Input
 * 
 * @param {Object} props - props object (see Input component)
 * @return {JSXElement} InputPassword
 */
const InputPassword = (props) => {
  return (
    <Input data-test="component-input-password" type="password" {...props} />
  );
};

export default InputPassword;
