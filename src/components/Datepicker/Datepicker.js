import React, { Component, } from 'react';
import MobileDatePicker from 'react-mobile-datepicker';
import PropTypes from 'prop-types';

import './datepicker.scss';

/**
 * Datepicker
 * @param {string} date - for JSdoc
 * @param {func} closeDatepicker - function for closing the datepicker
 * @param {func} setDateFieldValue - function to format and set the DOB
 * @param {bool} isDatepickerOpen - boolean to check whether the picker is open or not
 * @param {string} confirmButtonText - text for the confirm button
 * @param {string} cancelButtonText - text for the cancel button
 * @return {JSXElement} Datepicker
 */
class Datepicker extends Component {
  constructor(props) {
    super(props);
  }

  handleSelect = date => this.props.setDateFieldValue(date);

  render() {
    const {
      isDatepickerOpen,
      closeDatepicker,
      confirmButtonText,
      cancelButtonText,
      birthDate
    } = this.props;

    const newDate = new Date()
    newDate.setFullYear(newDate.getFullYear() + -18)

    const maxDate = birthDate ? newDate : undefined;
    return (
      <div data-test="datepicker">
        <MobileDatePicker
          isOpen={isDatepickerOpen}
          onSelect={this.handleSelect}
          onCancel={closeDatepicker}
          confirmText={confirmButtonText}
          cancelText={cancelButtonText}
          showHeader={false}
          max={maxDate}
        />
      </div>
    );
  }
}

Datepicker.propTypes = {
  isDatepickerOpen: PropTypes.bool,
  setDateFieldValue: PropTypes.func,
  closeDatepicker: PropTypes.func,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  birthDate: PropTypes.bool
};

export default Datepicker;

