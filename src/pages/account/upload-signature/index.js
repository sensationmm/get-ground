import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Dropzone from 'react-dropzone';

import signatureUtils from 'src/utils/signature';

import Layout from 'src/components/Layout/Layout';
import Button from 'src/components/_buttons/Button/Button';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';

import accountService from 'src/services/Account';
export const AccountService = new accountService();

import { showLoader, hideLoader } from 'src/state/actions/loader';

import 'src/styles/pages/upload-signature.scss';

/**
 * UploadSignature
 * @return {JSXElement} UploadSignature
 */
class UploadSignature extends Component {
  constructor(props){
    super(props);

    this.state = {
      imageSrc: '',
      imageSaved: false
    };
  }

  /**
    * @param {Blob} signatureBlob - signature blob
    * @return {void}
    */
  saveSignature = signatureBlob => {
    const { showLoader, hideLoader } = this.props;

    showLoader();
    AccountService.saveSignature(signatureBlob).then(response => {
      hideLoader();
      if (response.status === 201) {
        this.setState({ imageSaved: true })
      } else if (response.status === 400) {
        /** NEED AC added for the error state of this page... */
      }
    });
  }

  /**
   * @param {Object} file - uploaded file being turned into base64
   * @return {void}
   */
  getDataUrl = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({imageSrc: reader.result});
    };
  };

  /**
   * @param {Array} files - uploaded files from dropzone
   * @return {void}
   */
  onImageDrop = files => this.getDataUrl(files[0])

  splitSignature = () => {
    const { imageSrc } = this.state;
    const signatureBlob = signatureUtils.splitSignatureData(imageSrc);

    this.saveSignature(signatureBlob);
  }

  render() {
    const { t, location } = this.props;
    const { imageSrc, imageSaved } = this.state;

    const isEditMode = location.search === '?edit';

    return (
      <Layout secure>
        <div className="upload-signature" data-test="container-upload-signature">
          { !imageSaved &&
          <Fragment>
            <h1>{t('account.uploadSignature.title')}</h1>
            <IntroBox data-test="intro-box">{t('account.uploadSignature.intro')}</IntroBox>
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
                    <div className="upload-signature--signature-wrapper">
                      {imageSrc &&
                        <img src={imageSrc}/>
                      }
                    </div>
                    <input {...getInputProps()} />
                    { imageSrc === '' &&
                      <Button 
                        fullWidth 
                        classes="upload-file-button primary" 
                        label={t('account.uploadSignature.buttons.upload')} 
                      />
                    }
                    { imageSrc !== '' && 
                      <Button 
                        fullWidth 
                        classes="upload-file-button secondary" 
                        label={t('account.uploadSignature.buttons.reupload')}
                      />
                    }
                  </div>
                )
              }}
            </Dropzone>
            { imageSrc !== '' && 
              <Button 
                fullWidth 
                classes="upload-file-button primary" 
                label={t('account.uploadSignature.buttons.save')}
                onClick={this.splitSignature}
              />
            }
          </Fragment>
          }
          { imageSaved &&
            <Fragment>
              <h1>{t('account.yourSignature.title')}</h1>

              <IntroBox data-test="intro-box-2">
              { isEditMode
                ? t('account.yourSignature.edited')
                : t('account.yourSignature.intro')
              }
              </IntroBox>

              <img className="your-signature--saved-image" src={imageSrc} />
              <Link to={isEditMode ? '/account' : '/documents'}>
                <Button 
                  classes="primary full"
                  label={t('account.yourSignature.buttons.continue')} 
                />
              </Link>
            </Fragment>
          }
        </div>
      </Layout>
    )
  }
}

UploadSignature.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  location: PropTypes.object
};

const actions = { showLoader, hideLoader };

export const RawComponent = UploadSignature;

export default connect(null, actions)(withTranslation()(UploadSignature));
