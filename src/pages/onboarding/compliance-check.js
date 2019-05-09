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
import QuizQ1 from './fragments/Compliance/QuizQ1';
import QuizQ2 from './fragments/Compliance/QuizQ2';
import QuizQ3 from './fragments/Compliance/QuizQ3';
import QuizQ4 from './fragments/Compliance/QuizQ4';
import QuizQ5 from './fragments/Compliance/QuizQ5';

import { showLoader, hideLoader } from 'src/state/actions/loader';
import FormUtils from 'src/utils/form';
import { inArray } from 'src/utils/functions';

import complianceService from 'src/services/Compliance';
const ComplianceService = new complianceService();

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
      return ComplianceService.saveComplianceQuiz({
        tax_bracket: values.tax_bracket,
        large_enterprise: values.large_enterprise,
        self_certification: values.self_certification
      }).then((res) => {
        hideLoader();
        navigate('payment');
      });
    }
  }

  render() {
    const { t } = this.props;
    const { values, errors, showErrorMessage } = this.state;
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
    const showDone = showQ4 && (!showQ5 || restricted_quiz.length > 0) && !!self_certification;

    if(showQ5) {
      numQuestions = 5;
    }

    const headerActions = <Link to="/onboarding/process-tracker"><ButtonHeader label="Exit" /></Link>;

    return (
      <Layout headerActions={headerActions} secure>
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
                t={t}
                selected={tax_bracket}
                onChange={(val) => { FormUtils.updateValue(this, 'tax_bracket', val); this.goToStep('q2'); }}
              />
            </Element>

            <Element name="q2">
              {showQ2 && 
                <QuizQ2
                  numQuestions={numQuestions}
                  t={t}
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
                  t={t}
                  onClick={() => { FormUtils.updateValue(this, 'investment_confirmation', true); this.goToStep('q4'); }}
                />
              }
            </Element>

            <Element id="q4">
              {showQ4 &&
                <QuizQ4
                  numQuestions={numQuestions}
                  t={t}
                  selected={self_certification}
                  onChange={(val) => { FormUtils.updateValue(this, 'self_certification', val); this.goToStep('q5'); }}
                />
              }
            </Element>

            <Element id="q5">
              {showQ5 &&
                <QuizQ5
                  numQuestions={numQuestions}
                  t={t}
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
        </div>
      </Layout>
    );
  }
}

ComplianceCheck.propTypes = {
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
  navigate: PropTypes.func
};

const actions = { showLoader, hideLoader };

export const RawComponent = ComplianceCheck;

export default connect(null, actions)(withTranslation()(ComplianceCheck));
