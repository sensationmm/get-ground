/* eslint-disable require-jsdoc */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import SEO from 'src/components/seo'
import Header from 'src/components/Header/Header';
import Loader from 'src/components/Loader/Loader';
import { setWidth } from 'src/state/actions/layout'

import 'src/i18n';
import './layout.scss'

export class Layout extends Component {
  componentDidMount() {
    this.props.setWidth(window.innerWidth);
    window.addEventListener('resize', (window) => this.props.setWidth(window.currentTarget.innerWidth))
  }

  render() {
    const { children, headerActions, isLoading } = this.props;
    return (
      <>
        <SEO title="GetGround" keywords={[`gatsby`, `application`, `react`]} />
        {isLoading && <Loader />}
        <Header classNames={`${children.props.role}`}>{headerActions}</Header>
        <div className={classNames('app', children.props.role)}>
          <main className="main">{children}</main>
        </div>
        <div id="modal-root"></div>
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  setWidth: PropTypes.func,
  isLoading: PropTypes.bool,
  headerActions: PropTypes.element
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading
})

export default connect(mapStateToProps, { setWidth })(Layout)
