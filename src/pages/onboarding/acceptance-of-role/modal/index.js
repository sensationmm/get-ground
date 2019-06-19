/* eslint-disable require-jsdoc */
import React from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Button from 'src/components/_buttons/Button/Button'
import ModalWrapper from 'src/components/Modal/ModalWrapper'
import ModalContent from 'src/components/Modal/ModalContent'

import { showLoader, hideLoader } from 'src/state/actions/loader'
import { showModal, hideModal } from 'src/state/actions/modal'

import modalService from 'src/services/Modal';
export const ModalService = new modalService();

export class AcceptanceOfRoleModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalTitle: '',
      modalMarkdown: ''
    }
  }

  /**
   * @param {object} e - event passed on openModal (for JSdoc)
   * @param {string} content - modal content to fetch
   * @return {void}
   */
  getModalContent = (e, content) => {
    const { showLoader, hideLoader, showModal } = this.props;
    const self = this;
    e.preventDefault();

    showLoader();

    ModalService.fetchModalContent(content).then(response => {
      self.setState({ modalTitle: response.data.title, modalMarkdown: response.data.markdown_text });

      hideLoader();
      showModal();
    });
  }

  render() {
    const { t, modalIsOpen, content, hideModal, isShareholder } = this.props
    const {modalTitle, modalMarkdown } = this.state

    return (
      <>
      <Button data-test="modal-button" classes="link small" fullWidth onClick={(e) => { this.getModalContent(e, content)}} label={isShareholder ? t('acceptanceOfRole.modal.shareholder.heading') : t('acceptanceOfRole.modal.director.heading') } />
      <ModalWrapper
          transitionBool={modalIsOpen}
          transitionTime={600}
          classes="modal"
        >
        <ModalContent
          heading={modalTitle}
          content={modalMarkdown}
          closeModal={() => hideModal()}
          closeIconAltText={t('modal.closeIconAltText')}
        />
        </ModalWrapper>
      </>
    )
  }
}

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen,
  form: state.form
});

const actions = {
  showLoader,
  hideLoader ,
  showModal,
  hideModal
};

AcceptanceOfRoleModal.propTypes = {
  content: PropTypes.string,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  t: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  isShareholder: PropTypes.bool
}

export const RawComponent = AcceptanceOfRoleModal;

export default connect(mapStateToProps, actions)(withTranslation()(AcceptanceOfRoleModal));
