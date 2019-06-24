import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Button from 'src/components/_buttons/Button/Button'

import MoubinLarge from 'src/assets/images/moubin-large.svg'
import MoubinSmall from 'src/assets/images/moubin-small.svg'
import MisrabLarge from 'src/assets/images/misrab-large.svg'
import MisrabSmall from 'src/assets/images/misrab-small.svg'

import './meet-the-founders.scss'

const MeetTheFounders = () => {
  const [t] = useTranslation();
  const [show, toggleShow] = useState(false);

   return (
    <div className={classNames(
      'meet-the-founders',
      { 'read-more': show },
    )}>
      <center><h3 className="meet-the-founders-title">{t('meetTheFounders.title')}</h3></center>
      {show
        ?
          <div className="meet-the-founders-expanded" data-test="meet-the-founders-expanded">
            <div className="meet-the-founders-expanded-moubin">
              <img src={MoubinLarge} className="meet-the-founders-expanded-moubin-img" alt="Moubin Faizullah-Khan"/>
              <h3>{t('meetTheFounders.moubin.nameLong')}</h3>
              <p>{t('meetTheFounders.moubin.content.first')}</p>
              <p>{t('meetTheFounders.moubin.content.second')}</p>
            </div>
            <div className="meet-the-founders-expanded-moubin">
              <img src={MisrabLarge} className="meet-the-founders-expanded-moubin-img" alt="Misrab Faizullah-Khan"/>
              <h3>{t('meetTheFounders.misrab.nameLong')}</h3>
              <p>{t('meetTheFounders.misrab.content.first')}</p>
              <p>{t('meetTheFounders.misrab.content.second')}</p>
              <p>{t('meetTheFounders.misrab.content.third')}</p>
            </div>
          </div>
        :
        <div className="meet-the-founders-closed">
          <div className="meet-the-founders-closed-moubin">
            <img src={MoubinSmall} alt="Moubin"/>
            <h3>{t('meetTheFounders.moubin.nameShort')}</h3>
          </div>
          <div className="meet-the-founders-closed-misrab">
            <img src={MisrabSmall} alt="Misrab"/>
            <h3>{t('meetTheFounders.misrab.nameShort')}</h3>
          </div>
          <div className="meet-the-founders-closed-btn">
          <Button
            data-test="read-more-button"
            classes="primary"
            label={t('meetTheFounders.cta')}
            onClick={() => toggleShow(!show)}
          />
          </div>
        </div>
      }
      <div className="meet-the-founders-join-us">
        <h3>{t('meetTheFounders.joinUs.title')}</h3>
        <p>{t('meetTheFounders.joinUs.content')}</p>
        <center>
          <Button
            classes="meet-the-founders-join-us-btn primary"
            data-test="join-us-button"
            label={t('meetTheFounders.joinUs.title')}
            onClick={ () => window.location.assign('mailto:info@getground.com')}
          />
        </center>
      </div>
    </div>
  )
}

 export default MeetTheFounders;
