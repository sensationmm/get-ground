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

  onCameraError (error) {
    // eslint-disable-next-line no-console
    console.error('onCameraError', error);
  }

  onCameraStart (stream) {}

  onCameraStop () {}

  render () {
    const { section } = this.props
    return (
      <div className="App">
        <Camera
          data-test="camera"
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          onCameraError = { (error) => { this.onCameraError(error); } }
          idealFacingMode = {section === 'selfie' ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 1216, height: 912}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {false}
          isImageMirror = {false}
          isSilentMode = {true}
          isDisplayStartCameraError = {true}
          isFullscreen = {false}
          sizeFactor = {1}
          onCameraStart = { (stream) => { this.onCameraStart(stream); } }
          onCameraStop = { () => { this.onCameraStop(); } }
        />
      </div>
    );
  }
}

ProofCamera.propTypes = {
  section: PropTypes.string.isRequired,
  setImg: PropTypes.func.isRequired,
  setRetake: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
}

const actions = {
  setImg,
  setRetake
}

export default connect(null, actions)(ProofCamera);
