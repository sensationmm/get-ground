import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Image from 'src/assets/images/person.svg'
import './process-section.scss'

export const ProcessSection = ({title, imageAltText , copy, path }) => {
  return (
    <div className="process-section" onClick={() => navigate(`${path}`)}>
      <div className="process-section-img">
        <img src={Image} alt={imageAltText}/>
      </div>
      <div className="process-section-body">
        <h3>{title}</h3>
        <p className="process-section-copy">{copy}</p>
        <p className="process-section-progress">100% complete</p>
      </div>
    </div>
  )
}

ProcessSection.propTypes = {
  title: PropTypes.string,
  imageAltText: PropTypes.string,
  copy: PropTypes.string,
  path: PropTypes.string
}
