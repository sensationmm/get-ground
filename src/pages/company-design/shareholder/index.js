import React from 'react';
import Layout from 'src/components/Layout/Layout'
import { useTranslation } from 'react-i18next';

import Button from 'src/components/_buttons/Button/Button'
import icon from 'src/assets/images/100-icon.svg'

import './shareholder.scss'

const Shareholder = () => {
  const [t] = useTranslation()
  return (
    <Layout>
      <div className="shareholder" role="company-design">
        <img className="shareholder-icon" src={icon} alt="100% ownership" />
        <h1 className="shareholder-title">{t('companyDesign.shareholder.allOwnership')}</h1>
        <p className="shareholder-question">{t('companyDesign.shareholder.addShareholdersContent')}</p>
        <Button data-test="add-btn" classes="primary shareholder-add-btn" label={t('companyDesign.shareholder.button.yesAdd')} fullWidth />
        <Button data-test="only-one-btn" classes="secondary shareholder-no-btn" label={t('companyDesign.shareholder.button.no')} fullWidth />
      </div>
    </Layout>
  )
}

export default Shareholder;
