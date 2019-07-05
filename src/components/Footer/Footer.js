import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';

import ContactUs from 'src/components/ContactUs/ContactUs'

import logo from 'src/assets/images/logo-white.svg';

import './footer.scss';

const Footer = (props) => {
  const [t, i18n] = useTranslation();
  const { hideNav } = props;

  const links = i18n.t('footer.navigation', { returnObjects: true });
  const linksConfig = {
    links: [
      {
        title: links['link0'].title,
        link: '/what-we-do'
      },
      {
        title: links['link6'].title,
        link: '/pricing'
      },
      {
        title: links['link5'].title,
        link: '/frequently-asked-questions'
      },
      {
        title: links['link2'].title,
        link: '/advantages'
      },
      {
        title: links['link1'].title,
        link: '/about-us'
      },
      {
        title: links['link8'].title,
        link: '/terms-and-conditions'
      },
      {
        title: links['link4'].title,
        link: '/how-it-works'
      },
      {
        title: links['link3'].title,
        link: '/partnerships'
      },
      {
        title: links['link9'].title,
        link: '/privacypolicy'
      },
    ]
  };

  return (
    <div className="footer-outer">
      <div className="footer-mask"><ContactUs /></div>
      {!hideNav && (
        <div className="footer" data-test="component-footer">
          <div className="footer-links">
            <img className="footer-logo" src={logo} data-test="component-footer-img" />
            <div className="footer-navigation" data-test="component-footer-navigation">
              {linksConfig.links.map((link, idx) => (
                <Link key={`${idx} + ${link.title}`} to={link.link} className="footer-link" data-test="component-footer-link">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          <div data-test="component-footer-location" className="footer-location">{t('footer.location')}</div>
          <div data-test="component-footer-legal" className="footer-legal">{t('footer.legal')}</div>
        </div>
      )}
    </div>
  );
}

Footer.propTypes = {
  hideNav: PropTypes.bool
};

export default Footer;
