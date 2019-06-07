import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './table.scss'

const Table = ({ sections, classes, images }) => {
  return (
  <>
    <div className={classNames(
      'table',
      classes,
      {'images': images},
    )}>
      {sections.map((section, idx) => (
        <div key={`${section} + ${idx}`} className="table-section">
          { images ?
          <img className="table-section-img" src={section.img}/>
          :
          <>
           {section.img && <img className="table-section-img" src={section.img}/>}
            <p className="table-section-copy">{section.copy}</p>
          </>
          }
          <div className="table-section-line"/>
        </div>
      ))}
    </div>
    </>
  )
}

Table.propTypes = {
  sections: PropTypes.array,
  classes: PropTypes.string,
  images: PropTypes.bool,
  header: PropTypes.string
}

export default Table;
