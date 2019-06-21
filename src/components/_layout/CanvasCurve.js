import React, { Component } from 'react';

class CanvasCurve extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.refs.canvas;
    
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = 250;

    ctx.beginPath();
    ctx.fillStyle='white'
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(0,0,window.innerWidth / 2,300,window.innerWidth,0);
    ctx.lineTo(window.innerWidth,300);
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