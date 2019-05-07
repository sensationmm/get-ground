import React, { Component, createRef } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import Button from 'src/components/_buttons/Button/Button';

import closeIcon from 'src/assets/images/close-modal-icon.svg';
import investorStatementImage from 'src/assets/images/investor-statement-image.svg';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import Checkbox from 'src/components/_form/Checkbox/Checkbox';

/**
 * HighNetWorthModalContent
 * @param {object} e - scroll event (for JSdoc)
 * @param {string} requestUrl - url for grabbing terms markdown
 * @param {function} closeModal - function for closing the modal
 * @param {string} content - markdown to be rendered
 * @param {string} heading - modal heading 
 * @param {bool} hasCheckbox - boolean to check to render the checkbox 
 * @param {function} handleCheckboxChange - function to set container state on check
 * @param {bool} checkBoxChecked - boolean set for if the checkbox is checked or not
 * @return {JSXElement} HighNetWorthModalContent
 */
class HighNetWorthModalContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdownContainerHeight: '',
      checkboxDisabled: true
    }

    this.modalHeader = createRef();
    this.requestUrl = 'https://staging-backend-236514.appspot.com/api/v1/markdown_templates_unique?category=other';
  }

  getBlobForDownload = /* istanbul ignore next */ () => {
    const { showLoader, hideLoader, content } = this.props;

    showLoader();

    axios({
      url: 'https://staging-backend-236514.appspot.com/api/v1/md2pdf',
      method: 'POST',
      data: {
        'markdown_text': content
      },
      headers: {
        /* TODO: UPDATE WHEN THERE IS A LOGIN PAGE */
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjk1LCJSb2xlIjoiIiwiZXhwIjoxNTU3MjQxNzk1LCJuYmYiOjE1NTcyMzgxOTZ9.hRzEUoekMUueUh9tdXZmZ9Qp_7tu6yof7Jk6cPCH3zE'
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
    const { hasCheckbox } = this.props;
    let modalPadding = 140;

    if (hasCheckbox) modalPadding = modalPadding + 80;

    this.setState({ markdownContainerHeight: window.innerHeight - modalPadding });
  }

  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) this.setState({ checkboxDisabled: false });
  }

  render() {
    const { markdownContainerHeight, checkboxDisabled } = this.state;
    const { 
      closeModal, 
      content, 
      heading, 
      hasCheckbox, 
      handleCheckboxChange, 
      checkBoxChecked 
    } = this.props;

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
        <div 
          className="modal--content" 
          style={{ height: markdownContainerHeight }}
          onScroll={this.handleScroll}
        >
          <h2 className="modal--title">{heading}</h2>

          <img src={investorStatementImage} />

          <div className="modal--markdown">
            <ReactMarkdown escapeHtml={false} source={content} />
          </div>
        </div>
        {hasCheckbox && 
        <div className="modal--footer">
          <Checkbox 
          /* TODO: COME BACK AND PASS THIS IN FROM THE CONTAINING PAGE WHEN THERE IS ONE */
            label="I’ve read the Investor’s statement letter and confirm that I understand the risk associated with investing."
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

HighNetWorthModalContent.propTypes = {
  closeModal: PropTypes.func,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  content: PropTypes.string,
  heading: PropTypes.string,
  hasCheckbox: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
  checkBoxChecked: PropTypes.bool
};

const actions = { 
  showLoader, 
  hideLoader
};

export const RawComponent = HighNetWorthModalContent;

export default connect(null, actions)(HighNetWorthModalContent);
