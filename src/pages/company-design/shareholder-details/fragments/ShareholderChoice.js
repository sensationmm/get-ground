import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from 'src/components/_buttons/Button/Button'
import icon from 'src/assets/images/100-icon.svg'

import './shareholder-choice.scss'

const ShareholderChoice = (props) => {
  const [t] = useTranslation()
  return (
    <div className="shareholder-choice-choice" role="company-design">
      <img className="shareholder-choice-icon" src={icon} alt="100% ownership" />
      <h1 className="shareholder-choice-title">{t('companyDesign.shareholderDetails.choice.allOwnership')}</h1>
      <p className="shareholder-choice-question">{t('companyDesign.shareholderDetails.choice.addShareholdersContent')}</p>

      <Button
        data-test="add-btn"
        classes="primary shareholder-choice-add-btn"
        label={t('companyDesign.shareholderDetails.choice.button.yesAdd')}
        fullWidth
        onClick={props.addShareholders}
      />
      
      <Button
        data-test="only-one-btn"
        classes="secondary shareholder-choice-no-btn"
        label={t('companyDesign.shareholderDetails.choice.button.no')}
        fullWidth
        onClick={props.noShareholders}
      />
    </div>
  )
}

ShareholderChoice.propTypes = {
  addShareholders: PropTypes.func,
  noShareholders: PropTypes.func
}

export default ShareholderChoice;
