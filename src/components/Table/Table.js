import React from 'react'
import PropTypes from 'prop-types';

import './table.scss'

const Table = ({ sections, classes }) => {
  return (
    <div className={`table ${classes}`}>
      {sections.map((section, idx) => (
        <div key={`${section} + ${idx}`} className="table-section">
          <p className="table-section-copy">{section}</p>
          <div className="table-section-line"/>
        </div>
      ))}
    </div>
  )
}

Table.propTypes = {
  sections: PropTypes.array,
  classes: PropTypes.string
}

export default Table;
