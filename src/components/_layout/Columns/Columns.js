import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Slider from 'src/components/Slider/Slider';

import './columns.scss';

/**
* Columns
* Displays an array of text content in staggered left/right alignment
* @param {object} props - props object
* @return {JSXElement} - Columns component
*/
const Columns = (props) => {
  const { sections, bordered, renderSlider } = props;

  const cols = sections.map((section, count) => <Column key={`section-${count}`} {...section} /> );

  return (
    <div data-test="component-columns" className={classNames('columns', { bordered: bordered })}>
      { !renderSlider && cols }

      { renderSlider && <Slider slides={cols} /> }
    </div>
  );
}

/**
 * Column
 * Renders a section
* @param {object} props - props object
* @return {JSXElement} - Column component
 */
const Column = (props) => {
  const { heading, text, image } = props;

  return (
    <div className="column">
      <div className="column-image">
        <img src={image} />
      </div>

      <div className="column-text">
        <h3>{heading}</h3>
        <div dangerouslySetInnerHTML={{ __html: `<p>${ text } </p>` }} />
      </div>
    </div>
  )
}

Columns.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      text: PropTypes.string,
      image: PropTypes.object,
      more: PropTypes.string,
      t: PropTypes.func
    })
  ),
  bordered: PropTypes.bool,
  renderSlider: PropTypes.bool
};

Column.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
};

export default Columns;
