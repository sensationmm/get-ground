import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-pad';
import { Link } from 'gatsby'

// import signatureUtils from 'src/utils/signature';

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

  /**
    * @param {Blob} signatureBlob - signature blob
    * @return {void}
    */
  saveSignature = ()  => {
    const { showLoader, hideLoader } = this.props;
    const signature = this.signature.toDataURL();

    showLoader();
    AccountService.saveSignature(signature).then(response => {
      hideLoader();
      if (response.status === 200) {
        if ( this.signature === null) return;
        this.setState({ savedSignature: this.signature.toDataURL() });
      } else if (response.status === 400) {
        /** TODO NEED AC added for the error state of this page... */
      }
    });
  }

  render() {
    const { t, location } = this.props;
    const { isSignature, savedSignature } = this.state;

    const isEditMode = location.search === '?edit';

    return (
      <Layout secure>
        <div className="draw-signature" data-test="container-draw-signature">
        { savedSignature === '' &&
          <>
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
                onClick={this.saveSignature}
              />
            </div>
          </>
        }
        { savedSignature !== '' &&
          <>
            <h1>{t('account.yourSignature.title')}</h1>

            <IntroBox data-test="intro-box">
            { isEditMode
              ? t('account.yourSignature.edited')
              : t('account.yourSignature.intro')
            }
            </IntroBox>

            <img className="your-signature--saved-image" src={savedSignature} />
            <Button
              data-test="button-edit"
              classes="secondary full edit"
              label={t('account.yourSignature.buttons.edit')}
              onClick={() => this.setState({ savedSignature: '', isSignature: false })}
            />
            <Link to={isEditMode ? '/account' : '/documents'}>
              <Button
                classes="primary full"
                label={t('account.yourSignature.buttons.continue')}
              />
            </Link>
          </>
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
  location: PropTypes.object
};

const actions = { showLoader, hideLoader };

export const RawComponent = DrawSignature;

export default connect(null, actions)(withTranslation()(DrawSignature));
