import React, { Component } from 'react';

class CanvasCurve extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.refs.canvas;
    
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
      <canvas ref="canvas" />
    );
  }
}
  
export default CanvasCurve;