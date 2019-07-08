import React, { Component } from 'react';

/**
 * CanvasCurve
 * Renders white concave curve in html5 canvas
 * @return {Object} - canvas onbject
 */
class CanvasCurve extends Component {
  componentDidMount() {
    this.updateCanvas();

    this.canvas = null;
  }

  componentWillUnmount() {
    this.canvas = null;
  }

  updateCanvas() {
    const canvas = this.canvas;
    
    const ctx = canvas.getContext('2d');

    canvas.width = window.outerWidth;
    canvas.height = 250;

    ctx.beginPath();
    ctx.fillStyle='white'
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(0,0,window.outerWidth / 2,300,window.outerWidth,0);
    ctx.lineTo(window.outerWidth,300);
    ctx.lineTo(0,300);
    ctx.lineTo(0,0);
    ctx.fill()
  }

  render() {
    return (
      <canvas ref={(ref) => this.canvas = ref} />
    );
  }
}
  
export default CanvasCurve;
