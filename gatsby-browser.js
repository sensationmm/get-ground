import React from 'react'
import PropTypes from 'prop-types';

import { ReduxWrapper } from './src/state/ReduxWrapper'

import { WindowSizeProvider } from './src/context/WindowSizeContext'

export const wrapRootElement =  ({ element }) => {
  return (
    <ReduxWrapper>
      <WindowSizeProvider>
        {element}
      </WindowSizeProvider>
    </ReduxWrapper>
  )
}

wrapRootElement.propTypes = {
  element: PropTypes.object
}
