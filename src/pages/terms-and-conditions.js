import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { withTranslation } from 'react-i18next';

import Layout from 'src/components/Layout/Layout';
import Button from 'src/components/_buttons/Button/Button';

import Image from 'src/assets/images/about-us.svg';

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
    const { showLoader, hideLoader } = this.props;

    showLoader();
    this.setState({ modalError: false });

    return ModalService.markdownToPDF(modalMarkdown).then(response => {
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
    const { t } = this.props;

    return (
      <Layout>
        <div class="modal-full" data-test="container-terms" role="brochure" ref={this.modalHeader}>
          <img className="hero-image" src={Image} alt="clock" data-test="about-us-img" />
          <center>
            <Button
              data-test="download-button"
              classes="primary"
              label={t('onBoarding.createAccount.termsModalDownloadButtonLabel')}
              onClick={this.getBlobForDownload}
            />
          </center>

          {modalMarkdown && <ReactMarkdown escapeHtml={false} source={modalMarkdown} />}
        </div>
      </Layout>
    )
  }
}

TermsConditions.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func
};

const actions = {
  showLoader,
  hideLoader,
};

export const RawComponent = TermsConditions;

export default connect(null, actions)(withTranslation()(TermsConditions));
