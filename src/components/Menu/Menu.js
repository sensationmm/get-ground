
import React, { Component } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './menu.scss';

/**
 * Menu
 *
 * @return {JSXElement} Menu
 */
class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeInLinks: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ fadeInLinks: true })
    }, 200);
  }

  render() {
    const { menuLinks } = this.props;
    const { fadeInLinks } = this.state;
    return(
      <div className="menu" data-test="component-menu">
        <ul className={classNames('menu--list', 
            { 'fade-in': fadeInLinks }
          )}>
          {menuLinks.map((menuLink, i) => {
            return(
              <li className="menu--list-item" key={`menu-link-${i}`}>
                {menuLink.link ?
                  <Link to={`${menuLink.link}`}>{`${menuLink.text}`}</Link>
                  :
                  <Link to="/" onClick={menuLink.function}>{`${menuLink.text}`}</Link>
                }
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

Menu.propTypes = {
  menuLinks: PropTypes.arrayOf(PropTypes.object)
}

export default Menu;
