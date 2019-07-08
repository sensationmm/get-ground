import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Element, animateScroll, scroller } from 'react-scroll';
import { Link } from 'gatsby';
import ButtonHeader from 'src/components/_buttons/ButtonHeader/ButtonHeader';

import Layout from 'src/components/Layout/Layout';
import Form from 'src/components/_layout/Form/Form';
import Button from 'src/components/_buttons/Button/Button';
import ErrorBox from 'src/components/_layout/ErrorBox/ErrorBox';
import QuizQ1 from './fragments/QuizQ1';
import QuizQ2 from './fragments/QuizQ2';
import QuizQ3 from './fragments/QuizQ3';
import QuizQ4 from './fragments/QuizQ4';
import QuizQ5 from './fragments/QuizQ5';
import ModalWrapper from 'src/components/Modal/ModalWrapper';
import ModalContent from 'src/components/Modal/ModalContent';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import { showModal, hideModal } from 'src/state/actions/modal';
import formUtils from 'src/utils/form';
import { inArray } from 'src/utils/functions';

import complianceService from 'src/services/Compliance';
import modalService from 'src/services/Modal';
const ComplianceService = new complianceService();
const ModalService = new modalService();

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
      highNetWorthMarkdown: '',
      selfCertifiedMarkdown: '',
      modalMarkdown: '',
      modalCheckboxChecked: false,
      certificationComplete: false
    };
  }

  componentDidMount() {
    formUtils.initFormState(initialState);
  }

  componentWillUnmount() {
    formUtils.clearFormState();
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
    const { t, navigate, showLoader, hideLoader, form } = this.props;
    const { values } = form;

    if(restricted && (values.restricted_quiz.length > 2 ||
      !inArray('propertyvalues', values.restricted_quiz) ||
      !inArray('investmentreturns', values.restricted_quiz))
    ) {
      formUtils.setFormError(t('onBoarding.compliance.failureMessage'));
      animateScroll.scrollToTop();
    } else {
      showLoader();
      return ComplianceService.saveComplianceQuiz({
        tax_bracket: values.tax_bracket,
        large_enterprise: values.large_enterprise,
        self_certification: values.self_certification
      }).then((res) => {
        hideLoader();
        navigate('/onboarding/payment');
      });
    }
  }

  /**
   * @param {string} val - The certification value
   * @return {void}
   */
  initModal = val => {
    const { highNetWorthMarkdown, selfCertifiedMarkdown } = this.state;
    const { showModal } = this.props;


    if ((val === 'highnetworth' && highNetWorthMarkdown === '') ||
      val === 'selfcertified' && selfCertifiedMarkdown === '') {
      this.getModalContent(val)
    } else {
      this.setState({ modalMarkdown: val === 'highnetworth' ? highNetWorthMarkdown : selfCertifiedMarkdown });
      showModal();
    }

    this.setState({ modalCheckBoxChecked: false });
  }

  /**
   * @param {string} val - The certification value
   * @return {void}
   */
  getModalContent = val => {
    const { showLoader, hideLoader, showModal } = this.props;

    const markdown = val === 'highnetworth'
      ? 'Investor Statement - High Net Worth'
      : 'Investor Statement - Sophisticated';

    showLoader();
    ModalService.fetchModalContent(markdown).then(response => {
      const stateKey = val === 'highnetworth' ? 'highNetWorthMarkdown' : 'selfCertifiedMarkdown';

      this.setState({
        modalMarkdown: response.data.markdown_text,
        [stateKey]: response.data.markdown_text
      });

      hideLoader();
      showModal();
    });
  }

  closeModal = () => {
    const { modalCheckBoxChecked } = this.state;
    const { hideModal } = this.props;

    this.setState({ certificationComplete: false });

    if (modalCheckBoxChecked) {
      this.setState({ certificationComplete: true });
      this.goToStep('q5');
    }
    hideModal();
  }

  render() {
    const { t, modalIsOpen, form } = this.props;
    const {
      certificationComplete,
      modalMarkdown,
      modalCheckBoxChecked
    } = this.state;
    const { values, errors, showErrorMessage } = form;
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
    const showDone = showQ4 && (!showQ5 || restricted_quiz.length > 0) && Boolean(self_certification) && certificationComplete;

    if(showQ5) {
      numQuestions = 5;
    }

    const headerActions = <Link to="/onboarding/process-tracker"><ButtonHeader label="Exit" /></Link>;

    return (
      <Layout headerActions={headerActions} secure>
        <div data-test="container-compliance-check" className="compliance-check" role="account form-page">
          <h1>{ t('onBoarding.compliance.header') }</h1>
          <p>{ t('onBoarding.compliance.text') }</p>

          {showErrorMessage && errors.form &&
            <ErrorBox>{errors.form}</ErrorBox>
          }

          <Form spacing="40px">
            <Element id="q1">
              <QuizQ1
                numQuestions={numQuestions}
                selected={tax_bracket}
                onChange={(val) => { formUtils.updateValue('tax_bracket', val); this.goToStep('q2'); }}
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
                    formUtils.updateValue('large_enterprise', val);
                  }}
                  onClickNone={() => formUtils.updateValue('large_enterprise', ['none'])}
                  onClickNext={() => { formUtils.updateValue('large_enterprise_done', true); this.goToStep('q3'); }}
                  onDeselectAll={() => formUtils.updateValue('large_enterprise_done', false)}
                />
              }
            </Element>

            <Element id="q3">
              {showQ3 &&
                <QuizQ3
                  numQuestions={numQuestions}
                  onClick={() => { formUtils.updateValue('investment_confirmation', true); this.goToStep('q4'); }}
                />
              }
            </Element>

            <Element id="q4">
              {showQ4 &&
                <QuizQ4
                  numQuestions={numQuestions}
                  selected={self_certification}
                  onChange={(val) => {
                    formUtils.updateValue('self_certification', val);

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
                  onChange={(val) => { formUtils.updateValue('restricted_quiz', val); this.goToStep('done'); }}
                  onDeselectAll={() => formUtils.updateValue('restricted_quiz_done', false)}
                />
              }
            </Element>

            <Element id="done">
            {showDone &&
              <Button
                classes="primary"
                fullWidth
                onClick={() => this.checkResponses(showQ5)}
                label={t('onBoarding.compliance.buttonDone')}
              />
            }
            </Element>
          </Form>

          <ModalWrapper 
            transitionBool={modalIsOpen}
            transitionTime={600}
            classes="modal"
          >
            <ModalContent
              heading={t('onBoarding.compliance.modalHeading')}
              content={modalMarkdown}
              closeModal={this.closeModal}
              downloadButtonLabel={t('onBoarding.compliance.modalDownloadButtonText')}
              closeIconAltText={t('onBoarding.compliance.modalCloseAltText')}
              modalImage={investorStatementImage}
              checkboxLabel={t('onBoarding.compliance.modalCheckboxLabel')}
              hasCheckbox={true}
              checkBoxChecked={modalCheckBoxChecked}
              handleCheckboxChange={() => this.setState({ modalCheckBoxChecked: !modalCheckBoxChecked})}
            />
          </ModalWrapper>
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
  modalIsOpen: PropTypes.bool,
  form: PropTypes.object
};

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen,
  form: state.form
});

const actions = {
  showLoader,
  hideLoader,
  showModal,
  hideModal
};

export const RawComponent = ComplianceCheck;

export default connect(mapStateToProps, actions)(withTranslation()(ComplianceCheck));
