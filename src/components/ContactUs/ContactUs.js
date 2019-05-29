import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

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

  return (
    <div className="contact-us">
      <p className="contact-us-title" data-testid="component-contact-us">
        {t('contactUs.title')}
      </p>
      <div className="contact-us-phone">
        <img src={Phone} />
        <p>{t('contactUs.phone')}</p>
     </div>
      <div className="contact-us-email">
        <img src={Email} />
        <p>{t('contactUs.email')}</p>
     </div>
     <div className="contact-us-divider"></div>
    </div>
  )
}

export default ContactUs;

ContactUs.propTypes = {
  history: PropTypes.object
}
