import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Webcam from 'react-webcam'
import { connect } from 'react-redux'
import classNames from 'classnames'

import IntroBox from 'src/components/_layout/IntroBox/IntroBox'
import Button from 'src/components/_buttons/Button/Button'
import { setImg, setActive, resetActive } from 'src/state/actions/idCheck'

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
      retakePicture: false,
      takePicture: false,
      imageSrc: null,
      webcam: null
    }
  }


  initialLanding = () => {
    const { initialImg, section } = this.props;

    return (
      <div data-test="initial-img" onClick={() => this.handleActiveSection({takePicture: true})}>
        <img src={initialImg} alt={`add-proof-${section}`}/>
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

  /**
   * @param {ReactComponent} webcam - React component to start webcam
   * @return {void}
   */
  setWebcam = webcam => {
    this.setState({webcam})
  };

  capture = () => {
    const imageSrc = this.state.webcam.getScreenshot();
    this.setState({
      imageSrc,
      retakePicture: true
    })
  };

  startCamera = (t, videoConstraints) => {
    return (
      <div>
        <Webcam
          data-test="webcam"
          audio={false}
          height={350}
          ref={this.setWebcam}
          screenshotFormat="image/jpeg"
          width={335}
          videoConstraints={videoConstraints}
        />
        <p className="add-proof-loading">...loading camera</p>
        <Button style={`display: inline;`} data-test="capture-button" classes="primary capture" fullWidth label={t('onBoarding.idCheck.image.capture')} onClick={() => this.capture()}/>
      </div>
    )
  }

  imgConfirmation(t) {
    return (
      <>
        <img src={this.state.imageSrc}/>
        <Button data-test="happy-button" classes="primary confirm-happy" fullWidth label={t('onBoarding.idCheck.image.happy')} onClick={() => this.setState({ retakePicture: false})}/>
        <Button data-test="retake-button" classes="secondary" fullWidth label={t('onBoarding.idCheck.image.retake')} onClick={() => this.setState({imageSrc: null, retakePicture: true})}/>
      </>
    )
  }

  showFinalImg = () => {
    if (this.props.active === this.props.section) {
      this.props.setImg(this.props.section, this.state.imageSrc)
      this.props.resetActive()
    }
    return <img src={this.state.imageSrc} onClick={() => this.handleActiveSection({ retakePicture: true })}/>
  }

  /**
   * @param {Object} file - uploaded file being turned into base64
   * @return {void}
   */
  getDataUrl = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({imageSrc: reader.result});
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

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: section === 'selfie' ? 'user' : 'environment'
    };

    if (this.state.imageSrc && !this.state.retakePicture) return this.showFinalImg()

    if (!this.state.takePicture) return this.initialLanding()

    if (this.state.imageSrc ) return this.imgConfirmation(t)

    if (!this.state.imageSrc || this.state.retakePicture) return this.startCamera(t, videoConstraints)
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
        <h2 data-test="intro-box">{ t(`onBoarding.idCheck.${section}.title`) }</h2>
        <p className="add-proof-content">{ !this.state.takePicture || !this.state.retakePicture ? t(`onBoarding.idCheck.${section}.content`) : t(`onBoarding.idCheck.${section}.retakeImageContent`)}</p>
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
  active: PropTypes.string.isRequired
}
const mapStataToProps = (state) => ({
  active: state.idCheck.active
})

const actions = {
  setImg,
  setActive,
  resetActive
}

export default connect(mapStataToProps, actions)(withTranslation()(AddProof));
