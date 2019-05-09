import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Element, animateScroll, scroller } from 'react-scroll';
import { Link } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

import Layout from 'src/components/Layout/Layout';
import Form from 'src/components/_layout/Form/Form';
import Button from 'src/components/_buttons/Button/Button';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import QuizQ1 from './fragments/Compliance/QuizQ1';
import QuizQ2 from './fragments/Compliance/QuizQ2';
import QuizQ3 from './fragments/Compliance/QuizQ3';
import QuizQ4 from './fragments/Compliance/QuizQ4';
import QuizQ5 from './fragments/Compliance/QuizQ5';
import Modal from 'src/components/Modal/Modal';
import ModalContent from 'src/components/Modal/ModalContent';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import { showModal, hideModal } from 'src/state/actions/modal';
import FormUtils from 'src/utils/form';
import { inArray } from 'src/utils/functions';

import Compliance from 'src/services/Compliance';
import ModalServices from 'src/services/Modal';

const { saveComplianceQuiz } = Compliance;
const { fetchModalContent } = ModalServices;

import investorStatementImage from 'src/assets/images/investor-statement-image.svg';
import 'src/styles/pages/compliance-check.scss';

const initialState = {
  tax_bracket: null,
  large_enterprise: [],
  investment_confirmation: false,
  self_certification: null,
  restricted_quiz: [],
  large_enterprise_done: false,
  restricted_quiz_done: false
};

/**
 * ComplianceCheck
 *
 * @return {JSXElement} CreateAccount
 */
class ComplianceCheck extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ...FormUtils.initFormState(
        initialState
      ),
      highNetWorthMarkdown: '',
      selfCertifiedMarkdown: '',
      modalMarkdown: '',
      modalCheckboxChecked: false,
      certificationComplete: false
    };
  }
  
  /**
   * @param {string} step - step to jump to
   * @return {void}
   */
  goToStep = (step) => {
    scroller.scrollTo(step, { smooth: true, offset: -90, duration: 1000, delay: 100 });
  };

  /**
   * @param {boolean} restricted - whether to validate restricted responses
   * @return {void}
   */
  checkResponses = (restricted = false) => {
    const { t, navigate, showLoader, hideLoader } = this.props;
    const { values } = this.state;

    if(restricted && (values.restricted_quiz.length > 2 ||
      !inArray('propertyvalues', values.restricted_quiz) ||
      !inArray('investmentreturns', values.restricted_quiz))
    ) {
      this.setState({
        ...this.state,
        errors: {
          form: t('compliance.failureMessage')
        },
        showErrorMessage: true
        }, animateScroll.scrollToTop());
    } else {
      showLoader();
      return saveComplianceQuiz({
        tax_bracket: values.tax_bracket,
        large_enterprise: values.large_enterprise,
        self_certification: values.self_certification
      }).then((res) => {
        hideLoader();
        navigate('payment');
      });
    }
  }

  /**
   * @param {string} val - The certification value
   * @return {void}
   */
  initModal = val => {
    const { highNetWorthMarkdown, selfCertifiedMarkdown } = this.state;

    
    if ((val === 'highnetworth' && highNetWorthMarkdown =='') || 
      val === 'selfcertified' && selfCertifiedMarkdown === '') {
      this.getModalContent(val)
    } else {
      this.setState({ modalMarkdown: val === 'highnetworth' ? highNetWorthMarkdown : selfCertifiedMarkdown });
      this.openModal();
    }

    this.setState({ modalCheckBoxChecked: false });
  }

  /**
   * @param {string} val - The certification value
   * @return {void}
   */
  getModalContent = /* istanbul ignore next */ val => {
    const { showLoader, hideLoader } = this.props;

    showLoader();
    return fetchModalContent().then(response => {
      const markdownIndex = val === 'highnetworth' ? response[0] : response[18];
      const stateKey = val === 'highnetworth' ? 'highNetWorthMarkdown' : 'selfCertifiedMarkdown';

      this.setState({ 
        modalMarkdown: markdownIndex.markdown_text,
        [stateKey]: markdownIndex.markdown_text
      });
      
      hideLoader();
      this.openModal();
    }).catch(() => {
      hideLoader();
    });
  }

  openModal = () => this.props.showModal();

  closeModal = () => {
    const { modalCheckBoxChecked } = this.state;

    this.setState({ certificationComplete: false });

    if (modalCheckBoxChecked) {
      this.setState({ certificationComplete: true });
      this.goToStep('q5');
    }
    this.props.hideModal();
  }

  render() {
    const { t, modalIsOpen } = this.props;
    const { 
      values, 
      errors, 
      showErrorMessage, 
      certificationComplete,
      modalMarkdown,
      modalCheckBoxChecked
    } = this.state;
    const {
      tax_bracket,
      large_enterprise,
      investment_confirmation,
      self_certification,
      restricted_quiz,
      large_enterprise_done,
    } = values;
    let numQuestions = 4;

    const showQ2 = !!tax_bracket;
    const showQ3 = showQ2 && large_enterprise_done && large_enterprise.length > 0;
    const showQ4 = showQ3 && investment_confirmation;
    const showQ5 = showQ4 && self_certification === 'restricted';
    const showDone = showQ4 && (!showQ5 || restricted_quiz.length > 0) && !!self_certification && certificationComplete;

    if(showQ5) {
      numQuestions = 5;
    }

    const headerActions = <Link to="/onboarding/process-tracker"><ButtonHeader label="Exit" /></Link>;

    return (
      <Layout headerActions={headerActions}>
        <div data-test="container-compliance-check" className="compliance-check" role="account">
          <h1>{ t('compliance.header') }</h1>
          <p>{ t('compliance.text') }</p>

          {showErrorMessage && errors.form.length > 0 &&
            <ErrorBox>{errors.form}</ErrorBox>
          }

          <Form spacing="40px">
            <Element id="q1">
              <QuizQ1
                numQuestions={numQuestions}
                selected={tax_bracket}
                onChange={(val) => { FormUtils.updateValue(this, 'tax_bracket', val); this.goToStep('q2'); }}
              />
            </Element>

            <Element name="q2">
              {showQ2 && 
                <QuizQ2
                  numQuestions={numQuestions}
                  selected={large_enterprise}
                  onChange={(val) => {
                    if(val.indexOf('none') >= 0) {
                      val.splice(val.indexOf('none'), 1);
                    }
                    FormUtils.updateValue(this, 'large_enterprise', val);
                  }}
                  onClickNone={() => FormUtils.updateValue(this, 'large_enterprise', ['none'])}
                  onClickNext={() => { FormUtils.updateValue(this, 'large_enterprise_done', true); this.goToStep('q3'); }}
                  onDeselectAll={() => FormUtils.updateValue(this, 'large_enterprise_done', false)}
                />
              }
            </Element>

            <Element id="q3">
              {showQ3 && 
                <QuizQ3
                  numQuestions={numQuestions}
                  onClick={() => { FormUtils.updateValue(this, 'investment_confirmation', true); this.goToStep('q4'); }}
                />
              }
            </Element>

            <Element id="q4">
              {showQ4 &&
                <QuizQ4
                  numQuestions={numQuestions}
                  selected={self_certification}
                  onChange={(val) => { 
                    FormUtils.updateValue(this, 'self_certification', val); 

                    if (val === 'highnetworth' || val === 'selfcertified') {
                      this.initModal(val);
                    } else {
                      this.setState({ certificationComplete: true })
                      this.goToStep('q5'); 
                    }
                  }}
                />
              }
            </Element>

            <Element id="q5">
              {showQ5 &&
                <QuizQ5
                  numQuestions={numQuestions}
                  selected={restricted_quiz}
                  onChange={(val) => { FormUtils.updateValue(this, 'restricted_quiz', val); this.goToStep('done'); }}
                  onDeselectAll={() => FormUtils.updateValue(this, 'restricted_quiz_done', false)}
                />
              }
            </Element>
            
            <Element id="done">
            {showDone &&
              <Button
                classes="primary"
                fullWidth
                onClick={() => this.checkResponses(showQ5)}
                label={t('compliance.buttonDone')}
              />
            }
            </Element>
          </Form>

          <CSSTransition
              in={modalIsOpen}
              timeout={600}
              classNames="modal"
              unmountOnExit
            >
              <Modal>
                <ModalContent 
                  heading={t('compliance.modalHeading')}
                  content={modalMarkdown}
                  closeModal={this.closeModal} 
                  downloadButtonLabel={t('compliance.modalDownloadButtonText')}
                  closeIconAltText={t('compliance.modalCloseAltText')}
                  modalImage={investorStatementImage}
                  checkboxLabel={t('compliance.modalCheckboxLabel')}
                  hasCheckbox={true}
                  checkBoxChecked={modalCheckBoxChecked}
                  handleCheckboxChange={() => this.setState({ modalCheckBoxChecked: !modalCheckBoxChecked})}
                />
              </Modal>
            </CSSTransition>
        </div>
      </Layout>
    );
  }
}

ComplianceCheck.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  t: PropTypes.func.isRequired,
  navigate: PropTypes.func,
  modalIsOpen: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    modalIsOpen: state.modal.isOpen
  }
};

const actions = { 
  showLoader,
  hideLoader,
  showModal,
  hideModal
};

export const RawComponent = ComplianceCheck;

export default connect(mapStateToProps, actions)(withTranslation()(ComplianceCheck));
