import React from 'react';
import PropTypes from 'prop-types';

import './page-intro.scss';

/**
* PageIntro
* Wrapper component to display page intro content
*
* @param {Object} props - props object (for jsdoc)
* @param {string} children - message to display
* @return {JSXElement} PageIntro
*/
const PageIntro = props => {
  const { heading, text } = props;

  return (
    <div className="page-intro">
      {heading && <h2>{ heading }</h2>}
      {text && <div dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

PageIntro.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  heading: PropTypes.string
};

export default PageIntro;
