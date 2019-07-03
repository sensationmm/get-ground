import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import icon from 'src/assets/images/shareholders-choice.svg'
import TextImage from 'src/components/_layout/TextImage/TextImage';

import './shareholder-choice.scss'

const ShareholderChoice = (props) => {
  const [t] = useTranslation()
  return (
    <div className="shareholder-choice-choice" role="company-design">

      <TextImage
        title={t('companyDesign.shareholderDetails.choice.allOwnership')}
        image={icon}
        text={`<p className="shareholder-choice-question">${t('companyDesign.shareholderDetails.choice.addShareholdersContent')}</p>`}
        buttonAction={props.addShareholders}
        buttonLabel={t('companyDesign.shareholderDetails.choice.button.yesAdd')}
        buttonClasses="primary shareholder-choice-add-btn"
        buttonSecondaryAction={props.noShareholders}
        buttonSecondaryLabel={t('companyDesign.shareholderDetails.choice.button.no')}
        buttonSecondaryClasses="primary-alternate"
      />

    </div>
  )
}

ShareholderChoice.propTypes = {
  addShareholders: PropTypes.func,
  noShareholders: PropTypes.func
}

export default ShareholderChoice;
