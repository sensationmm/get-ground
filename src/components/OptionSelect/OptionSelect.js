import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Option from 'src/components/Option/Option';
import Form from 'src/components/_layout/Form/Form';
import { inArray } from 'src/utils/functions';
import { isArray } from 'util';

/**
* OptionSelect
*
* @param {Object} props - props object (for jsdoc)
* @param {array} options - array of Options elements to show (see Option.js for spec)
* @param {function} onChange - callback function to execute options are clicked
* @param {array} selected - array of selected values
* @param { boolean} multiple - whether to allow multiple value selections
* @param {function} onDeselectAll - callback function to execute when all options are unclicked
* @return {JSXElement} SelectOption
*/
class OptionSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: []
    };
  }

  componentDidUpdate() {
    if(this.props.selected && this.state.selected !== this.props.selected) {
      this.setState({ selected: this.props.selected })
    }
  }

  /**
   * @param {string} val - clicked option id
   * @return {void}
   */
  onClick = (val) => {
    const { onChange, multiple, onDeselectAll } = this.props;
    const selected = this.state.selected;

    if(!multiple) {
      onChange(val);
    } else {
      const ix = selected.indexOf(val);
      if(ix < 0) {
        selected.push(val);
      } else {
        selected.splice(ix, 1);
      }

      this.setState({
        selected
      });

      onChange(selected);

      if(selected.length === 0) {
        onDeselectAll();
      }
    }
  }

  render() {
    const { selected, options } = this.props;

    return (
      <div data-test="component-option-select">
        <Form>
        {
          options.map((item, count) => {
            return (
              <Option
                key={`option-item-${count}`}
                { ...item }
                onClick={() => this.onClick(item.id)}
                selected={isArray(selected) ? inArray(item.id, selected) : selected === item.id}
              />
            )
          })
        }
        </Form>
      </div>
    );
  }
}

OptionSelect.propTypes = {
  selected: PropTypes.array,
  onChange: PropTypes.func,
  onDeselectAll: PropTypes.func,
  options: PropTypes.array,
  multiple: PropTypes.bool,
};

OptionSelect.defaultProps = {
  multiple: false
};

export default OptionSelect;
