import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Radio from 'src/components/_form/Radio/Radio';
import './radio-group.scss';

/**
 * RadioGroup
 * @param {array} items - config array for radio objects
 * @param {string} name - name of radio buttons
 * @param {func} onChange - onChange function
 * @param {string} selectedValue - the vlaue of the selected radio
 * @param {string} groupLabel - label for the radio group
 * @return {JSXElement} RadioGroup
 */
const RadioGroup = ({ items, name, onChange, selectedValue, groupLabel }) => {

  return (
    <div       
      className={classNames(
        'radio-group',
      )}
    >
      <div className='radio-group--label'>{groupLabel}</div>
      <div className='radio-group--radio-wrapper'>
        { items &&
          items.map((item, i) => {
            const { label, value, description } = item;
            const id = `${name}-${i}`;

            return (
              <Radio
                id={id}
                key={i}
                label={label}
                value={value}
                name={name}
                isChecked={value === selectedValue ? true : null}
                onChange={(e) => {onChange(e.target.value)}}
                description={description}
              />
            );
          })
        }
      </div>
    </div>
  );
};

RadioGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  onChange: PropTypes.func,
  selectedValue: PropTypes.string,
  groupLabel: PropTypes.string
};

export default RadioGroup;
