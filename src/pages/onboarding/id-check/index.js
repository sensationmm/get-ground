import React, { Component } from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Layout from 'src/components/Layout/Layout'
import AddProof from 'src/components/AddProof/AddProof'
import Passport from 'src/assets/images/add-passport.svg'
import Address from 'src/assets/images/add-address.svg'
import Selfie from 'src/assets/images/add-selfie.svg'
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';
import Button from 'src/components/_buttons/Button/Button'
import kycService from 'src/services/KYC'

import './id-check.scss'

const KYCService = new kycService();
/**
 * IdCheck
 * @author Ravin Patel
 * @return {Class} IdCheck
 */
export class IdCheck extends Component {
  componentWillUnmount() {
    const { passport, address, selfie } = this.props
    KYCService.makeCheck(passport, address, selfie)
  }

  render() {
    const { t } = this.props
    const headerActions = <Link to="/onboarding/process-tracker"><ButtonHeader label="Exit" /></Link>;

    return (
      <Layout headerActions={headerActions} secure>
      <div data-test="container-id-check" className="id-check" role="account">
        <h1 className="id-check-title">{ t('onBoarding.idCheck.title') }</h1>
        <AddProof section="passport" initialImg={Passport} />
        <AddProof section="address" initialImg={Address} />
        <AddProof section="selfie" initialImg= {Selfie} />
        <Button classes="primary id-check-next" label={ t('onBoarding.idCheck.buttonNext') } fullWidth />
        <Link to="/onboarding/process-tracker"><Button classes="secondary id-check-back" label={ t('onBoarding.idCheck.buttonBack') } fullWidth /></Link>
        <Button classes="link small id-check-skip" label={ t('onBoarding.idCheck.buttonSkip') } fullWidth />
      </div>
    </Layout>
    )
  }
}

IdCheck.propTypes = {
  t: PropTypes.func.isRequired,
  passport: PropTypes.string,
  address: PropTypes.string,
  selfie: PropTypes.string,
  isMobile: PropTypes.string,
}

const mapStateToProps = state => ({
  passport: state.idCheck.passport,
  address: state.idCheck.address,
  selfie: state.idCheck.selfie,
  userId: state.user.id
})

export default connect(mapStateToProps, null)(withTranslation()(IdCheck));
