import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { withTranslation } from 'react-i18next';

import Layout from 'src/components/Layout/Layout';
import Button from 'src/components/_buttons/Button/Button';

import Image from 'src/assets/images/documents-modal.svg';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import modalService from 'src/services/Modal';
export const ModalService = new modalService();

/**
 * TermsConditions
 * @returns {JSXElement} TermsConditions
 */
class TermsConditions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalMarkdown: ''
    };

    this.modalHeader = createRef();
  }

  componentDidMount() {
    const { showLoader, hideLoader } = this.props;
    const self = this;

    showLoader();

    ModalService.fetchModalContent('getGround Terms and Conditions').then(response => {
      self.setState({ modalMarkdown: response.data.markdown_text });

      hideLoader();
    });
  }

  getBlobForDownload = () => {
    const { modalMarkdown } = this.state;
    const { showLoader, hideLoader, t } = this.props;
    const title = t('footer.navigation.link8.title')

    showLoader();
    this.setState({ modalError: false });

    return ModalService.markdownToPDF(modalMarkdown, title).then(response => {
      hideLoader();
      if (response.status === 400) {
        this.setState({ modalError: true });
      } else {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'get-ground-terms-conditions.pdf');
        if (this.modalHeader.current !== null) {
          this.modalHeader.current.appendChild(link);
          link.click();
        }
      }
    });
  }

  render() {
    const { modalMarkdown } = this.state;
    const { t, location } = this.props;

    return (
      <Layout location={location.pathname}>
        <div classNames="modal-full" data-test="container-terms" role="account brochure markdown" ref={this.modalHeader}>
          <h1>{ t('footer.navigation.link8.title') }</h1>
          <div className="hero-image"><img src={Image} alt="clock" data-test="about-us-img" /></div>

          {modalMarkdown && <ReactMarkdown escapeHtml={false} source={modalMarkdown} />}

          <center>
            <Button
              data-test="download-button"
              classes="primary"
              label={t('onBoarding.createAccount.termsModalDownloadButtonLabel')}
              onClick={this.getBlobForDownload}
            />
          </center>
        </div>
      </Layout>
    )
  }
}

TermsConditions.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

const actions = {
  showLoader,
  hideLoader,
};

export const RawComponent = TermsConditions;

export default connect(null, actions)(withTranslation()(TermsConditions));
