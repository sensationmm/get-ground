import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Header from 'src/components/Header/Header';
import WindowSizeContext from 'src/context/WindowSizeContext';
import 'src/i18n';
import './layout.scss'

const Layout = ({ children }) => {
  const windowContext = useContext(WindowSizeContext);

  window.addEventListener('resize', (window) => windowContext.setResize({
      width: window.currentTarget.innerWidth, height:window.currentTarget.innerHeight
    }))

  return (
    <>
      <Header classNames={`${children.props.role}`} />
      <div className={classNames('app', children.props.role)}>
        <main className="main">{children}</main>
      </div>
    </>
  )
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.object,
}
