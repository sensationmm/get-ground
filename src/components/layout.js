import React, { useContext } from "react";
import Header from "./header"
import WindowSizeContext from '../context/WindowSizeContext';
import '../i18n';
import '../styles/layout.scss'

const Layout = ({ children }) => {
  const windowContext = useContext(WindowSizeContext);

  window.addEventListener('resize', (window) => windowContext.setResize({
      width: window.currentTarget.innerWidth, height:window.currentTarget.innerHeight
    }))

  return (
    <>
      <Header className="header"/>
      <div className="app">
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout;
