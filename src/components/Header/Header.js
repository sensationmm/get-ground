import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';

import Button from 'src/components/_buttons/Button/Button';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

import Logo from 'src/assets/images/logo-white.svg';
import './header.scss';

/**
 * Header
 * App header component
 * @param {Object} props - props object (for jsdoc)
 * @param {JSXElement} children - header button override
 * @param {string} classNames - list of classname modifiers ['fullscreen']
 * @return {JSXElement} Header component
 */

const Header = (props) => {
  const { menuIsOpen, children, isLoading, userID, onClick, childrenDisabled, isMobile, menuLinks } = props;
  const [t] = useTranslation();

  return (
    <header
      data-test="component-header"
      className={classNames('header',
        props.classNames,
        {'no-background': menuIsOpen}
      )}
    >
      <div className="header-inner-wrapper">
        <div className="header-inner">
          <div className="header-logo">
            <Link to="/">
              <img src={Logo} alt="GetGround logo" />
            </Link>
          </div>
          <div className="header-buttons">
            {userID && !children &&
              <ButtonHeader data-test="dashboard" label={t('header.dashboard')} onClick={() => navigate('/dashboard')} />
            }

            {children
              ? <div data-test="children" className={classNames('header-children', {
                'disabled': childrenDisabled
              })}>{children}</div>
              : (
                isMobile
                ? <div
                    className={classNames('header-menu-toggle',
                      {'header-menu-toggle-close': menuIsOpen }
                    )}
                    onClick={onClick}
                  >
                    <div></div>
                  </div>
                : menuLinks
              )
            }
          </div>
        </div>
      </div>
      {!isLoading && !userID && !menuIsOpen &&
        <div className='header--logged-out'>
          <div className="header-inner-wrapper">
            <div className="header-inner">
                <Link to="/onboarding/create-account/">
                  <Button
                    classes="tertiary small"
                    label={t('header.buttons.register')}
                  />
                </Link>
                <Link to="/login">
                  <Button
                    classes="tertiary small"
                    label={t('header.buttons.login')}
                  />
                </Link>
            </div>
          </div>
        </div>
      }
    </header>
  );
}

Header.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.element,
  menuIsOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  userID: PropTypes.number,
  onClick: PropTypes.func,
  childrenDisabled: PropTypes.bool,
  isMobile: PropTypes.bool,
  menuLinks: PropTypes.object
}

export default Header;
