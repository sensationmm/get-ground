import React from 'react';

import Button from '../Button/Button'

/**
 * ButtonHeader
 * Renders a header style button
 *
 * @author Kevin Reynolds
 * @param {Object} props - props object (see Button component)
 * @return {JSXElement} ButtonHeader
 */
const ButtonHeader = props => {
  return (
    <Button
      data-test="component-button-header"
      classes="tertiary"
      {...props}
    />
  );
};

export default ButtonHeader;
