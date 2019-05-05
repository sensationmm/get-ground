import React, { Component, } from 'react';
import MobileDatePicker from 'react-mobile-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

import './datepicker.scss';

/**
 * Datepicker
 * @param {string} date - for JSdoc
 * @param {func} closeDatepicker - function for closing the datepicker
 * @param {func} setDateOfBirth - function to format and set the DOB
 * @param {bool} isDatepickerOpen - boolean to check whether the picker is open or not
 * @param {string} confirmButtonText - text for the confirm button
 * @param {string} cancelButtonText - text for the cancel button
 * @return {JSXElement} Datepicker
 */
class Datepicker extends Component {
  constructor(props) {
    super(props);
  }

  handleSelect = date => this.props.setDateOfBirth(moment(date).format('Do MMMM YYYY'));

  render() {
    const { 
      isDatepickerOpen, 
      closeDatepicker, 
      confirmButtonText, 
      cancelButtonText,
    } = this.props;

    return (
      <div data-test="datepicker">
        <MobileDatePicker
          isOpen={isDatepickerOpen}
          onSelect={this.handleSelect}
          onCancel={closeDatepicker} 
          confirmText={confirmButtonText}
          cancelText={cancelButtonText}
          showHeader={false}
        />
      </div>
    );
  }
}

Datepicker.propTypes = {
  isDatepickerOpen: PropTypes.bool,
  setDateOfBirth: PropTypes.func,
  closeDatepicker: PropTypes.func,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string
};

export default Datepicker;

