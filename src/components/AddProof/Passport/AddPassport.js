/* eslint-disable valid-jsdoc */
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Webcam from 'react-webcam'

import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import Button from 'src/components/_buttons/Button/Button';

import Passport from 'src/assets/images/add-passport.svg'

import './add-passport.scss'
/**
 * Add Passport img
 * @author Ravin Patel
 *  @param {Function} web - t for labels
 * @return {ReactComponent} AddPassport
 */
class AddPassport extends Component {
  constructor(props) {
    super(props);
    this.inputOpenFileRef = React.createRef()
    this.state = {
      file: null,
      retakePicture: false
    }
  }

  initialLanding = () => {
    return (
      <div onClick={() => this.setState({takePicture: true})}>
        <img src={Passport} alt="add-passport"/>
      </div>
    )
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      imageSrc,
      retakePicture: true
    })
  };

  startCamera = (t, videoConstraints) => {
    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <Button classes="primary" fullWidth label={t('onBoarding.idCheck.passport.image.capture')} onClick={() => this.capture()}/>
      </div>
    )
  }

  imgConfirmation(t) {
    return (
      <>
        <img src={this.state.imageSrc}/>
        <Button classes="primary" fullWidth label={t('onBoarding.idCheck.passport.image.happy')} onClick={() => this.setState({ retakePicture: false})}/>
        <Button classes="secondary" fullWidth label={t('onBoarding.idCheck.passport.image.retake')} onClick={() => this.setState({imageSrc: null, retakePicture: true})}/>
      </>
    )
  }

  showFinalPassport = () => {
    return <img src={this.state.imageSrc} onClick={() => this.setState({ retakePicture: true })}/>
  }

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

  onImageDrop = (files) => {
    this.getBase64(files[0])
    this.setState({
      uploadedFile: files[0]
    });

  }

  handlePassport = (t) => {
    const videoConstraints = {
      width: 1280,
      height: 720,
    };

    if (this.state.imageSrc && !this.state.retakePicture) return this.showFinalPassport()

    if (!this.state.takePicture) return this.initialLanding()

    if (this.state.imageSrc ) return this.imgConfirmation(t)

    if (!this.state.imageSrc || this.state.retakePicture) return this.startCamera(t, videoConstraints)
  }

  uploadImg = (t) => {
    return (
      <Dropzone
        onDrop={this.onImageDrop}
        accept="image/*"
        multiple={false}
      >
        {({getRootProps, getInputProps}) => {
          return (
            <div
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {
              <Button classes="upload-img link" label={t('onBoarding.idCheck.passport.link')}/>
              }
            </div>
          )
        }}
      </Dropzone>
    )
  }

  render() {
    const { t } = this.props;

    return (
      <div data-test="component-add-passport" className="add-passport" role="account">
        <IntroBox>{ t('onBoarding.idCheck.passport.title') }</IntroBox>
        <p>{ !this.state.takePicture ? t('onBoarding.idCheck.passport.content') : t('onBoarding.idCheck.passport.retakeImageContent')}</p>
        {this.handlePassport(t)}
        {this.uploadImg(t)}
      </div>
    );
  }
}

AddPassport.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(AddPassport)
