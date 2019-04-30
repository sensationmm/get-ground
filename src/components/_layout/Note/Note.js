import React from 'react';
import PropTypes from 'prop-types';

import './note.css';

/**
* Note
* Wrapper component to display page intro content in a box
*
* @param {Object} props - props object (for jsdoc)
* @param {string} children - message to display
* @return {JSXElement} Note
*/
const Note = props => {
  const { children } = props;

  return (
    <div data-test="component-note" className="note">
      {children}
    </div>
  );
};

Note.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default Note;
