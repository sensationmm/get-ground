// import { Link } from "gatsby"
// import PropTypes from "prop-types"
// import React from "react"

// const Header = ({ siteTitle }) => (
//   <header
//     style={{
//       background: `rebeccapurple`,
//       marginBottom: `1.45rem`,
//     }}
//   >
//     <div
//       style={{
//         margin: `0 auto`,
//         maxWidth: 960,
//         padding: `1.45rem 1.0875rem`,
//       }}
//     >
//       <h1 style={{ margin: 0 }}>
//         <Link
//           to="/"
//           style={{
//             color: `white`,
//             textDecoration: `none`,
//           }}
//         >
//           {siteTitle}
//         </Link>
//       </h1>
//     </div>
//   </header>
// )

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

// export default Header
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Logo from '../assets/images/logo-white.svg'

import '../styles/header.scss'

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
