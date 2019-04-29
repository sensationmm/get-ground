import React from "react"
import { ReduxWrapper } from './src/state/ReduxWrapper'

import { WindowSizeProvider } from "./src/context/WindowSizeContext"

export const wrapRootElement =  ({ element }) => {
  return (
    <ReduxWrapper>
      <WindowSizeProvider>
        {element}
      </WindowSizeProvider>
    </ReduxWrapper>
  )
}
