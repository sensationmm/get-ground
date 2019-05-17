import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Option from 'src/components/Option/Option';
import Button from 'src/components/_buttons/Button/Button';
import { Link } from 'gatsby';
import Form from 'src/components/_layout/Form/Form';

const QuizQ3 = props => {
  const { numQuestions, onClick } = props;
  const [t] = useTranslation();

  return (
    <div data-test="component-quizq3">
      <div className="compliance-check-section-header">{ t('onBoarding.compliance.section', { count: 3, total: numQuestions }) }</div>
      <h2>{ t('onBoarding.compliance.quiz.investmentConfirmation.title') }</h2>
      <Form>
        <Option id="under250" title={t('onBoarding.compliance.quiz.investmentConfirmation.options.band1')} />
        <Option id="under250" title={t('onBoarding.compliance.quiz.investmentConfirmation.options.band2')} />
        <Button
          classes="primary"
          fullWidth
          onClick={onClick}
          label={t('onBoarding.compliance.quiz.investmentConfirmation.buttonAgree')}
        />

        <Link to="/onboarding/not-suitable">
          <div className="contact-us">
            {t('onBoarding.compliance.quiz.investmentConfirmation.buttonDisagree')}
          </div>
        </Link>
      </Form>
    </div>
  );
};

QuizQ3.propTypes = {
  numQuestions: PropTypes.number,
  onClick: PropTypes.func
};

export default QuizQ3;
