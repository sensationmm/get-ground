import React from 'react';
import './loader.scss';

/**
 * Loader
 * Page loading animation
 * @return {JSXElement} Loader
 */
const Loader = () => {
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
