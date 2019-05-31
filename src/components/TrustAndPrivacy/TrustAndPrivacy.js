import React from 'react'

import './trust-and-privacy.scss'
import { useTranslation } from 'react-i18next';

const TrustAndPrivacy = () => {
  const [t] = useTranslation();

  return (
    <div className="trustAndPrivacy">
      <h1 className="trustAndPrivacy-title">{t('trustAndPrivacy.title')}</h1>
      <p className="trustAndPrivacy-subTitle">{t('trustAndPrivacy.subTitle')}</p>
    </div>
  )
}

export default TrustAndPrivacy;
