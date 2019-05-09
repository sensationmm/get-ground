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

export class Layout extends Component {
  componentDidMount() {
    this.props.setWidth(window.innerWidth);
    window.addEventListener('resize', (window) => this.props.setWidth(window.currentTarget.innerWidth));

    if(!this.props.user) {
      const auth = JSON.parse(localStorage.getItem('gg-auth'));

      const authed = (
        auth !== null &&
        auth.token !== null &&
        (Date.now().valueOf() / 1000) <= jwtDecode(auth.token).exp
      );

      if(auth && authed) {
        this.props.saveAuth(auth.token);
        AuthService.reauthenticate();
      }
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div className={classNames(`${children.props && children.props.role}`)}>
        <SEO title="GetGround" keywords={[`gatsby`, `application`, `react`]} />

        {this.props.isLoading && <Loader />}

        <Header classNames={`${children.props && children.props.role}`} />

        <div className={classNames('app', children.props && children.props.role)}>
          <main className="main">{children}</main>
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  setWidth: PropTypes.func,
  isLoading: PropTypes.bool,
  saveAuth: PropTypes.func,
  user: PropTypes.number
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  user: state.user ? state.user.id : null
});

const actions = {
  setWidth,
  userLogin,
  saveAuth,
};

export default connect(mapStateToProps, actions)(Layout)
