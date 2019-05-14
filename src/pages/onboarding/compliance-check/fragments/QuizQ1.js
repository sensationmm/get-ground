import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import OptionSelect from 'src/components/OptionSelect/OptionSelect';
import { taxBrackets } from 'src/config/legal';

const QuizQ1 = props => {
  const { numQuestions, selected, onChange } = props;
  const [t] = useTranslation();

  return (
    <div data-test="component-quiz1">
      <div className="compliance-check-section-header">{ t('compliance.section', { count: 1, total: numQuestions }) }</div>
      <h2>{ t('compliance.quiz.taxBracket.title') }</h2>
      <OptionSelect
        options={[
          {
            id: 'personal',
            title: t('compliance.quiz.taxBracket.options.band1.label'),
            text: t('compliance.quiz.taxBracket.options.band1.text'),
            value: `${taxBrackets.band1}%`
          },
          {
            id: 'basic',
            title: t('compliance.quiz.taxBracket.options.band2.label'),
            text: t('compliance.quiz.taxBracket.options.band2.text'),
            value: `${taxBrackets.band2}%`
          },
          {
            id: 'higher',
            title: t('compliance.quiz.taxBracket.options.band3.label'),
            text: t('compliance.quiz.taxBracket.options.band3.text'),
            value: `${taxBrackets.band3}%`
          },
          {
            id: 'additional',
            title: t('compliance.quiz.taxBracket.options.band4.label'),
            text: t('compliance.quiz.taxBracket.options.band4.text'),
            value: `${taxBrackets.band4}%`
          }
        ]}
        onChange={onChange}
        selected={selected}
      />
    </div>
  );
};

QuizQ1.propTypes = {
  numQuestions: PropTypes.number,
  selected: PropTypes.string,
  onChange: PropTypes.func
};

export default QuizQ1;
