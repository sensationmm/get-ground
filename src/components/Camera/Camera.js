import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setImg, setRetake } from 'src/state/actions/idCheck'

import 'react-html5-camera-photo/build/css/index.css';

/**
 * ProofCamera
 * @author Ravin Patel <ravin.patel@getground.co.uk>
 * @return {JSXElement} - ProofCamera
 */
export class ProofCamera extends Component {
  onTakePhoto (dataUri) {
    this.props.setImg(this.props.section, dataUri)
    if (this.props.active === this.props.section) {
      this.props.setRetake(this.props.section, true)
    }
    this.onCameraStop()
  }

  onCameraStart (stream) {}

  onCameraStop () {
    console.log('I AM CALLED')
  }

  onCameraError() {
    console.log('error');
  }

  render () {
    const { section, isMobile } = this.props

    return (
        <Camera
          data-test="camera"
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          onCameraError = { (error) => { this.onCameraError(error); } }
          idealFacingMode = {section === 'selfie' ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 1280, height: 720}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {false}
          isImageMirror = {!isMobile || section === 'selfie' ? true : false}
          isSilentMode = {true}
          isDisplayStartCameraError = {true}
          isFullscreen = {false}
          sizeFactor = {1}
          onCameraStart = { (stream) => { this.onCameraStart(stream); } }
          onCameraStop = {this.onCameraStop}
        />
    );
  }
}

ProofCamera.propTypes = {
  section: PropTypes.string.isRequired,
  setImg: PropTypes.func.isRequired,
  setRetake: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  isMobile: PropTypes.bool
}

const actions = {
  setImg,
  setRetake
}

export default connect(null, actions)(ProofCamera);
