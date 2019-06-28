import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'src/components/_buttons/Button/Button'
import FCA from 'src/assets/images/fca.png'
import Geovation from 'src/assets/images/geovation.png'
import LandReg from 'src/assets/images/land-reg.png'
import ICO from 'src/assets/images/ico.png'
import Image from 'src/assets/images/lock.svg'

import './trust-and-privacy.scss'

const TrustAndPrivacy = (props) => {
  const [t, i18n] = useTranslation();
  const [show, toggleShow] = useState(false);
  const { isMobile } = props;

  const infoContent = i18n.t('trustAndPrivacy.sections', { returnObjects: true });
  const infoConfig = {
    infos: [
      {
        'title': infoContent['info0'].title,
        'copy': infoContent['info0'].copy
      },
      {
        'title': infoContent['info1'].title,
        'copy': infoContent['info1'].copy
      },
      {
        'title': infoContent['info2'].title,
        'copy': infoContent['info2'].copy
      },
      {
        'title': infoContent['info3'].title,
        'copy': infoContent['info3'].copy
      },
      {
        'title': infoContent['info4'].title,
        'copy': infoContent['info4'].copy
      },
      {
        'title': infoContent['info5'].title,
        'copy': infoContent['info5'].copy
      },
      {
        'title': infoContent['info6'].title,
        'copy': infoContent['info6'].copy
      },
      {
        'title': infoContent['info7'].title,
        'copy': infoContent['info7'].copy
      },
    ]
  };

  return (
    <div className={classNames(
      'trustAndPrivacy',
      { 'read-more': show },
    )}>
      <h3 className="trustAndPrivacy-title">{t('trustAndPrivacy.title')}</h3>
      <p className={classNames(
      'trustAndPrivacy-subTitle',
      { 'expanded': show },
    )}>
      {t('trustAndPrivacy.subTitle')}
    </p>
      {show && !isMobile &&
        <img className={classNames(
          'hero-image',
          { 'expanded': show },
        )} src={Image} alt="" />
      }

      {show
        ?
          infoConfig.infos.map((info, idx) => (
            <div key={`${idx} + ${info.title}`} className="trustAndPrivacy-info" data-test="trustAndPrivacy-info">
              <div className="trustAndPrivacy-info-title">{info.title}</div>
              <div className="trustAndPrivacy-info-copy">{info.copy}</div>
            </div>
          ))
        :
        <Button
          classes="primary trustAndPrivacy-read-more"
          data-test="read-more-button"
          label={t('trustAndPrivacy.cta')}
          onClick={() => toggleShow(!show)}
        />
      }
      <div className="trustAndPrivacy-logos">
        <div><img src={FCA} /></div>
        <div><img src={Geovation} /></div>
        <div><img src={LandReg} /></div>
        <div><img src={ICO} /></div>
      </div>
    </div>
  )
}

TrustAndPrivacy.propTypes = {
  isMobile: PropTypes.bool
}

const mapStateToProps = state => ({
  isMobile: state.layout.isMobile
});

export const RawComponent = TrustAndPrivacy;

export default connect(mapStateToProps)(TrustAndPrivacy);
