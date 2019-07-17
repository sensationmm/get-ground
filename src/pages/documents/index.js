import React, { Fragment, Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby'

import { ProcessSection } from 'src/components/ProcessSection/ProcessSection';
import Layout from 'src/components/Layout/Layout';
import Button from 'src/components/_buttons/Button/Button';
import ModalWrapper from 'src/components/Modal/ModalWrapper';
import ModalContent from 'src/components/Modal/ModalContent';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import { showModal, hideModal } from 'src/state/actions/modal';

import modalService from 'src/services/Modal';
export const ModalService = new modalService();

import DocumentImage from 'src/assets/images/document.svg';
import DocumentSignedImage from 'src/assets/images/document-signed.svg';
import documentsModal from 'src/assets/images/documents-modal.svg';

import './my-documents.scss';

/**
 * MyDocuments
 * @return {ReactComponent} MyDocuments
 */
export class MyDocuments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkbox: false,
      modalDocumentKey: '',
      shareholdersAgreementSigned: false,
      companyArticlesSigned: false,
      directorsLoanSigned: false,
      consentToActSigned: false,
      BoardResolutionSigned: false,
      shareholdersAgreementMarkdown: '',
      companyArticlesMarkdown: '',
      directorsLoanMarkdown: '',
      consentToActMarkdown: '',
      BoardResolutionMarkdown: '',
      modalMarkdown: ''
    }
  }

  /**
   * @param {string} markdownStateKey - The state key to assign the mark down value to
   * @param {string} markdownTitle - The markdown title to use in the GET url
   * @param {string} signedDocStateKey - The state key for checking if the doc is signed within the modal
   * @return {void}
   */
  initModal = (markdownStateKey, markdownTitle, signedDocStateKey) => {
    const { showModal } = this.props;

    if (this.state[markdownStateKey] === '') {
      this.getModalContent(markdownStateKey, markdownTitle)
      this.setState({
        modalDocumentKey: signedDocStateKey
      })
    } else {
      this.setState({ modalMarkdown: this.state[markdownStateKey] });
      showModal();
    }
  }

  /**
   * @param {string} markdownStateKey - The state key to assign the mark down value to
   * @param {string} markdownTitle - The markdown title to use in the GET url
   * @return {void}
   */
  getModalContent = (markdownStateKey, markdownTitle) => {
    const { showLoader, hideLoader, showModal } = this.props;

    showLoader();
    ModalService.fetchModalContent(markdownTitle).then(response => {
      this.setState({
        modalMarkdown: response.data.markdown_text,
        [markdownStateKey]: response.data.markdown_text
      });

      hideLoader();
      showModal();
    });
  }

  closeModal = () => {
    const { hideModal } = this.props;
    hideModal();
  }

  getAllMarkdown = () => {
    /* TODO: THIS IS CURRENTLY DUMMY MARKUP - WE NEED THE REAL ENDPOINTS SET UP FOR EACH DOC */
    const markdowns = [
      {
        markdownStateKey: 'shareholdersAgreementMarkdown',
        title: 'Investor Statement - High Net Worth'
      },
      {
        markdownStateKey: 'companyArticlesMarkdown',
        title: 'Investor Statement - Sophisticated'
      },
      {
        markdownStateKey: 'directorsLoanMarkdown',
        title: 'Investor Statement - High Net Worth'
      },
      {
        markdownStateKey: 'consentToActMarkdown',
        title: 'Investor Statement - Sophisticated'
      },
      {
        markdownStateKey: 'BoardResolutionMarkdown',
        title: 'Investor Statement - High Net Worth'
      }
    ];

    // If getAllMarkdown has already been fired and the download links already exist just click them and get out...
    if (document.querySelectorAll('.pdf-link').length === markdowns.length) {
      document.querySelectorAll('.pdf-link').forEach(link => {
        link.click();
      })
      return;
    }

    markdowns.forEach((markdown) => {
      // If the markdowns haven't been stored yet, get them before downloading...
      if (this.state[markdown.markdownStateKey] === '') {
        ModalService.fetchModalContent(markdown.title).then(response => {
          this.setState({
            [markdown.markdownStateKey]: response.data.markdown_text
          });
          this.downloadAllFiles(response.data.markdown_text);
        });
      // Else just download them ( they could have previously been stored by opening the
      // relevant modal OR by firing getAllMarkdown once already... )
      } else {
        this.downloadAllFiles(this.state[markdown.markdownStateKey]);
      }
    });
  }

  // Transform the markdown into PDF urls, create links and click them progromatically for download
  downloadAllFiles = (markdown) => {
    return ModalService.markdownToPDF(markdown).then(response => {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      link.setAttribute('class', 'pdf-link');
      if (document.getElementById('my-documents') !== null) {
        document.getElementById('my-documents').appendChild(link);
        link.click();
      }
    });
  }

  checkAllSigned = () => {
    const {
      shareholdersAgreementSigned,
      companyArticlesSigned,
      directorsLoanSigned,
      consentToActSigned,
      BoardResolutionSigned
    } = this.state;

    if (shareholdersAgreementSigned && companyArticlesSigned &&
      directorsLoanSigned && consentToActSigned && BoardResolutionSigned) {
      navigate('/documents/confirmation');
    }
  }

  render() {
    const { t, i18n, modalIsOpen, signature } = this.props;
    const {
      modalMarkdown,
      modalDocumentKey,
      shareholdersAgreementSigned,
      companyArticlesSigned,
      directorsLoanSigned,
      consentToActSigned,
      BoardResolutionSigned
    } = this.state;
    const documentsContent = i18n.t('myDocuments.documents', { returnObjects: true });
    const documentsConfig = {
      documents: [
        {
          'title': documentsContent['document1'].title,
          'imageAltText': documentsContent['document1'].imageAltText,
          'status': shareholdersAgreementSigned ? 'signed' : 'not_signed',
          'image': DocumentImage,
          'completeImage': DocumentSignedImage,
          'onClick': () => {
            this.initModal('shareholdersAgreementMarkdown', 'Investor Statement - High Net Worth', 'shareholdersAgreementSigned');
          }
        },
        {
          'title': documentsContent['document2'].title,
          'imageAltText': documentsContent['document2'].imageAltText,
          'status': companyArticlesSigned ? 'signed' : 'not_signed',
          'image': DocumentImage,
          'completeImage': DocumentSignedImage,
          'onClick': () => {
            this.initModal('companyArticlesMarkdown', 'Investor Statement - Sophisticated', 'companyArticlesSigned');
          }
        },
        {
          'title': documentsContent['document3'].title,
          'imageAltText': documentsContent['document3'].imageAltText,
          'status': directorsLoanSigned ? 'signed' : 'not_signed',
          'image': DocumentImage,
          'completeImage': DocumentSignedImage,
          'onClick': () => {
            this.initModal('directorsLoanMarkdown', 'directors loan agreement', 'directorsLoanSigned');
          }
        },
        {
          'title': documentsContent['document4'].title,
          'imageAltText': documentsContent['document4'].imageAltText,
          'status': consentToActSigned ? 'signed' : 'not_signed',
          'image': DocumentImage,
          'completeImage': DocumentSignedImage,
          'onClick': () => {
            this.initModal('consentToActMarkdown', 'consent to act as director', 'consentToActSigned');
          }
        },
        {
          'title': documentsContent['document5'].title,
          'imageAltText': documentsContent['document5'].imageAltText,
          'status': BoardResolutionSigned ? 'signed' : 'not_signed',
          'image': DocumentImage,
          'completeImage': DocumentSignedImage,
          'onClick': () => {
            this.initModal('BoardResolutionMarkdown', 'board resolution to exchange contracts', 'BoardResolutionSigned');
          }
        }
      ]
    };

    return (
      <Fragment>
        <Layout secure>
          <div id="my-documents" className="process-tracker" role="fullscreen company-design form-page">
            <h3 className="process-tracker--title">{t('myDocuments.title')}</h3>
            <p className="process-tracker--intro">{t('myDocuments.intro')}</p>
            <div className="process-tracker-sections">
              {documentsConfig.documents.map((document, idx) => <ProcessSection key={`${idx} + ${document.title}`} {...document} />)}
            </div>
            <Button
              classes="tertiary"
              fullWidth
              label={t('myDocuments.downloadButtonText')}
              onClick={this.getAllMarkdown}
            />

            <ModalWrapper
              transitionBool={modalIsOpen}
              transitionTime={600}
              classes="modal"
              onExited={this.checkAllSigned}
            >
              <ModalContent
                heading={t('myDocuments.modalHeading')}
                content={modalMarkdown}
                closeModal={this.closeModal}
                downloadButtonLabel={t('myDocuments.modalDownloadButtonText')}
                closeIconAltText={t('myDocuments.modalCloseAltText')}
                modalImage={documentsModal}
                modalErrorText={t('myDocuments.modalDownloadError')}
                hasSignature={true}
                isDocumentSigned={this.state[modalDocumentKey]}
                currentModalSignature={modalDocumentKey}
                handleOnSign={() => this.setState({ [modalDocumentKey]: true })}
                signatureLabel={t('myDocuments.modalSignatureLabel')}
                signaturePlaceholderText={t('myDocuments.modalSignaturePlaceholderText')}
                signatureButtonLabel={t('myDocuments.modalSignatureButtonLabel')}
                signatureUrl={signature.includes('data:image') ? signature : `data:image/jpeg;base64, ${signature}`}
              />
            </ModalWrapper>
          </div>
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader,
  modalIsOpen: state.modal.isOpen,
  signature: state.documents.file_signature
});

MyDocuments.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  signature: PropTypes.string.isRequired
};

const actions = {
  showLoader,
  hideLoader ,
  showModal,
  hideModal
};

export const RawComponent = MyDocuments;
export default connect(mapStateToProps, actions)(withTranslation()(MyDocuments))
