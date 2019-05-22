import React from 'react'
import PropTypes from 'prop-types';

import { ReduxWrapper } from './src/state/ReduxWrapper'

export const wrapRootElement =  ({ element }) => {
  return (
    <ReduxWrapper>
        {element}
    </ReduxWrapper>
  )
}

wrapRootElement.propTypes = {
  element: PropTypes.object
}
