

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Modal from 'src/components/Modal/Modal';

const ModalWrapper = props => {
  const {  
    transitionBool, 
    transitionTime,
    classes,
    onExited,
    children
  } = props;

  return (
    <CSSTransition
      in={transitionBool}
      timeout={transitionTime}
      classNames={classes}
      unmountOnExit
      onExited={onExited}
      data-test="component-modal-wrapper"
    >
      <Modal>
        { children }
      </Modal>
    </CSSTransition>
  );

}

ModalWrapper.propTypes = {
  children: PropTypes.object,
  transitionBool: PropTypes.bool,
  transitionTime: PropTypes.number,
  onExited: PropTypes.func,
  classes: PropTypes.string
}

export default ModalWrapper;
