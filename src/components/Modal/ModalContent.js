import React, { Component, createRef } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'src/components/_buttons/Button/Button';
import Checkbox from 'src/components/_form/Checkbox/Checkbox';

import closeIcon from 'src/assets/images/close-modal-icon.svg';

import { showLoader, hideLoader } from 'src/state/actions/loader';

import modalService from 'src/services/Modal';
export const ModalService = new modalService();

/**
 * ModalContent
 * @param {object} e - scroll event (for JSdoc)
 * @param {function} closeModal - function for closing the modal
 * @param {string} content - markdown to be rendered
 * @param {string} heading - modal heading 
 * @param {bool} [hasCheckbox] - boolean to check to render the checkbox 
 * @param {function} [handleCheckboxChange] - function to set container state on check
 * @param {bool} [checkBoxChecked] - boolean set for if the checkbox is checked or not
 * @param {string} downloadButtonLabel - text for download button
 * @param {string} closeIconAltText - alt text for close icon
 * @param {string} modalImage - main image for the modal
 * @param {string} [checkboxLabel] - label for the checkbox
 * @return {JSXElement} ModalContent
 */
class ModalContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdownContainerHeight: '',
      checkboxDisabled: true,
      signatureImageUrl: ''
    }

    this.modalHeader = createRef();
  }

  getBlobForDownload = () => {
    const { showLoader, hideLoader, content } = this.props;

    showLoader();

    return ModalService.markdownToPDF(content).then(response => {
      hideLoader();
      if (response.status === 400) {
        // NEED AN ERROR MODAL STATE
      } else {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        if (this.modalHeader.current !== null) {
          this.modalHeader.current.appendChild(link);
          link.click();
        }
      }
    });
  }

  componentDidMount() {
    const { hasCheckbox } = this.props;
    let modalPadding = 140;

    if (hasCheckbox) modalPadding = modalPadding + 80;

    this.setState({ markdownContainerHeight: window.innerHeight - modalPadding });
  }

  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) this.setState({ checkboxDisabled: false });
  }
  setSignature = () => {
    const { signatureUrl } = this.props;
    this.setState({ signatureImageUrl: signatureUrl });
  }

  render() {
    const { markdownContainerHeight, checkboxDisabled, signatureImageUrl } = this.state;
    const { 
      closeModal, 
      content, 
      heading, 
      hasCheckbox, 
      handleCheckboxChange, 
      checkBoxChecked,
      downloadButtonLabel,
      closeIconAltText,
      modalImage,
      checkboxLabel,
      hasSignature,
      signatureLabel,
      signaturePlaceholderText,
      signatureButtonLabel
    } = this.props;

    return (
      <div className="modal">
        <div data-test="modal-content" ref={this.modalHeader} className="modal--header">
          <Button 
            label={downloadButtonLabel}
            onClick={this.getBlobForDownload}
          />
          <img 
            className="modal--close-icon" 
            src={closeIcon} 
            alt={closeIconAltText}
            onClick={closeModal} />
        </div>
        <div 
          className="modal--content" 
          style={{ height: markdownContainerHeight }}
          onScroll={e => hasCheckbox ? this.handleScroll(e) : null }
        >
          <h2 className="modal--title">{heading}</h2>

          <img src={modalImage} />

          <div className="modal--markdown">
            <ReactMarkdown escapeHtml={false} source={content} />
          </div>

          {hasSignature && 
          <div className="modal--signature-wrapper">
            <span className="modal--signature-label">{signatureLabel}</span>
            <div className="modal--signature" onClick={this.setSignature}>
              {signatureImageUrl === '' &&
                <span className="modal--signature-placeholder">{signaturePlaceholderText}</span>
              }
              {signatureImageUrl !== '' &&
                <img className="modal--signature-image" src={signatureImageUrl} />
              }
            </div>
            <Button 
              classes="primary full" 
              label={signatureButtonLabel} 
              disabled={signatureImageUrl === ''} 
              onClick={closeModal}
            />
          </div>
          }
        </div>
        {hasCheckbox && 
        <div className="modal--footer">
          <Checkbox 
            label={checkboxLabel}
            onChange={handleCheckboxChange}
            checked={checkBoxChecked}
            disabled={checkboxDisabled}
          />
        </div>
        }
      </div>
    );
  }
}

ModalContent.propTypes = {
  closeModal: PropTypes.func,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  content: PropTypes.string,
  heading: PropTypes.string,
  hasCheckbox: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
  checkBoxChecked: PropTypes.bool,
  downloadButtonLabel: PropTypes.string,
  closeIconAltText: PropTypes.string,
  modalImage: PropTypes.string,
  checkboxLabel: PropTypes.string,
  hasSignature: PropTypes.bool,
  signatureLabel: PropTypes.string,
  signaturePlaceholderText: PropTypes.string,
  signatureButtonLabel: PropTypes.string,
  signatureUrl: PropTypes.string
};

const actions = { 
  showLoader, 
  hideLoader
};

export const RawComponent = ModalContent;

export default connect(null, actions)(ModalContent);
