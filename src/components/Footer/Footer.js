import React from 'react'
import { useTranslation } from 'react-i18next';

import logo from 'src/assets/images/logo-footer.svg'

import './footer.scss'

const Footer = () => {
  const [t, i18n] = useTranslation();

  const links = i18n.t('footer.navigation', { returnObjects: true });
  const linksConfig = {
    links: [
      {
        'title': links['link0'].title,
      },
      {
        'title': links['link1'].title,
      },
      {
        'title': links['link2'].title,
      },
      {
        'title': links['link3'].title,
      },
      {
        'title': links['link4'].title,
      },
      {
        'title': links['link5'].title,
      },
      {
        'title': links['link6'].title,
      },
      {
        'title': links['link7'].title,
      },
      {
        'title': links['link8'].title,
      },
      {
        'title': links['link9'].title,
      },
    ]
  };

  return (
    <div className="footer" data-test="component-footer">
      <img className="footer-logo" src={logo} />
      <div className="footer-navigation">
        {linksConfig.links.map((link, idx) => (
          <div key={`${idx} + ${link.title}`} className="footer-link">
          {link.title}
          </div>
        ))}
      </div>
      <div className="footer-login">{t('footer.login')}</div>
      <div className="footer-location">{t('footer.location')}</div>
      <div className="footer-legal">{t('footer.legal')}</div>
    </div>
  )
}

export default Footer;
