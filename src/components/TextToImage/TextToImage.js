import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './text-to-image.scss';

/**
 * TextToImage
 * @param {string} firstname - first name
 * @param {string} lastname - last name
 * @param {string} canvasWrapperId - ID for canvas wrapper element
 * @param {string} canvasId - ID for canvas element
 * @param {string} imageId - ID for image element
 * @param {string} font - font the signature image will use
 * @param {number} fontSize - font size
 * @param {function} setSignatureImg - function for setting the signature Image value
 * @param {function} onClick - function to fire on canvas wrapper click
 * @return {JSXElement} TextToImage
 */
class TextToImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ''
    };
  }

  componentDidUpdate(prevProps) {
    const { 
      firstname,
      lastname, 
      canvasWrapperId, 
      canvasId, 
      imageId,
      font,
      fontSize,
      setSignatureImg
    } = this.props;

    if ((prevProps.firstname !== firstname) || (prevProps.lastname !== lastname)) {
      const canvasWrapper = document.getElementById(canvasWrapperId);
      const { img } = this.state;

      canvasWrapper.innerHTML='';
      canvasWrapper.innerHTML=`
        <canvas id=${canvasId} />
        <img id=${imageId} src=${img} /> 
      `;

      const canvas = document.getElementById(canvasId);
      const context = canvas.getContext('2d');

      canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
      context.font = `${fontSize}px ${font}`;

      if (firstname.length + lastname.length > 25) context.font = `${fontSize - 5}px ${font}`;

      context.fillText(`${firstname} ${lastname}`, 
        (canvas.width / 2) - (context.measureText(firstname + lastname).width / 2), 90);

      this.setState({
        img: context.canvas.toDataURL()
      });

      setSignatureImg(context.canvas.toDataURL());
    }
  }

  render() {
    const { canvasWrapperId, onClick } = this.props;
    const { img } = this.state;
    return (
      <div 
        className="canvas-wrapper" 
        id={canvasWrapperId}
        onClick={() => onClick(img)}
        data-test="component-text-to-image"
      />
    );
  }
}

TextToImage.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  canvasWrapperId: PropTypes.string,
  canvasId: PropTypes.string,
  imageId: PropTypes.string,
  font: PropTypes.string,
  fontSize: PropTypes.number,
  setSignatureImg: PropTypes.func,
  onClick: PropTypes.func
}

export default TextToImage;
