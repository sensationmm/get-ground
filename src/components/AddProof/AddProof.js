import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Camera from 'src/components/Camera/Camera'
import IntroBox from 'src/components/_layout/IntroBox/IntroBox'
import Button from 'src/components/_buttons/Button/Button'
import CameraIcon from 'src/assets/images/camera-icon.svg'
import Rectangle from 'src/assets/images/rectangle.svg'

import { setActive, resetActive, setRetake, setImg } from 'src/state/actions/idCheck'

import './add-proof.scss'
/**
 * Add Proof img
 * @author Ravin Patel
 * @param {function} t - i18next function for translating
 * @param {Object} videoConstraints - config for webcam
 * @return {ReactComponent} AddProof
 */
export class AddProof extends Component {
  constructor(props) {
    super(props);
    this.inputOpenFileRef = React.createRef()
    this.state = {
      takePicture: false
    }
  }


  initialLanding = () => {
    const { initialImg, section, t } = this.props;

    return (
      <div className={`add-proof-initial`} data-test="initial-img" onClick={() => this.handleActiveSection({takePicture: true})}>
        <img src={Rectangle} />
        <img src={initialImg} alt={`add-proof-${section}`} className={`add-proof-initial-img ${section}`}/>
        <img src={CameraIcon} className={`add-proof-initial-camera-icon ${section}`} />
        <p className={`add-proof-initial-name ${section}`}>{t(`onBoarding.idCheck.${section}.name`)}</p>
      </div>
    )
  }

  /**
   * @param {Object} newState - new state object passed by parent function to set state
   * @return {void}
   */
  handleActiveSection = (newState) => {
    const { section } = this.props
    this.props.setActive(section)
    this.setState(newState)
  }

  startCamera = (t) => {
    const { section } = this.props;
    return (
      <div className="add-proof-start-camera">
        <Camera section={section} active={this.props.active} data-test="camera"/>
        <img className={`add-proof-overlay ${section}`} src={this.props.overlay} />
        <p className="add-proof-loading">{t('onBoarding.idCheck.loading')}</p>
      </div>
    )
  }

  retakePicture = () => {
    if (this.props.active === this.props.section) {
      this.props.setImg(this.props.section, null)
      this.props.setRetake(this.props.section, true)
      this.setState({ takePicture: true})
    }
  }

  handleHappy = () => {
    this.props.setRetake(this.props.section, false)
    this.setState({ takePicture: false })
  }

  imgConfirmation(t, imagesrc) {
    return (
      <>
        <img data-test="confirm-img" src={imagesrc}/>
        <Button data-test="happy-button" classes="primary confirm-happy" fullWidth label={t('onBoarding.idCheck.image.happy')} onClick={() => this.handleHappy()}/>
        <Button data-test="retake-button" classes="secondary" fullWidth label={t('onBoarding.idCheck.image.retake')} onClick={() => this.retakePicture()}/>
      </>
    )
  }

  handleResetFinalImg() {
    const { section } = this.props
    this.props.setActive(section)
    this.props.setImg(this.props.section, null)
  }

  /**
   * @param {string} imagesrc - image
   * @return {void}
   */
  showFinalImg = (imagesrc) => {
    if (this.props.active === this.props.section) {
      this.props.resetActive()
    }

    return <img  data-test="add-proof-final-img" src={imagesrc} onClick={() => this.handleResetFinalImg({ takePicture: true })}/>
  }

  /**
   * @param {Object} file - uploaded file being turned into base64
   * @return {void}
   */
  getDataUrl = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.props.setImg(this.props.section, reader.result)
    };
    reader.onerror = (error) => {
      // TODO: handle errors
      return error
    };
 }

 /**
   * @param {Array} files - uploaded files from dropzone
   * @return {void}
   */
  onImageDrop = (files) => {
    this.getDataUrl(files[0])

    this.setState({
      uploadedFile: files[0]
    });

  }

  handleProof = (t) => {
    const { section } = this.props
    const imagesrc = this.props.idCheck[section].img

    const retake = this.props.idCheck[section].retake

    if (imagesrc && !retake) return this.showFinalImg(imagesrc)

    if (imagesrc === '' && !this.state.takePicture) return this.initialLanding()

    if (imagesrc) return this.imgConfirmation(t, imagesrc)

    if (!imagesrc || retake || this.state.takePicture) return this.startCamera(t)
  }

  uploadImg = (t) => {
    return (
      <Dropzone
        data-test="dropzone"
        onDrop={this.onImageDrop}
        accept="image/*"
        multiple={false}
        className="dropzone"
      >
        {({getRootProps, getInputProps}) => {
          return (
            <div
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {
              <Button classes="upload-file-button link" label={t('onBoarding.idCheck.link')}/>
              }
            </div>
          )
        }}
      </Dropzone>
    )
  }

  render() {
    const { t, section } = this.props

    return (
      <div data-test="component-add-proof" className={classNames(['add-proof', {'disabled': this.props.active && this.props.active !== section  }])} role="account">
        <IntroBox data-test="intro-box">{ t(`onBoarding.idCheck.${section}.title`) }</IntroBox>
        <p className="add-proof-content">{ !this.state.takePicture ? t(`onBoarding.idCheck.${section}.content`) : t(`onBoarding.idCheck.${section}.retakeImageContent`)}</p>
        <div className="add-proof-img">{this.handleProof(t)}</div>
        {section !== 'selfie' && <div className="add-proof-upload-file">{this.uploadImg(t)}</div>}
      </div>
    );
  }
}

AddProof.propTypes = {
  t: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
  initialImg: PropTypes.string.isRequired,
  setImg: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  resetActive: PropTypes.func.isRequired,
  setRetake: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  overlay: PropTypes.string,
  idCheck: PropTypes.object,
}
const mapStateToProps = (state) => ({
  active: state.idCheck.active,
  idCheck: state.idCheck
})

const actions = {
  setActive,
  resetActive,
  setImg,
  setRetake
}

export default connect(mapStateToProps, actions)(withTranslation()(AddProof));
