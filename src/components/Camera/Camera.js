/* eslint-disable require-jsdoc */
import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import Button from 'src/components/_buttons/Button/Button'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setImg, setRetake } from 'src/state/actions/idCheck'

import './camera.scss'

export class Camera extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: ''
    }
  }

  componentDidMount () {
    const { section } = this.props.section
    this.cameraPhoto = new CameraPhoto(this.videoRef.current);
    const facingMode = section === 'selfie' ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT;
    const idealResolution = { width: 1280, height: 720 };
    this.cameraPhoto.startCamera(facingMode, idealResolution)
  }

  takePhoto () {
    const config = {
      sizeFactor: 1
    };

    const dataUri = this.cameraPhoto.getDataUri(config);
    this.setState({ dataUri });
    this.props.setImg(this.props.section, dataUri)
    if (this.props.active === this.props.section) {
      this.props.setRetake(this.props.section, true)
    }
    this.stopCamera()
  }

  stopCamera () {
    this.cameraPhoto.stopCamera()
  }

  startCamera = () => {
    const { t } = this.props;

    return (
      <>
      <video
          data-test="camera"
          className="camera-video"
          ref={this.videoRef}
          autoPlay="true"
        />
        <Button style={`display: inline;`} data-test="capture-button" classes="primary capture" fullWidth label={t('onBoarding.idCheck.image.capture')} onClick={() => this.takePhoto()}/>
        </>
    )
  }

  render () {
    const { t } = this.props

    return (
      <div className="camera">
        {this.startCamera(t)}
      </div>
    );
  }
}

Camera.propTypes = {
  t: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
  setImg: PropTypes.func.isRequired,
  setRetake: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  overlay: PropTypes.string
}


const actions = {
  setImg,
  setRetake
}

export default connect(null, actions)(withTranslation()(Camera));
