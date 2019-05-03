import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
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
export const ProcessSection = ({title, imageAltText , copy, path, status, image }) => {

  const progress = (status) => {
    if (status === 'complete') {
      return <p className="process-section-complete">100% complete</p>
    } else if(status === 'to_do') {
      return  <div className="process-section-todo"><p>To do</p></div>
    }
    return <div className="process-section-incomplete"><p>Incomplete</p></div>
  }

  return (
    <div className="process-section" onClick={() => navigate(`${path}`)}>
      <div className="process-section-img">
        <img src={image} alt={imageAltText}/>
      </div>
      <div className="process-section-body">
        <h3>{title}</h3>
        <p className="process-section-copy">{copy}</p>
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
  image: PropTypes.string
}
