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
  const { children, center, green, orange, first, trust } = props;

  return (
    <div className={classNames('landing-content', { first: first }, { green: green }, { orange: orange }, { trust: trust })}>
      <div className={classNames('landing-content-inner', { centered: center })}>
        { children }
      </div>
    </div>
  );
};

LandingContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]).isRequired,
  center: PropTypes.bool,
  green: PropTypes.bool,
  orange: PropTypes.bool,
  first: PropTypes.bool,
  trust: PropTypes.bool
};

export default LandingContent;
