import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Logo from '../../assets/images/logo-white.svg'

import './header.scss'

/**
 * Header
 * App header component
 * @param {Object} props - props object (for jsdoc)
 * @param {string} classNames - list of classname modifiers ['fullscreen']
 * @return {JSXElement} Header component
 */

const Header = (props) => {
  return (
    <header data-test="component-header" className={classNames('header', props.classNames)}>
      <div className="header-logo"><img src={Logo} alt="GetGround logo" /></div>

      <div className="header-menu-toggle" />
    </header>
  );
}

Header.propTypes = {
  classNames: PropTypes.string
}

export default Header;