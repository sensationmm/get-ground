import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Layout from 'src/components/Layout/Layout'
import AddProof from 'src/components/AddProof/AddProof'
import Passport from 'src/assets/images/add-passport.svg'
import Address from 'src/assets/images/add-address.svg'
import Selfie from 'src/assets/images/add-selfie.svg'
import CameraCrosshair from 'src/assets/images/camera-crosshair.svg'
import AlienHead from 'src/assets/images/alien-head.svg'
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';
import Button from 'src/components/_buttons/Button/Button'
import kycService from 'src/services/KYC'
import { showLoader, hideLoader } from 'src/state/actions/loader';
import { resetActive } from 'src/state/actions/idCheck'

import './id-check.scss'

const KYCService = new kycService();
/**
 * IdCheck
 * @author Ravin Patel
 * @return {Class} IdCheck
 */
export class IdCheck extends Component {

  submitFiles = () => {
    const { passport, address, selfie, showLoader, hideLoader } = this.props
    showLoader();

    KYCService.makeCheck(passport.img, address.img, selfie.img).then(() => {
      hideLoader();
      navigate('onboarding');
    })
  }

  componentWillUnmount() {
    this.props.resetActive()
  }

  render() {
    const { t } = this.props
    const headerActions = <Link to="/onboarding"><ButtonHeader label={t('header.buttons.saveAndExit')} /></Link>;

    return (
      <Layout headerActions={headerActions} secure>
      <div data-test="container-id-check" className="id-check" role="account form-page">
        <h1 className="id-check-title">{ t('onBoarding.idCheck.title') }</h1>
        <AddProof section="passport" initialImg={Passport} overlay={CameraCrosshair} />
        <AddProof section="address" initialImg={Address} overlay={CameraCrosshair} />
        <AddProof section="selfie" initialImg= {Selfie} overlay={AlienHead} />
        <Button classes="primary id-check-next" onClick={this.submitFiles} label={ t('onBoarding.idCheck.buttonNext') } fullWidth />
        <Link to="/onboarding/personal-details">
          <Button classes="secondary id-check-back" label={ t('onBoarding.idCheck.buttonBack') } fullWidth />
        </Link>
      </div>
    </Layout>
    )
  }
}

IdCheck.propTypes = {
  t: PropTypes.func.isRequired,
  passport: PropTypes.object,
  address: PropTypes.object,
  selfie: PropTypes.object,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  resetActive: PropTypes.func
}

const mapStateToProps = state => ({
  passport: state.idCheck.passport,
  address: state.idCheck.address,
  selfie: state.idCheck.selfie
})

const actions = { showLoader, hideLoader, resetActive };

export default connect(mapStateToProps, actions)(withTranslation()(IdCheck));
