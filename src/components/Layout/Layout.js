/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import SEO from 'src/components/seo';
import Header from 'src/components/Header/Header';
import Loader from 'src/components/Loader/Loader';
import { setWidth } from 'src/state/actions/layout';
import { userLogin } from 'src/state/actions/user';
import { saveAuth } from 'src/state/actions/auth';

import authService from 'src/services/Auth';
const AuthService = new authService();

import 'src/i18n';
import './layout.scss';
import { navigate } from 'gatsby';

export class Layout extends Component {
  componentDidMount() {
    const { userID, secure, redirect } = this.props;

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
        AuthService.reauthenticate();

        if (redirect) navigate(redirect);

      } else if(secure) {
        localStorage.removeItem('gg-auth');
        navigate(`/login${redirect ? `?redirect=${redirect}` : ``}`);
      }
    }
  }

  render() {
    const { children, headerActions, isLoading } = this.props;

    return (
      <div className={classNames('wrapper', `${children.props && children.props.role}`)}>
        <SEO title="GetGround" keywords={[`gatsby`, `application`, `react`]} />

        {isLoading && <Loader />}

        <Header>{headerActions}</Header>

        <div className="app">
          <main className="main">{children}</main>
        </div>
        <div id="modal-root"></div>
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
  redirect: PropTypes.string
}

Layout.defaultProps = {
  secure: false
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  userID: state.user.id
});

const actions = {
  setWidth,
  userLogin,
  saveAuth,
};

export default connect(mapStateToProps, actions)(Layout);
