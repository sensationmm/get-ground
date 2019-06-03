import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Button from 'src/components/_buttons/Button/Button'
import FCA from 'src/assets/images/fca.png'
import Geovation from 'src/assets/images/geovation.png'
import LandReg from 'src/assets/images/land-reg.png'
import ICO from 'src/assets/images/ico.png'

import './trust-and-privacy.scss'

const TrustAndPrivacy = () => {
  const [t, i18n] = useTranslation();
  const [show, toggleShow] = useState(false);

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
      <h1 className="trustAndPrivacy-title">{t('trustAndPrivacy.title')}</h1>
      <p className="trustAndPrivacy-subTitle">{t('trustAndPrivacy.subTitle')}</p>
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
          classes="trustAndPrivacy-read-more"
          data-test="read-more-button"
          liveChat
          label={t('trustAndPrivacy.cta')}
          onClick={() => toggleShow(!show)}
        />
      }
      <div className="trustAndPrivacy-logos">
        <img src={FCA} />
        <img src={Geovation} />
        <img src={LandReg} />
        <img src={ICO} />
      </div>
    </div>
  )
}

export default TrustAndPrivacy;
