import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';

import ContactUs from 'src/components/ContactUs/ContactUs'

import logo from 'src/assets/images/logo-footer.svg';

import './footer.scss';

const Footer = () => {
  const [t, i18n] = useTranslation();

  const links = i18n.t('footer.navigation', { returnObjects: true });
  const linksConfig = {
    links: [
      {
        title: links['link0'].title,
        link: '/what-we-do'
      },
      {
        title: links['link3'].title,
        link: '/partnerships'
      },
      {
        title: links['link2'].title,
        link: '/advantages'
      },
      {
        title: links['link5'].title,
        link: '/frequently-asked-questions'
      },
      {
        title: links['link4'].title,
        link: '/how-it-works'
      },
      {
        title: links['link8'].title,
        link: '/terms-and-conditions'
      },
      {
        title: links['link6'].title,
        link: '/pricing'
      },
      {
        title: links['link9'].title,
        link: '/privacypolicy'
      },
      {
        title: links['link1'].title,
        link: '/about-us'
      },
    ]
  };

  return (
    <div className="footer-outer">
      <ContactUs />
      <div className="footer" data-test="component-footer">
        <img className="footer-logo" src={logo} data-test="component-footer-img" />
        <div className="footer-navigation" data-test="component-footer-navigation">
          {linksConfig.links.map((link, idx) => (
            <Link key={`${idx} + ${link.title}`} to={link.link} className="footer-link" data-test="component-footer-link">
              {link.title}
            </Link>
          ))}
        </div>
        <div data-test="component-footer-location" className="footer-location">{t('footer.location')}</div>
        <div data-test="component-footer-legal" className="footer-legal">{t('footer.legal')}</div>
      </div>
    </div>
  );
}

export default Footer;
