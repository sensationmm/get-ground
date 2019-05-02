/* eslint-disable require-jsdoc */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import { setWidth } from '../../state/actions/layout'

import '../../i18n';
import './layout.scss'

export class Layout extends Component {
  componentDidMount() {
    this.props.setWidth(window.innerWidth);
    window.addEventListener('resize', (window) => this.props.setWidth(window.currentTarget.innerWidth))
  }

  render() {
    const { children } = this.props;
    return (
      <>
        {this.props.isLoading && <Loader />}
        <Header classNames={`${children.props.role}`} />
        <div className={classNames('app', children.props.role)}>
          <main className="main">{children}</main>
        </div>
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  setWidth: PropTypes.func,
  isLoading: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading
})


export default connect(mapStateToProps, { setWidth })(Layout)
