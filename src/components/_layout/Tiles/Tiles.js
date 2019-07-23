import React from 'react';
import PropTypes from 'prop-types';

import './tiles.scss';

/**
* Tiles
* Displays an array of content in 3x tile formation
* @param {object} props - props object
* @return {JSXElement} - Sections component
*/
const Tiles = (props) => {
  const { tiles } = props;

  return (
    <div data-test="component-tiles" className="tiles">
    {tiles.map((tile, count) => <Tile key={`section-${count}`} {...tile} /> )}
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
  )
};

Tile.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string
};

export default Tiles;
