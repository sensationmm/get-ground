import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

import confirmationImage from 'src/assets/images/intro-slide-image.png'
import Button from 'src/components/_buttons/Button/Button'
import Layout from 'src/components/Layout/Layout'

import 'src/styles/pages/confirmation.scss'

const DocumentsConfirmation = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div className="confirmation" role="fullscreen documents">
        <div className="confirmation--image-wrapper">
          <img src={confirmationImage} alt={t('myDocuments.confirmation.imageAltText')} />
        </div>
        <h2 className="confirmation--heading">{t('myDocuments.confirmation.heading')}</h2>
        <div className="confirmation--copy" dangerouslySetInnerHTML={{ __html: t('myDocuments.confirmation.copy') }} />
        <Link to="/dashboard">
          <Button
            classes="link"
            label={t('myDocuments.confirmation.buttonText')}
          />
        </Link>
      </div>
    </Layout>
  );
}

export default DocumentsConfirmation;
