import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Button from 'src/components/_buttons/Button/Button'

import './meet-the-founders.scss'

const MeetTheFounders = () => {
  const [t] = useTranslation();
  const [show, toggleShow] = useState(false);

  const joinUsCTA = () => {}

   return (
    <div className={classNames(
      'meet-the-founders',
      { 'read-more': show },
    )}>
      <h1 className="meet-the-founders-title">{t('meetTheFounders.title')}</h1>
      {show
        ?
          <div data-test="meet-the-founders-expanded">
            <h3>{t('meetTheFounders.moubin.name')}</h3>
            <p>{t('meetTheFounders.moubin.content.first')}</p>
            <p>{t('meetTheFounders.moubin.content.second')}</p>
            <h3>{t('meetTheFounders.misrab.name')}</h3>
            <p>{t('meetTheFounders.misrab.content.first')}</p>
            <p>{t('meetTheFounders.misrab.content.second')}</p>
            <p>{t('meetTheFounders.misrab.content.third')}</p>
          </div>
        :
        <Button
          classes="meet-the-founders-read-more-btn"
          data-test="read-more-button"
          liveChat
          label={t('meetTheFounders.cta')}
          onClick={() => toggleShow(!show)}
        />
      }
      <div className="meet-the-founders-join-us">
        <h1>{t('meetTheFounders.joinUs.title')}</h1>
        <p>{t('meetTheFounders.joinUs.content')}</p>
        <Button
          classes="meet-the-founders-join-us-btn"
          data-test="join-us-button"
          liveChat
          label={t('meetTheFounders.joinUs.title')}
          onClick={() => joinUsCTA()}
        />
      </div>
    </div>
  )
}

 export default MeetTheFounders;
