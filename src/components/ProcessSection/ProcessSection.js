import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import './process-section.scss'

/**
 * Process Section
 * Renders a section box for the process tracker page
 *
 * @author Ravin Patel
 * @param {string} title - props title
 * @param {string} imageAltText - props image alt text
 * @param {string} copy - props copy for section
 * @param {string} path - props path for when section is clicked
 * @param {function} onClick - action to fire when button is clicked
 * @return {JSXElement} ProcessSection
 */
export const ProcessSection = ({
  title, 
  imageAltText, 
  copy, 
  path, 
  status, 
  image, 
  completeImage,
  isDisabled=false, 
  onClick 
}) => {

  const [ t ] = useTranslation();

  const progress = (status) => {
    if (status === 'COMPLETE') {
      return <p className="process-section-complete">{ t('progressTracker.labels.complete') }</p>
    } else if(status === 'NOT_STARTED') {
      return  <p className="process-section-todo">{ t('progressTracker.labels.todo') }</p>
    } else if (status === 'signed') {
      return <p className="process-section-signed">{ t('progressTracker.labels.signed') }</p>
    } else if (status === 'not_signed') {
      return <p className="process-section-not-signed">{ t('progressTracker.labels.todoSigned') }</p>
    }
    return <p className="process-section-incomplete">{ t('progressTracker.labels.inProgress') }</p>
  }

  return (
    <div 
      className={classNames('process-section', 
        {'is-disabled': isDisabled})
      } 
      onClick={ onClick ? onClick : () => navigate(`${path}`) }
    >
      <div className="process-section-img">
        {status === 'signed' &&
          <img src={completeImage} alt={imageAltText}/>
        }
        {status !== 'signed' &&
          <img src={image} alt={imageAltText}/>
        }
      </div>
      <div className="process-section-body">
        <h3>{title}</h3>
        { copy &&
          <p className="process-section-copy">{copy}</p>
        }
        {progress(status)}
      </div>
    </div>
  )
}

ProcessSection.propTypes = {
  title: PropTypes.string,
  imageAltText: PropTypes.string,
  copy: PropTypes.string,
  path: PropTypes.string,
  status: PropTypes.string,
  image: PropTypes.string,
  completeImage: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.any
}
