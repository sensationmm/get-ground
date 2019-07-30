import React from 'react';
import PropTypes from 'prop-types';

import './boxes.scss';

/**
* Boxes
* Displays an array of text content in flexed boxes
* @param {object} props - props object
* @return {JSXElement} - Boxes component
*/
const Boxes = (props) => {
  const { heading, content } = props;
  
  return (
    <div data-test="component-boxes" className="boxes">
      {heading && <h2>{ heading }</h2>}

      <div className="boxes-content">
      {content.map((box, count) => {
        return (
          <div className="box" key={`box-${count}`}>
            {box.heading && <h3>{ box.heading }</h3>}
            <div dangerouslySetInnerHTML={{ __html: box.text }} />
            {box.items && box.items.map((item, i) => {
              return (
                <div className="box-item" key={`box-${count}-item-${i}`}>
                  <div className="box-item-heading">{item.heading}</div>
                  <div className="box-item-content" dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              )
            })}
            {box.footer && <div className="box-footer">{ box.footer }</div>}
          </div>
        )
      })}
      </div>
    </div>
  );
}

Boxes.propTypes = {
  heading: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      text: PropTypes.string
    })
  )
};

export default Boxes;
