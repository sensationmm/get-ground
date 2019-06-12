import React, { useState, useEffect } from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'

import Table from 'src/components/Table/Table'

import './table-slider.scss'

const TableSlider = ({ leftHandFeed, smallFeed1, smallFeed2, feed1, feed2, tableName } ) => {
  const [TableIndex, toggleTableIndex] = useState(0)
  const [t] = useTranslation()

  useEffect(() => {
    const _T = document.querySelector(`.right.${tableName}`);
    let ts = 0;
    _T.addEventListener('touchstart', function(e) {
      ts = e.changedTouches[0].clientX
    })

    _T.addEventListener('touchend', function(e) {
      const te = e.changedTouches[0].clientX
      if (ts < te ) {
        const idx = TableIndex === 0 ? 2 : TableIndex - 1
        toggleTableIndex(idx)
      } else {
        const idx = TableIndex === 2 ? 0 : TableIndex + 1
        toggleTableIndex(idx)
      }
    })
  })

  const answersTable = (index) => {
    if (index === 0) {
      return (
        <div className={classNames('right', tableName)}>
          <Table data-test="small-table" header={t('advantages.companyHeader')}  classes={classNames('blue', 'right', tableName)} sections={smallFeed2} images small />
          <Table data-test="small-table" header={t('advantages.personalHeader')} classes={classNames('right', tableName)} sections={smallFeed1} images small/>
        </div>
      )
    }

    if (index === 1) {
      return (
        <Table data-test="personal-table" header={t('advantages.personalHeader')} classes={classNames('right', tableName)} sections={feed1} />
      )
    }

    if (index === 2) {
      return (
        <Table data-test="company-table" header={t('advantages.companyHeader')} classes={classNames('right', 'blue', tableName)} sections={feed2} />
      )
    }
  }


  return (
    <>
      <Table data-test="left-table" sections={leftHandFeed} classes={classNames(tableName)}/>
        {answersTable(TableIndex)}
      <div className="table-slider-bullet">
        <span
          className={classNames({ 'active' : TableIndex === 0 })}
          onClick={() => toggleTableIndex(0)}
          data-test="bullet-point1"
        />
        <span
          className={classNames({ 'active' : TableIndex === 1 })}
          onClick={() => toggleTableIndex(1)}
          data-test="bullet-point2"
        />
        <span
          className={classNames({ 'active' : TableIndex === 2 })}
          onClick={() => toggleTableIndex(2)}
          data-test="bullet-point3"
        />
      </div>
    </>
  )
}

TableSlider.propTypes = {
  leftHandFeed: PropTypes.array,
  smallFeed1: PropTypes.array,
  smallFeed2: PropTypes.array,
  feed1: PropTypes.array,
  feed2: PropTypes.array,
  tableName: PropTypes.string
}

export default TableSlider