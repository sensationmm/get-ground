import React from 'react'
import { renderToString } from 'react-dom/server'

import { ReduxWrapper } from 'src/state/ReduxWrapper'

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {

  const ConnectedBody = () => (
    <ReduxWrapper>
      {bodyComponent}
    </ReduxWrapper>
  )
  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}
