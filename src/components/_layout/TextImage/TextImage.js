import React from 'react';
import PropTypes from 'prop-types';

import Button from 'src/components/_buttons/Button/Button'

import './text-image.scss';

/**
* TextImage
* Wrapper component to display a set of form elememts
* @param {object} props - props object
* @param {integer} numToShow - number of items to display before show all
* @return {JSXElement} - TextImage component
*/
const TextImage = (props) => {
  const { title, text, image, buttonLabel, buttonAction, buttonClasses, buttonSecondaryLabel, buttonSecondaryAction, buttonSecondaryClasses } = props;

  return (
    <div data-test="component-list" className="text-image">
      <div className="text-image-cols">
        {image && <div className="hero-image"><img src={image} alt="" /></div>}

        <div className="text-image-content">
          <h1 dangerouslySetInnerHTML={{ __html: title }} />

          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>

      <div className="text-image-buttons">
        {buttonLabel && buttonAction && <Button label={buttonLabel} classes={buttonClasses} onClick={buttonAction} /> }

        {buttonSecondaryLabel && buttonSecondaryAction && (
          <Button onClick={buttonSecondaryAction} classes={buttonSecondaryClasses ? buttonSecondaryClasses : 'opaque'} label={buttonSecondaryLabel} />
        )}
      </div>
    </div>
  );
}

TextImage.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  text: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
  buttonLabel: PropTypes.string,
  buttonAction: PropTypes.func,
  buttonClasses: PropTypes.string,
  buttonSecondaryLabel: PropTypes.string,
  buttonSecondaryAction: PropTypes.func,
  buttonSecondaryClasses: PropTypes.string
};

export default TextImage;
