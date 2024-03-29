import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Button from 'src/components/_buttons/Button/Button'

import Email from 'src/assets/images/email-contact-us.svg'
import Phone from 'src/assets/images/phone-contact-us.svg'

import './contact-us.scss'

/**
 * Contact Us
 * App Contact Us component
 * @param {Object} props - props object (for jsdoc)
 * @return {JSXElement} ContactUs Component
 */

const ContactUs = () => {
  const [t] = useTranslation();

 const openChat = () => {
  window && window.LC_API.open_chat_window()
}

  return (
    <div className="contact-us" data-test="component-contact-us">
      <div className="contact-us-title" data-test="contact-title">
        {t('contactUs.title')}
      </div>
      <div className="contact-us-details">
        <div className="contact-us-email">
          <img src={Email} data-test="email-img"/>
          <p data-test="email-title">{t('contactUs.email')}</p>
        </div>
        <div className="contact-us-phone">
          <img src={Phone} data-test="phone-img"/>
          <p data-test="phone-title">{t('contactUs.phone')}</p>
        </div>
        <div className="contact-us-divider" data-test="contact-divider"></div>
        <Button classes="chat" data-test="livechat-button" label={t('liveChat.button')} onClick={() => openChat()} />
      </div>
    </div>
  )
}

export default ContactUs;

ContactUs.propTypes = {
  history: PropTypes.object
}
