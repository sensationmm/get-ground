import React, { Component, createRef } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import Button from 'src/components/_buttons/Button/Button';

import closeIcon from 'src/assets/images/close-modal-icon.svg';
import termsImage from 'src/assets/images/terms-image.svg';

import { showLoader, hideLoader } from 'src/state/actions/loader';

/**
 * TermsModalContent
 * @param {string} requestUrl - url for grabbing terms markdown
 * @param {function} closeModal - function for closing the modal
 * @return {JSXElement} TermsModalContent
 */
class TermsModalContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdownContainerHeight: ''
    }

    this.modalHeader = createRef();
    this.requestUrl = 'https://staging-backend-236514.appspot.com/api/v1/markdown_templates_unique?category=other';
  }

  getBlobForDownload = /* istanbul ignore next */ () => {
    const { showLoader, hideLoader } = this.props;

    showLoader();

    axios({
      url: 'https://staging-backend-236514.appspot.com/api/v1/md2pdf',
      method: 'POST',
      data: {
        'markdown_text': this.state.termsMarkdown
      },
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjk1LCJSb2xlIjoiIiwiZXhwIjoxNTU2ODA5OTY3LCJuYmYiOjE1NTY4MDYzNjh9.K7w1ALntRT3k7NeOlHUPsVHbomwAMZ6QvNlwt86j0Fc'
      },
      responseType: 'blob'
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      this.modalHeader.current.appendChild(link);
      link.click();

      hideLoader();
    }).catch(() => {
      hideLoader();
    });
  }

  componentDidMount() {
    const modalPadding = 140;
    this.setState({ markdownContainerHeight: window.innerHeight - modalPadding });
  }

  render() {
    const { closeModal, content, heading } = this.props;
    const { markdownContainerHeight } = this.state;

    return (
      <div className="modal">
        <div data-test="terms-modal" ref={this.modalHeader} className="modal--header">
          <Button 
            label='Download'
            onClick={this.getBlobForDownload}
          />
          <img 
            className="modal--close-icon" 
            src={closeIcon} 
            alt="close icon"
            onClick={closeModal} />
        </div>
        <div className="modal--content" style={{ height: markdownContainerHeight }}>
          <h2 className="modal--title">{heading}</h2>

          <img src={termsImage} />

          <div className="modal--markdown">
            <ReactMarkdown escapeHtml={false} source={content} />
          </div>
        </div>
      </div>
    );
  }
}

TermsModalContent.propTypes = {
  closeModal: PropTypes.func,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  content: PropTypes.string,
  heading: PropTypes.string
};

const actions = { 
  showLoader, 
  hideLoader
};

export const RawComponent = TermsModalContent;

export default connect(null, actions)(TermsModalContent);
