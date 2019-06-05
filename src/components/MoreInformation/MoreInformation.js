import React, { useState } from 'react'
import Button from 'src/components/_buttons/Button/Button';
import { useTranslation } from 'react-i18next';

import './more-information.scss'

const MoreInformation = () => {
  const [show, toggleShow] = useState(false)
  const [t, i18n] = useTranslation()

  const moreInformation = i18n.t('howItWorks.findOutMore.moreInfo', { returnObjects: true });

  const infos = [
    {
      'title': moreInformation['info1'],
    },
    {
      'title': moreInformation['info2'],
    },
    {
      'title': moreInformation['info3'],
    },
    {
      'title': moreInformation['info4'],
    },
    {
      'title': moreInformation['info5'],
    },
    {
      'title': moreInformation['info6'],
    },
    {
      'title': moreInformation['info7'],
    },
    {
      'title': moreInformation['info8'],
    },
  ]

  return (
    <div>
      {show
          ?
          <div className="more-information-expanded">
            <h1 className="more-information-expanded-title">{t('howItWorks.findOutMore.title')}</h1>
              {infos.map((info, idx) => (
                <div key={`${idx} + ${info}`} className="more-information-expanded-info">
                  <p>{info.title}</p>
                </div>
              ))}
          </div>
          :
          <Button onClick={() => toggleShow(!show)} classes="full chat more-information-cta" label={t('howItWorks.findOutMore.label')} fullWidth/>
        }
    </div>
  )
}

export default MoreInformation
