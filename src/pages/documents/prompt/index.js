import React from 'react'
import { useTranslation } from 'react-i18next'
import { navigate } from 'gatsby';

import confirmationImage from 'src/assets/images/intro-slide-image.png'
import Button from 'src/components/_buttons/Button/Button'
import Layout from 'src/components/Layout/Layout'


const DocumentsPrompt = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div data-test="component-documents-prompt">
        <center>
          <img src={confirmationImage} alt={t('myDocuments.confirmation.imageAltText')} />
        </center>

        <h2>{t('myDocuments.prompt.heading')}</h2>
        <p>{ t('myDocuments.prompt.text') }</p>
        <p>{ t('myDocuments.prompt.text2') }</p>

        <center>
          <Button
            classes="primary"
            label={t('myDocuments.prompt.cta')}
            onClick={() => navigate('/dashboard')}
          />
        </center>
      </div>
    </Layout>
  );
}

export default DocumentsPrompt;
