import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Layout from 'src/components/Layout/Layout';
import IntroBox from 'src/components/_layout/IntroBox/IntroBox';
import Button from 'src/components/_buttons/Button/Button';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import 'src/styles/pages/signature-setup.scss';

/**
 * SignatureSetup
 * @return {JSXElement} SignatureSetup
 */
export class SignatureSetup extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { t } = this.props;

    return (
      <Layout secure>
        <div data-test="container-signature-setup" className="signature-setup">
          <h1 className="signature-setup--title">{t('account.signature.title')}</h1>
          <IntroBox data-test="intro-box">{t('account.signature.intro')}</IntroBox>
          <h2 className="signature-setup--heading2">{t('account.signature.heading2')}</h2>

          <Link to="/account/upload-signature">
            <Button classes="full signature" label={t('account.signature.buttons.upload')}/>
          </Link>

          <Link to="/account/create-signature">
            <Button classes="full signature" label={t('account.signature.buttons.create')} />
          </Link>

          <Link to="/account/draw-signature">
            <Button classes="full signature" label={t('account.signature.buttons.draw')} />
          </Link>
        </div>
      </Layout>
    );
  }
}

SignatureSetup.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
};

const actions = { showLoader, hideLoader };

export const RawComponent = SignatureSetup;

export default connect(null, actions)(withTranslation()(SignatureSetup));
