import React, { Component, createRef } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'src/components/_buttons/Button/Button';
import Checkbox from 'src/components/_form/Checkbox/Checkbox';

import closeIcon from 'src/assets/images/close-icon.svg';

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
      modalError: false
    }

    this.modalHeader = createRef();
  }

  getBlobForDownload = () => {
    const { showLoader, hideLoader, content } = this.props;

    showLoader();
    this.setState({ modalError: false });

    return ModalService.markdownToPDF(content).then(response => {
      hideLoader();
      if (response.status === 400) {
        this.setState({ modalError: true });
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
    const { handleOnSign, currentModalSignature } = this.props;
    handleOnSign(currentModalSignature);
  }

  render() {
    const { markdownContainerHeight, checkboxDisabled, modalError } = this.state;
    const {
      closeModal,
      content,
      htmlContent,
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
      signatureButtonLabel,
      modalErrorText,
      isDocumentSigned,
      signatureUrl
    } = this.props;

    return (
      <div className="modal">
        <div data-test="modal-content" ref={this.modalHeader} className="modal--header">
          {downloadButtonLabel &&
            <Button
              label={downloadButtonLabel}
              onClick={this.getBlobForDownload}
            />
          }
          <img
            className="modal--close-icon"
            src={closeIcon}
            alt={closeIconAltText}
            onClick={closeModal} />
        </div>
        { modalError &&
          <div className="modal--error">{modalErrorText}</div>
        }
        <div
          className="modal--content"
          style={{ height: markdownContainerHeight }}
          onScroll={e => hasCheckbox ? this.handleScroll(e) : null }
        >
          {heading &&
            <h2 className="modal--title">{heading}</h2>
          }

          <img src={modalImage} />

          { content && 
            <div className="modal--markdown">
              <ReactMarkdown escapeHtml={false} source={content} />
            </div>
          }

          { htmlContent && 
            htmlContent
          }


          {hasSignature &&
          <div className="modal--signature-wrapper">
            <span className="modal--signature-label">{signatureLabel}</span>
            <div className="modal--signature" onClick={this.setSignature}>
              {!isDocumentSigned &&
                <span className="modal--signature-placeholder">{signaturePlaceholderText}</span>
              }
              {isDocumentSigned &&
                <img className="modal--signature-image" src={signatureUrl} />
              }
            </div>
            <Button
              classes="primary full"
              label={signatureButtonLabel}
              disabled={!isDocumentSigned}
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
  htmlContent: PropTypes.element,
  heading: PropTypes.string,
  hasCheckbox: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
  checkBoxChecked: PropTypes.bool,
  downloadButtonLabel: PropTypes.string,
  closeIconAltText: PropTypes.string,
  modalImage: PropTypes.string,
  modalErrorText: PropTypes.string,
  checkboxLabel: PropTypes.string,
  hasSignature: PropTypes.bool,
  signatureLabel: PropTypes.string,
  signaturePlaceholderText: PropTypes.string,
  signatureButtonLabel: PropTypes.string,
  signatureUrl: PropTypes.string,
  handleOnSign: PropTypes.func,
  isDocumentSigned: PropTypes.bool,
  currentModalSignature: PropTypes.string
};

const actions = {
  showLoader,
  hideLoader
};

export const RawComponent = ModalContent;

export default connect(null, actions)(ModalContent);
