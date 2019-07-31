
import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import './menu.scss';

/**
 * Menu
 * @param {object} props - props object
 * @return {JSXElement} Menu
 */
const Menu = (props) => {
  const { menuLinks } = props;

  return(
    <div className="menu" data-test="component-menu">
      <ul className="menu--list">
        {menuLinks.map((menuLink, i) => {
          const link = menuLink.link ? menuLink.link : '/';

          return(
            <li className="menu--list-item" key={`menu-link-${i}`}>
              <Link to={link} activeClassName="active" onClick={menuLink.function ? menuLink.function : () => {}}>
                <div className="menu--list-item-label">{ menuLink.text }</div>
                { menuLink.summary }
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Menu.propTypes = {
  menuLinks: PropTypes.arrayOf(PropTypes.object)
}

export default Menu;
