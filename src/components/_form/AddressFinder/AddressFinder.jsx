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
  * @param {function} resetAddress - function for resetting address values
  * @param {bool} isManualAddress - boolean for toggling manual fields on / off
  * @param {bool} isAddressValid - boolean for checking if the formatted address is valid
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
    this.props.resetAddress();
    this.resetSearchValue();
  }

  resetSearchValue = () => this.setState({ search: '' });

  handleInputChange = value => this.setState({ search: value, value: value });

  render() {
    const { search } = this.state;
    const { 
      resetAddress, 
      isManualAddress, 
      isAddressValid, 
      buttonLabel,
      addressFinderLabel
    } = this.props;

    return (
      <div 
        className="address-finder" 
        data-test="component-address-finder"
        style={{ display: isManualAddress ? 'none' : 'block'}}
      >
        <InputText
          id="address-finder"
          label={addressFinderLabel}
          onChange={value => this.handleInputChange(value)}
          value={search}
        />

        <label className="text-input-label" htmlFor="addressArea">Address</label>

        <div className="address-textarea">

          {!isAddressValid &&
            <div data-test="address-textarea-error" className="address-textarea-required">Required</div>
          }
          
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
              resetAddress();
              this.resetSearchValue();
            }} 
            alt="edit icon" 
          />
        </div>
        
        <Button
          onClick={this.toggleManualAddress}
          label={buttonLabel} 
          classes='link' 
        />
      </div>
    );
  }
}

AddressFinder.propTypes = {
  resetAddress: PropTypes.func.isRequired,
  isManualAddress: PropTypes.bool,
  isAddressValid: PropTypes.bool,
  buttonLabel: PropTypes.string,
  addressFinderLabel: PropTypes.string
};

export default AddressFinder;

