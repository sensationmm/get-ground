import React from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'

import confirmationImage from 'src/assets/images/documents-confirmation.svg'
import TextImage from 'src/components/_layout/TextImage/TextImage';
import Layout from 'src/components/Layout/Layout'

import 'src/styles/pages/confirmation.scss'

const DocumentsConfirmation = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <div className="confirmation" role="fullscreen form-page hasCurve">
        <TextImage
          title={t('myDocuments.confirmation.heading')}
          image={confirmationImage}
          text={t('myDocuments.confirmation.copy')}
          buttonAction={() => navigate('/dashboard')}
          buttonLabel={t('myDocuments.confirmation.buttonText')}
        />
      </div>
    </Layout>
  );
}

export default DocumentsConfirmation;
