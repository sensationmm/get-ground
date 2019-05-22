import React from 'react';
import useLockBodyScroll from 'react-use/lib/useLockBodyScroll';
import './loader.scss';

/**
 * Loader
 * Page loading animation
 * @return {JSXElement} Loader
 */
const Loader = () => {
  useLockBodyScroll(true);

  return (
    <div className="loader" data-test="component-loader">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
