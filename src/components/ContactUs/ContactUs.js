import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'gatsby'
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
    <Link to="/onboarding">
      <div className="contact-us" data-testid="component-contact-us">
        {t('contactUs')}
      </div>
    </Link>
  )
}

export default ContactUs;

ContactUs.propTypes = {
  history: PropTypes.object
}
