import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Webcam from 'react-webcam'
import { connect } from 'react-redux'

import IntroBox from 'src/components/_layout/IntroBox/IntroBox'
import Button from 'src/components/_buttons/Button/Button'
import { setImg } from 'src/state/actions/idCheck'

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
      <div data-test="initial-img" onClick={() => this.setState({takePicture: true})}>
        <img src={initialImg} alt={`add-proof-${section}`}/>
      </div>
    )
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
          width={350}
          videoConstraints={videoConstraints}
        />
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
    this.props.setImg(this.props.section, this.state.imageSrc)
    return <img src={this.state.imageSrc} onClick={() => this.setState({ retakePicture: true })}/>
  }

  /**
   * @param {Object} file - uploaded file being turned into base64
   * @return {void}
   */
  getBase64 = (file) => {
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
    this.getBase64(files[0])

    this.setState({
      uploadedFile: files[0]
    });

  }

  handleProof = (t) => {
    const { isSelfie } = this.props

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: isSelfie ? 'user' : { exact: 'environment' }
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
      <div data-test="component-add-proof" className="add-proof" role="account">
        <IntroBox data-test="intro-box">{ t(`onBoarding.idCheck.${section}.title`) }</IntroBox>
        <p className="add-proof-content">{ !this.state.takePicture || !this.state.retakePicture ? t(`onBoarding.idCheck.${section}.content`) : t(`onBoarding.idCheck.${section}.retakeImageContent`)}</p>
        <div className="add-proof-img">{this.handleProof(t)}</div>
        <div className="add-proof-upload-file">{this.uploadImg(t)}</div>
      </div>
    );
  }
}

AddProof.propTypes = {
  t: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
  initialImg: PropTypes.string.isRequired,
  setImg: PropTypes.func,
  isSelfie: PropTypes.bool.isRequired
}
const actions = {
  setImg
}

export default connect(null, actions)(withTranslation()(AddProof));
