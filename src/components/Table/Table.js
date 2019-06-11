import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './table.scss'

const Table = ({ sections, classes, images, header, small }) => {
  return (
  <>
    {header &&
      <div className={classNames(
        'table-header',
        {'small': small}
      )}>{header}</div>
    }
    <div className={classNames(
      'table',
      {'small': small},
      {'images': images},
      classes
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
  header: PropTypes.string,
  small: PropTypes.bool
}

export default Table;
