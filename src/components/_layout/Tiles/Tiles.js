import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'src/components/Slider/Slider';

import './tiles.scss';

/**
* Tiles
* Displays an array of content in 3x tile formation
* @param {object} props - props object
* @return {JSXElement} - Sections component
*/
const Tiles = (props) => {
  const { tiles, renderSlider } = props;

  const content = tiles.map((tile, count) => <Tile key={`section-${count}`} {...tile} /> );

    
  const contentChunks = [];
  const contentCopy = content.slice();

  for(let i=0; i<=Math.ceil(contentCopy.length / 2); i++) {
    contentChunks.push(contentCopy.splice(0, 2));
  }
  contentChunks.push(contentCopy)

  return (
    <div data-test="component-tiles" className="tiles">
    { !renderSlider && content }

    { renderSlider && <Slider slides={contentChunks} arrows={false} /> }
    </div>
  );
}

const Tile = (props) => {
  const { text, icon } = props;

  return (
    <div className="tile">
      <div className="tile-header"><div className="tile-icon"><img src={icon} /></div></div>
      <p>{ text }</p>
    </div>
  )
}

Tiles.propTypes = {
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.object
    })
  ),
  renderSlider: PropTypes.bool
};

Tile.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string
};

export default Tiles;
