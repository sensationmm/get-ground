/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import ReduxWrapper from './src/state/ReduxWrapper';
import React from "react"

import { WindowSizeProvider } from "./src/context/WindowSizeContext"

export const wrapRootElement = ({ element }) => (
    <WindowSizeProvider>{element}</WindowSizeProvider>
)
