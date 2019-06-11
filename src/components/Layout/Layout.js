/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { withTranslation } from 'react-i18next';
import LiveChat from 'react-livechat';

import SEO from 'src/components/seo';
import Header from 'src/components/Header/Header';
import Loader from 'src/components/Loader/Loader';
import Modal from 'src/components/Modal/Modal';
import Menu from 'src/components/Menu/Menu';
import Footer from 'src/components/Footer/Footer';

import store from 'src/state/store';
import { setWidth } from 'src/state/actions/layout';
import { userLogin } from 'src/state/actions/user';
import { saveAuth } from 'src/state/actions/auth';
import { showMenu, hideMenu } from 'src/state/actions/menu';
import { hideLoader } from 'src/state/actions/loader';

import authService from 'src/services/Auth';
export const AuthService = new authService();

import 'src/i18n';
import './layout.scss';
import { navigate } from 'gatsby';

export class Layout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      livechat: false
    };
  }

  componentDidMount() {
    const { userID, secure, redirect, hideLoader } = this.props;
    this.setState({ livechat: true })
    store.dispatch(hideMenu());

    this.props.setWidth(window.innerWidth);
    window.addEventListener('resize', (window) => this.props.setWidth(window.currentTarget.innerWidth));

    if(!userID) {
      const auth = JSON.parse(localStorage.getItem('gg-auth'));

      const authed = (
        auth !== null &&
        auth.token !== null &&
        (Date.now().valueOf() / 1000) <= jwtDecode(auth.token).exp
      );

      if(auth && authed) {
        this.props.saveAuth(auth.token);
        AuthService.reauthenticate().then(() => {
          hideLoader();
        });

        if (redirect) navigate(redirect);

      } else if(secure) {
        localStorage.removeItem('gg-auth');
        navigate(`/login${redirect ? `?redirect=${redirect}` : ``}`);
      } else {
        hideLoader();
      }
    }

    this.validateCompanyID();
  }

  validateCompanyID = () => {
    const { companyID, activeCompany } = this.props;

    if(companyID && activeCompany === null) {
      navigate('/dashboard');
    }
  }

  setupLivechat() {

  }

  loggedOutOnly = () => {
    const { userID, loggedOutOnly } = this.props;

    if(userID && loggedOutOnly) {
      navigate('/dashboard');
    }
  }

  toggleMenu = () => {
    const { showMenu, hideMenu, menuIsOpen } = this.props;
    menuIsOpen ? hideMenu() : showMenu();
  }

  render() {
    this.loggedOutOnly();
    const { children, headerActions, isLoading, userID, t, menuIsOpen } = this.props;

    const menuLinks = [
      {
        text: t('menu.links.first'),
        link: '/what-we-do'
      },
      {
        text: t('menu.links.second'),
        link: '/get-ground-advantages'
      },
      {
        text: t('menu.links.third'),
        link: '/how-it-works'
      },
      {
        text: t('menu.links.fourth'),
        link: '/pricing'
      },
      {
        text: t('menu.links.fifth'),
        link: '/about-us'
      },
      {
        text: t('menu.links.sixth'),
        link: '/partnerships'
      },
      {
        text: t('menu.links.seventh'),
        link: '/faqs'
      },
      {
        text: t('menu.links.eigth'),
        function: (e) => {
          e.preventDefault('wambam');
          localStorage.removeItem('gg-auth');
          navigate('/login');
        }
      }
    ];

    return (

      <div className={classNames('wrapper', `${children.props && children.props.role}`)}>
        <SEO title="GetGround" keywords={[`gatsby`, `application`, `react`]} />

        {isLoading && <Loader />}

        <Header
          isLoading={isLoading}
          userID={userID}
          classNames={userID ? '' : 'extra-padding'}
          onClick={this.toggleMenu}
          menuIsOpen={menuIsOpen}
        >
          {headerActions}
        </Header>

        <div className={classNames('app', { 'extra-top-padding': !userID })}>
          <main className="main">{children}</main>
        </div>
        <div id="modal-root"></div>
        <Footer />
        <CSSTransition
          in={menuIsOpen}
          timeout={400}
          classNames="menu"
          unmountOnExit
        >
          <Modal>
            <Menu
              menuLinks={menuLinks}
              menuIsOpen={menuIsOpen}
            />
          </Modal>
        </CSSTransition>
        {this.state.livechat && <LiveChat license={10911047} />}
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  setWidth: PropTypes.func,
  isLoading: PropTypes.bool,
  headerActions: PropTypes.element,
  saveAuth: PropTypes.func,
  userID: PropTypes.number,
  secure: PropTypes.bool,
  redirect: PropTypes.string,
  activeCompany: PropTypes.string,
  companyID: PropTypes.bool,
  loggedOutOnly: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  showMenu: PropTypes.func,
  hideMenu: PropTypes.func,
  t: PropTypes.func.isRequired,
  hideLoader: PropTypes.func,
}

Layout.defaultProps = {
  secure: false
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  userID: state.user.id,
  activeCompany: state.activeCompany,
  menuIsOpen: state.menu.isOpen,
});

const actions = {
  setWidth,
  userLogin,
  saveAuth,
  showMenu,
  hideMenu,
  hideLoader
};

export default connect(mapStateToProps, actions)(withTranslation()(Layout));
