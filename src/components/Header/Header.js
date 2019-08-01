import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, navigate } from 'gatsby';
import { withTranslation } from 'react-i18next';

import Button from 'src/components/_buttons/Button/Button';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

import Logo from 'src/assets/images/logo.svg';
import './header.scss';

/**
 * Header
 * App header component
 * @param {Object} props - props object (for jsdoc)
 * @param {JSXElement} children - header button override
 * @param {string} classNames - list of classname modifiers ['fullscreen']
 * @return {JSXElement} Header component
 */
class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuActive: false
    };
  }

  render() {
    const {
      menuIsOpen,
      children,
      isLoading,
      userID,
      onClick,
      childrenDisabled,
      isMobile,
      menuLinks,
      showDashboardButton,
      showOnboardingButton,
      t,
      onLogout
    } = this.props;
    const { menuActive } = this.state;

    return (
      <header
        data-test="component-header"
        className={classNames('header',
          this.props.classNames
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

              {!isLoading && !userID &&
                <Button onClick={() => navigate('/login')} classes="header-signIn" label={t('header.buttons.login')} />
              }

              {userID && !children && showDashboardButton &&
                <ButtonHeader data-test="dashboard" label={t('header.dashboard')} onClick={() => navigate('/dashboard')} />
              }

              {userID && !children && showOnboardingButton &&
                <ButtonHeader data-test="onboarding" label={t('header.onboarding')} onClick={() => navigate('/onboarding')} />
              }

              {!isLoading && userID && !isMobile &&
                <Button classes="link" onClick={onLogout} label={t('header.buttons.logout')} />
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
                  : [
                    <div key="nav-about" className="header-links" onClick={() => navigate('/about-us') }>{ t('menu.links.fifth.label') }</div>,
                    <div key="nav-menu" className="header-links hover" onClick={() => this.setState({ menuActive: !menuActive })}>
                      Explore

                      {menuActive &&
                        <div className="header-links-menu" onMouseLeave={() => this.setState({ menuActive: !menuActive })}>
                          { menuLinks }
                        </div>
                      }
                    </div>
                  ]
                )
              }
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.element,
  menuIsOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  userID: PropTypes.string,
  onClick: PropTypes.func,
  childrenDisabled: PropTypes.bool,
  isMobile: PropTypes.bool,
  menuLinks: PropTypes.object,
  showDashboardButton: PropTypes.bool,
  showOnboardingButton: PropTypes.bool,
  t: PropTypes.func,
  onLogout: PropTypes.func
}

export const RawComponent = Header;

export default withTranslation()(Header);
