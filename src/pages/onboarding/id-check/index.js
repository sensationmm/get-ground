import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Layout from 'src/components/Layout/Layout'
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox'
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
import formUtils from 'src/utils/form';

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
    formUtils.clearFormState();

    KYCService.makeCheck(passport.img, address.img, selfie.img).then((res) => {
      hideLoader();
      if(res.status === 201) {
        navigate('onboarding');
      } else {
        formUtils.setFormError(this.props.t('onBoarding.idCheck.error'));
        this.props.resetActive();
      }
    })
  }

  componentWillUnmount() {
    this.props.resetActive()
  }

  render() {
    const { t, form: { errors, showErrorMessage }, myPassport, myAddress, mySelfie } = this.props
    const headerActions = <ButtonHeader onClick={this.submitFiles} label={t('header.buttons.saveAndExit')} />;

    return (
      <Layout headerActions={headerActions} secure>
      <div data-test="container-id-check" className="id-check" role="account form-page">
        <h1 className="id-check-title">{ t('onBoarding.idCheck.title') }</h1>

        {showErrorMessage && 
          <ErrorBox>
          { errors.form ? errors.form : t('form.correctErrors') }
          </ErrorBox>
        }

        <AddProof section="passport" initialImg={Passport} existing={myPassport && myPassport.content} overlay={CameraCrosshair} />
        <AddProof section="address" initialImg={Address} existing={myAddress && myAddress.content} overlay={CameraCrosshair} />
        <AddProof section="selfie" initialImg= {Selfie} existing={mySelfie && mySelfie.content} overlay={AlienHead} />
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
  resetActive: PropTypes.func,
  form: PropTypes.object,
  myPassport: PropTypes.string,
  myAddress: PropTypes.string,
  mySelfie: PropTypes.string
}

const mapStateToProps = state => ({
  passport: state.idCheck.passport,
  address: state.idCheck.address,
  selfie: state.idCheck.selfie,
  form: state.form,
  myPassport: state.documents.file_passport,
  myAddress: state.documents.file_proof_of_address,
  mySelfie: state.documents.file_selfie,
})

const actions = { showLoader, hideLoader, resetActive };

export default connect(mapStateToProps, actions)(withTranslation()(IdCheck));
