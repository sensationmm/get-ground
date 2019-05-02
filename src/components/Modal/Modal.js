import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './modal.scss'

/**
 * Modal
 *
 * @return {JSXElement} Modal
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.classList.add('modal');

    this.modalRoot = document.getElementById('modal-root');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }
  
  render() {
    return createPortal(this.props.children, this.el);
  }
}

Modal.propTypes = {
  children: PropTypes.object
};

export default Modal;
