/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import LiveChat from 'react-livechat';
import IdleTimer from 'react-idle-timer';

import { inArray } from 'src/utils/functions';
import SEO from 'src/components/seo';
import Header from 'src/components/Header/Header';
import Loader from 'src/components/Loader/Loader';
import ModalWrapper from 'src/components/Modal/ModalWrapper';
import ModalContent from 'src/components/Modal/ModalContent';
import Menu from 'src/components/Menu/Menu';
import Footer from 'src/components/Footer/Footer';

import store from 'src/state/store';
import { setWidth } from 'src/state/actions/layout';
import { userLogin, deleteUser } from 'src/state/actions/user';
import { saveAuth, deleteAuth } from 'src/state/actions/auth';
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
      livechat: false,
      logout: false,
      isLoggingOut: false
    };

    this.idleTimer = null;
    this.onIdle = this._onIdle.bind(this);
  }

  componentDidMount() {
    const { userID, secure, redirect, hideLoader, deleteUser } = this.props;
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
        AuthService.reauthenticate().then((resp) => {
          if(resp.status === 401) {
            deleteUser();
            navigate('/login');
          }
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

  componentDidUpdate(prevProps, prevState) {
    const { deleteAuth, deleteUser } = this.props;

    if (prevState.logout !== this.state.logout) {
      localStorage.removeItem('gg-auth');
      deleteAuth();
      deleteUser();
      navigate('/login');
    }
  }

  validateCompanyID = () => {
    const { companyID, activeCompany } = this.props;

    if(companyID && activeCompany === null) {
      navigate('/dashboard');
    }
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

  _onIdle(e) {
    this.setState({ isLoggingOut: true }, () => {
      setTimeout(() => {
        if (this.state.isLoggingOut) this.setState({ logout: true });
      }, 10000);
    });
  }

  render() {
    this.loggedOutOnly();
    const { children, headerActions, isLoading, userID, t, menuIsOpen, isLoggedIn, idCheckActive, isMobile } = this.props;
    const { isLoggingOut } = this.state;

    const menuLinks = [
      {
        text: t('menu.links.first'),
        link: '/what-we-do'
      },
      {
        text: t('menu.links.second'),
        link: '/advantages'
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
        link: '/about-us',
        hideDesktop: true
      },
      {
        text: t('menu.links.sixth'),
        link: '/partnerships',
        hideDesktop: true
      },
      {
        text: t('menu.links.seventh'),
        link: '/frequently-asked-questions',
        hideDesktop: true
      },
      {
        text: isLoggedIn ? t('menu.links.ninth') : t('menu.links.eigth'),
        function: (e) => {
          e.preventDefault();
          this.setState({ logout: true });
        }
      }
    ];

    const roles = children.props && children.props.role && children.props.role.split(' ');

    return (

      <div className={classNames('wrapper', `${roles && roles.join(' ')}`)}>

        { userID &&
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onIdle={this.onIdle}
            debounce={250}
            timeout={1800000} // 30 mins
          />
        }

        <SEO title="GetGround" keywords={[`gatsby`, `application`, `react`]} />

        {isLoading && <Loader />}

        <Header
          isLoading={isLoading}
          userID={userID}
          classNames={userID ? '' : 'extra-padding'}
          onClick={this.toggleMenu}
          menuIsOpen={menuIsOpen}
          childrenDisabled={Boolean(idCheckActive)}
          isMobile={isMobile}
          menuLinks={<Menu menuLinks={menuLinks.filter(link => !link.hideDesktop)} />}
        >
          {headerActions}
        </Header>

        <div className={classNames('app', { 'extra-top-padding': !userID })}>
          <main className="main">{children}</main>
        </div>
        <div id="modal-root"></div>
        {(!inArray('fullscreen', roles) || inArray('hasFooter', roles)) && <Footer hideContact={inArray('fullscreen', roles)} />}

        {isMobile &&
          <ModalWrapper
            transitionBool={menuIsOpen}
            transitionTime={400}
            classes="menu"
          >
            <Menu menuLinks={menuLinks} />
          </ModalWrapper>
        }

        <ModalWrapper
          transitionBool={isLoggingOut}
          transitionTime={600}
          classes="modal"
        >
          <ModalContent
            heading={t('modal.loggingOutHeading')}
            htmlContent={<p>{t('modal.loggingOutCopy')}</p>}
            closeModal={() => { this.setState({ isLoggingOut: false }) }}
            closeIconAltText={t('modal.closeIconAltText')}
          />
        </ModalWrapper>

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
  deleteAuth: PropTypes.func,
  userID: PropTypes.number,
  secure: PropTypes.bool,
  redirect: PropTypes.string,
  activeCompany: PropTypes.number,
  companyID: PropTypes.bool,
  loggedOutOnly: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  showMenu: PropTypes.func,
  hideMenu: PropTypes.func,
  t: PropTypes.func.isRequired,
  hideLoader: PropTypes.func,
  deleteUser: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  idCheckActive: PropTypes.string,
  isMobile: PropTypes.bool
}

Layout.defaultProps = {
  secure: false
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  userID: state.user.id,
  activeCompany: state.activeCompany,
  menuIsOpen: state.menu.isOpen,
  isLoggedIn: state.user.email,
  idCheckActive: state.idCheck.active,
  isMobile: state.layout.isMobile
});

const actions = {
  setWidth,
  userLogin,
  deleteUser,
  saveAuth,
  deleteAuth,
  showMenu,
  hideMenu,
  hideLoader
};

export default connect(mapStateToProps, actions)(withTranslation()(Layout));
