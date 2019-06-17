import React, { useState } from 'react'
import ModalWrapper from 'src/components/Modal/ModalWrapper';
import ModalContent from 'src/components/Modal/ModalContent';
import { useTranslation } from 'react-i18next';

const AcceptanceOfRoleModal = () => {
  const [t] = useTranslation()
  const [show, toggleShow] = useState(false);

  return (
    <>
    <button onClick={() => toggleShow(true)}>click me</button>
    <ModalWrapper
        transitionBool={show}
        transitionTime={600}
        classes="modal"
      >
      <ModalContent
        heading={t('acceptanceOfRole.modal.shareholder.heading')}
        htmlContent={<p>{t('acceptanceOfRole.modal.shareholder.heading')}</p>}
        closeModal={() => toggleShow(false)}
        closeIconAltText={t('modal.closeIconAltText')}
      />
      </ModalWrapper>
    </>
  )
}

export default AcceptanceOfRoleModal
