import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputText from 'src/components/_form/InputText/InputText';
import Button from 'src/components/_buttons/Button/Button';
import editIcon from 'src/assets/images/edit.svg';

import './address-finder.scss';

/**
  * AddressFinder
  * @param {string} value - for JSdoc
  * @param {string} buttonLabel - label value for manual address button
  * @param {string} addressFinderLabel - label value for address finder input field
  * @param {function} toggleManualAddress - function for toggling manual address fields
  * @param {bool} isManualAddress - boolean for toggling manual fields on / off
  * @param {bool} isAddressValid - boolean for checking if the formatted address is valid
  * @param {bool} isHidden - boolean for hiding the text area
  * @param {string} editIconAltText - text for the edit icon alt attribute
  * @param {string} fieldErrorText - error text for the textarea
  * @return {JSXElement} AddressFinder
  */
class AddressFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  /* TODO: figure out how to test this */
  /* istanbul ignore next */
  componentDidUpdate(prevProps) {
    const searchField = document.getElementById('address-finder');

    if (prevProps.isManualAddress !== this.props.isManualAddress) searchField.focus();
  }

  toggleManualAddress = () => {
    this.props.toggleManualAddress();
    this.resetSearchValue();
  }

  resetSearchValue = () => this.setState({ search: '' });

  handleInputChange = value => this.setState({ search: value, value: value });

  render() {
    const { search } = this.state;
    const { 
      toggleManualAddress, 
      isManualAddress, 
      isAddressValid, 
      buttonLabel,
      addressFinderLabel,
      isHidden,
      editIconAltText,
      fieldErrorText
    } = this.props;

    return (
      <div 
        className="address-finder" 
        data-test="component-address-finder"
        style={{ display: isManualAddress ? 'none' : 'block'}}
      >
        {!isAddressValid &&
          <div data-test="address-textarea-error" className="address-textarea-required">{fieldErrorText}</div>
        }

        <InputText
          id="address-finder"
          label={addressFinderLabel}
          onChange={value => this.handleInputChange(value)}
          value={search}
          wrapperClass={!isAddressValid ? 'error' : ''}
        />

        <div className="address-textarea">
          
          <div style={{ display: isHidden ? 'none' : 'block'}}>
            <textarea 
              id="addressArea" 
              name="addressArea"
              readOnly
              className={classNames([ 'address-text-area',
                {'error': !isAddressValid }
              ])}
            />
            <img 
              src={editIcon} 
              className="edit-icon"
              onClick={() => {
                toggleManualAddress();
                this.resetSearchValue();
              }} 
              alt={editIconAltText} 
            />
          </div>
        </div>
        
        <Button
          onClick={this.toggleManualAddress}
          label={buttonLabel} 
          classes='link small' 
        />
      </div>
    );
  }
}

AddressFinder.propTypes = {
  toggleManualAddress: PropTypes.func.isRequired,
  isManualAddress: PropTypes.bool,
  isAddressValid: PropTypes.bool,
  buttonLabel: PropTypes.string,
  addressFinderLabel: PropTypes.string,
  isHidden: PropTypes.bool,
  editIconAltText: PropTypes.string,
  fieldErrorText: PropTypes.string
};

export default AddressFinder;

