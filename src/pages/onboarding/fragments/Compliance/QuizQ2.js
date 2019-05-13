import React from 'react';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import OptionSelect from 'src/components/OptionSelect/OptionSelect';
import Option from 'src/components/Option/Option';
import Button from 'src/components/_buttons/Button/Button';
import { inArray } from 'src/utils/functions';

const QuizQ2 = props => {
  const { numQuestions, selected, onChange, onClickNone, onClickNext, onDeselectAll } = props;
  const [t] = useTranslation();

  return (
    <div data-test="component-quizq2">
      <div className="compliance-check-section-header">{ t('compliance.section', { count: 2, total: numQuestions }) }</div>
      <h2>{ t('compliance.quiz.largeEnterprise.title') }</h2>
      <OptionSelect
        options={[
          { id:'under250', title: t('compliance.quiz.largeEnterprise.options.band1') },
          { id:'under43balance', title: t('compliance.quiz.largeEnterprise.options.band2') },
          { id:'under50turnover', title: t('compliance.quiz.largeEnterprise.options.band3') },
        ]}
        onChange={onChange}
        onDeselectAll={onDeselectAll}
        selected={selected}
        multiple
      />
      <Option
        id="none"
        title={t('compliance.quiz.largeEnterprise.options.band4')}
        onClick={onClickNone}
        selected={inArray('none', selected)}
      />
      <br />
      <Button
        classes="primary"
        fullWidth
        onClick={onClickNext} label={t('compliance.quiz.largeEnterprise.buttonNext')}
        disabled={selected && selected.length === 0}
      />
    </div>
  );
};

QuizQ2.propTypes = {
  numQuestions: PropTypes.number,
  selected: PropTypes.array,
  onChange: PropTypes.func,
  onDeselectAll: PropTypes.func,
  onClickNone: PropTypes.func,
  onClickNext: PropTypes.func
};

export default QuizQ2;
