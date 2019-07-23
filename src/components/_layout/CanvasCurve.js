import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  drawCurve(ctx) {
    ctx.bezierCurveTo(0, 0, window.outerWidth / 2, 200, window.outerWidth, 0);
    ctx.lineTo(window.outerWidth,200);
    ctx.lineTo(0,200);
  }

  drawChevronTop(ctx) {
    ctx.lineTo(window.outerWidth, 0);
    ctx.lineTo(window.outerWidth, 50);
    ctx.lineTo((window.outerWidth / 3 * 2) + 30, 2)

    ctx.bezierCurveTo(
      (window.outerWidth / 3 * 2) + 30, 2, 
      window.outerWidth / 3 * 2, 0, 
      (window.outerWidth / 3 * 2) - 30, 2);

    ctx.lineTo(0,70)
  }

  drawChevronBottom(ctx) {
    ctx.lineTo(0, 150);
    ctx.lineTo((window.outerWidth / 3 * 2) - 30, 82)

    ctx.bezierCurveTo(
      (window.outerWidth / 3 * 2) - 30, 82, 
      window.outerWidth / 3 * 2, 80, 
      (window.outerWidth / 3 * 2) + 30, 82);

    ctx.lineTo(window.outerWidth, 127);
    ctx.lineTo(window.outerWidth, 150);
    ctx.lineTo(0, 150);
  }

  updateCanvas() {
    const canvas = this.canvas;
    const { shape } = this.props;
    
    const ctx = canvas.getContext('2d');

    canvas.width = window.outerWidth;
    canvas.height = 150;

    ctx.beginPath();
    ctx.fillStyle='white'
    ctx.moveTo(0,0);

    switch(shape) {
      case 'chevronTop':
        this.drawChevronTop(ctx);
        break;
      case 'chevronBottom':
        this.drawChevronBottom(ctx);
        break;
      case 'curve':
      default:
        this.drawCurve(ctx);
    }
    ctx.lineTo(0,0);
    ctx.fill()
  }

  render() {
    return (
      <canvas id={this.props.classes} ref={(ref) => this.canvas = ref} />
    );
  }
}

CanvasCurve.propTypes = {
  shape: PropTypes.oneOf(['curve', 'chevronTop', 'chevronBottom']),
  classes: PropTypes.string
}

CanvasCurve.defaultProps = {
  shape: 'curve'
}
  
export default CanvasCurve;
