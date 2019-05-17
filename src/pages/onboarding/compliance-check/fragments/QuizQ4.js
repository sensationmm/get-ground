import React from 'react';
import PropTypes from 'prop-types';
import OptionSelect from 'src/components/OptionSelect/OptionSelect';
import { useTranslation } from 'react-i18next';

const QuizQ4 = props => {
  const { numQuestions, selected, onChange } = props;
  const [t] = useTranslation();

  return (
    <div data-test="component-quizq4">
      <div className="compliance-check-section-header">{ t('onBoarding.compliance.section', { count: 4, total: numQuestions }) }</div>
      <h2>{ t('onBoarding.compliance.quiz.selfCertification.title') }</h2>
      <OptionSelect
        options={[
          {
            id: 'highnetworth',
            title: t('onBoarding.compliance.quiz.selfCertification.options.band1.label'),
            text: t('onBoarding.compliance.quiz.selfCertification.options.band1.text')
          },
          {
            id: 'selfcertified',
            title: t('onBoarding.compliance.quiz.selfCertification.options.band2.label'),
            text: t('onBoarding.compliance.quiz.selfCertification.options.band2.text')
          },
          {
            id: 'restricted',
            title: t('onBoarding.compliance.quiz.selfCertification.options.band3.label'),
            text: t('onBoarding.compliance.quiz.selfCertification.options.band3.text')
          }
        ]}
        onChange={onChange}
        selected={selected}
      />
    </div>
  );
};

QuizQ4.propTypes = {
  numQuestions: PropTypes.number,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default QuizQ4;
