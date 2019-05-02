import React, { Component, Fragment, createRef } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from '../../components/_buttons/Button/Button';

import closeIcon from '../../assets/images/close-modal-icon.svg';
import termsImage from '../../assets/images/terms-image.svg';

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
      test: '',
      termsMarkdown: '',
      markdownContainerHeight: ''
    }

    this.modalHeader = createRef();
    this.link = null;
  }

  getBlobForDownload = requestUrl => {
    axios({
      url: requestUrl,
      method: 'GET',
      headers: {
        'Authorization': 'avb068cbk2os5ujhodmt'
      },
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      this.link = document.createElement('a');
      this.link.href = url;
      this.link.setAttribute('download', 'file.pdf');
      this.modalHeader.current.appendChild(this.link);
    });
  }

  getJsonForContent = requestUrl => {
    axios({
      method: 'get',
      url: requestUrl,
      headers: {
        'Authorization': 'avb068cbk2os5ujhodmt',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      const modalPadding = 70;
      const modalHeaderHeight = this.modalHeader.current.clientHeight;
      const markdownContainerHeight = window.innerHeight - (modalHeaderHeight + modalPadding);

      this.setState({ 
        termsMarkdown: response.data[9].markdown_text,
        markdownContainerHeight: markdownContainerHeight
      });
    })
  }

  componentDidMount() {
    const requestUrl = 'https://staging-backend-236514.appspot.com/api/v1/markdown_templates_unique?category=other';

    this.getJsonForContent(requestUrl);
    this.getBlobForDownload(requestUrl);
  }

  downloadContent = () => {
    this.link.click();
  }

  render() {
    const { closeModal } = this.props;
    const { termsMarkdown, markdownContainerHeight } = this.state;

    return (
      <Fragment>
        <div ref={this.modalHeader} className="modal--header">
          <Button 
            label='Download'
            onClick={this.downloadContent}
          />
          <img 
            className="modal--close-icon" 
            src={closeIcon} 
            alt="close icon"
            onClick={closeModal} />
        </div>
        <div className="modal--content" style={{ height: markdownContainerHeight }}>
          <h2 className="modal--title">Terms and conditions</h2>

          <img src={termsImage} />

          <div className="modal--markdown">
            <ReactMarkdown escapeHtml={false} source={termsMarkdown} />
          </div>
        </div>
      </Fragment>
    );
  }
}

TermsModalContent.propTypes = {
  closeModal: PropTypes.func
};

export default TermsModalContent;
