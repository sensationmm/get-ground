/* eslint-disable react/prefer-stateless-function */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Header from 'src/components/Header/Header';
import Loader from 'src/components/Loader/Loader';
import { setWidth } from '../../state/actions/layout'

import 'src/i18n';
import './layout.scss'

class Layout extends Component {
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
