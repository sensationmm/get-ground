import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import 'src/styles/pages/landing-pages.scss';

/**
* LandingContent
* Wrapper component to display page intro content in a box
*
* @param {Object} props - props object (for jsdoc)
* @param {string} children - message to display
* @return {JSXElement} LandingContent
*/
const LandingContent = props => {
  const { children, center } = props;

  return (
    <div className="landing-content">
      <div className={classNames('landing-content-inner', { centered: center })}>
        { children }
      </div>
    </div>
  );
};

LandingContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  center: PropTypes.bool
};

export default LandingContent;
