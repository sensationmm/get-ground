import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Header from '../header/header'
import WindowSizeContext from '../../context/WindowSizeContext'
import '../../i18n';
import './layout.scss'

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

Layout.propTypes = {
  children: PropTypes.array
}
