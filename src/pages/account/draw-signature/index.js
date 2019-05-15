import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-pad';
import { Link } from 'gatsby'

import Layout from 'src/components/Layout/Layout';
import Button from 'src/components/_buttons/Button/Button';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';

import accountService from 'src/services/Account';
export const AccountService = new accountService();

import { showLoader, hideLoader } from 'src/state/actions/loader';

import 'src/styles/pages/draw-signature.scss';

/**
 * DrawSignature
 * @return {JSXElement} DrawSignature
 */
class DrawSignature extends Component {
  constructor(props){
    super(props);

    this.state = {
      savedSignature: '',
      isSignature: false
    };

    this.signature = null;
  }

  splitSignatureData = () => {
    if (this.signature === null) return;

    const signatureUrl = this.signature.toDataURL();
    const contentType = signatureUrl.split(';')[0].split(':')[1];
    const signatureData = signatureUrl.split(';')[1].split(',')[1];

    this.convertFileToBlob(signatureData, contentType);
  }

  /**
    * @param {string} signatureData - encoded signature string
    * @param {string} contentType - content type
    * @return {void}
    */
  convertFileToBlob = (signatureData, contentType) => {
    const sliceSize = 512;
    const byteCharacters = atob(signatureData);
    const byteArrays = [];

    contentType = contentType || '';

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    this.saveSignature(new Blob(byteArrays, {type: contentType}));
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
        if ( this.signature === null) return;
        this.setState({ savedSignature: this.signature.toDataURL() });
      } else if (response.status === 400) {
        /** NEED AC added for the error state of this page... */
      }
    });
  }

  render() {
    const { t } = this.props;
    const { isSignature, savedSignature } = this.state;

    return (
      <Layout secure>
        <div className="draw-signature" data-test="container-draw-signature">
        { savedSignature === '' && 
          <Fragment>
            <h1>{t('account.drawSignature.title')}</h1>
            <span className="draw-signature--signature-pad-label">{t('account.drawSignature.signaturePadLabel')}</span>
            <SignaturePad
              id='big-test'
              ref={(ref) => this.signature = ref}
              onEnd={ () => this.setState({ isSignature: true }) }
            />
            <div className="draw-signature--buttons">
              <Button 
                disabled={!isSignature}
                classes="secondary"
                data-test="button-redo"
                label={t('account.drawSignature.buttons.redo')}
                onClick={() => {
                  this.setState({ isSignature: false });
                  this.signature && this.signature.clear();
                }}
              />
              <Button 
                disabled={!isSignature}
                classes="primary"
                data-test="button-save"
                label={t('account.drawSignature.buttons.save')}
                onClick={this.splitSignatureData}
              />
            </div>
          </Fragment>
        }
        { savedSignature !== '' && 
          <Fragment>
            <h1>{t('account.drawSignature.title2')}</h1>
            <IntroBox data-test="intro-box">{t('account.drawSignature.yourSignatureIntro')}</IntroBox>
            <img className="draw-signature--saved-image" src={savedSignature} />
            <Button 
              data-test="button-edit"
              classes="secondary full edit"
              label={t('account.drawSignature.buttons.edit')}
              onClick={() => this.setState({ savedSignature: '', isSignature: false })}
            />
            <Link to="/documents">
              <Button 
                classes="primary full"
                label={t('account.drawSignature.buttons.continue')} 
              />
            </Link>
          </Fragment>
        }
        </div>
      </Layout>
    )
  }
}

DrawSignature.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
};

const actions = { showLoader, hideLoader };

export const RawComponent = DrawSignature;

export default connect(null, actions)(withTranslation()(DrawSignature));
