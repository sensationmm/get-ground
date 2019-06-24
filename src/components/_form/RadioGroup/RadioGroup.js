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
 * @param {string} classes - string of additional class names
 * @return {JSXElement} RadioGroup
 */
const RadioGroup = ({ 
  items, 
  name, 
  onChange, 
  value, 
  groupLabel, 
  hidden, 
  isAdditionalServices,
  classes
}) => {
  const radioValue = value;

  return (
    <div
      className={classNames([
        'radio-group',
        classes,
        {'additional-services': isAdditionalServices}
      ])}
      data-test="component-radio-group"
      style={{ display: hidden ? 'none' : 'block'}}
    >
      <div className='radio-group--label'>{groupLabel}</div>
      <div className='radio-group--radio-wrapper'>
        { items &&
          items.map((item, i) => {
            const { label, value, description, children } = item;
            const id = `${name}-${i}`;

            return (
              <Radio
                id={id}
                key={i}
                label={label}
                value={value}
                name={name}
                isChecked={value === radioValue ? true : null}
                onChange={(e) => {
                  let updatedValue = e.target.value;

                  if (updatedValue === 'false') {
                    updatedValue = false;
                  } else if (updatedValue === 'true') {
                    updatedValue = true;
                  }

                  onChange(updatedValue);
                }}
                description={description}
              >
                {children}
              </Radio>
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
  value: PropTypes.string,
  groupLabel: PropTypes.string,
  hidden: PropTypes.bool,
  isAdditionalServices: PropTypes.bool,
  classes: PropTypes.string
};

export default RadioGroup;
