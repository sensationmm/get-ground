import React from 'react';
import PropTypes from 'prop-types';
import OptionSelect from 'src/components/OptionSelect/OptionSelect';

const QuizQ4 = props => {
  const { t, numQuestions, selected, onChange } = props;

  return (
    <div data-test="component-quizq4">
      <div className="compliance-check-section-header">{ t('compliance.section', { count: 4, total: numQuestions }) }</div>
      <h2>{ t('compliance.quiz.selfCertification.title') }</h2>
      <OptionSelect
        options={[
          {
            id: 'highnetworth',
            title: t('compliance.quiz.selfCertification.options.band1.label'),
            text: t('compliance.quiz.selfCertification.options.band1.text')
          },
          {
            id: 'selfcertified',
            title: t('compliance.quiz.selfCertification.options.band2.label'),
            text: t('compliance.quiz.selfCertification.options.band2.text')
          },
          {
            id: 'restricted',
            title: t('compliance.quiz.selfCertification.options.band3.label'),
            text: t('compliance.quiz.selfCertification.options.band3.text')
          }
        ]}
        onChange={onChange}
        selected={selected}
      />
    </div>
  );
};

QuizQ4.propTypes = {
  t: PropTypes.func,
  numQuestions: PropTypes.number,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default QuizQ4;
