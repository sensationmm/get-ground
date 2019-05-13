import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import OptionSelect from 'src/components/OptionSelect/OptionSelect';

const QuizQ5 = props => {
  const { numQuestions, selected, onChange, onDeselectAll } = props;
  const [t] = useTranslation();

  return (
    <div data-test="component-quizq5">
      <div className="compliance-check-section-header">{ t('compliance.section', { count: 5, total: numQuestions }) }</div>
      <h2>{ t('compliance.quiz.questionnaire.title') }</h2>
      <OptionSelect
        options={[
          { id:'propertyvalues', title: t('compliance.quiz.questionnaire.options.band1') },
          { id:'investmentreturns', title: t('compliance.quiz.questionnaire.options.band2') },
          { id:'putallmoney', title: t('compliance.quiz.questionnaire.options.band3') },
          { id:'alwaysbuyers', title: t('compliance.quiz.questionnaire.options.band4') }
        ]}
        onChange={onChange}
        onDeselectAll={onDeselectAll}
        selected={selected}
        multiple
      />
    </div>
  );
};

QuizQ5.propTypes = {
  numQuestions: PropTypes.number,
  selected: PropTypes.array,
  onChange: PropTypes.func,
  onDeselectAll: PropTypes.func,
};

export default QuizQ5;
